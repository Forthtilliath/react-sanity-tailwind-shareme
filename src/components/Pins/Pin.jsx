import React, { useMemo, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ROLES } from '../../utils/constants';
import { useUserContext } from '../../utils/contexts/UserContext';
import { useEffectOnce, useToggle } from '../../utils/hooks';
import { removeHttp } from '../../utils/methods';

import { client, urlFor } from '../../client';
import Confirm from '../Dialog/Confirm';
import UserImage from '../User/UserImage';

const Pin = ({ pin, setPins }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [savingPost, toggleSavingPost] = useToggle();
  const navigate = useNavigate();

  const { _id, postedBy, image, destination } = pin;
  const shortDestination = removeHttp(destination);

  const [save, setSave] = useState(pin.save ?? []);
  const { user } = useUserContext();

  /* Checking if the user has already saved the pin. */
  const alreadySaved = useMemo(
    () => save.some((item) => item.postedBy?._ref === user?._id),
    [save]
  );

  /* Checking if the user is the owner of the pin or if the user is a moderator or admin. */
  const canModerate =
    postedBy?._id === user?._id ||
    [ROLES.moderator, ROLES.admin].some((role) => user?.roles?.includes(role));

  useEffectOnce(() => {
    client.getDocument(_id).then((pin) => setSave(pin.save ?? []));
  }, []);

  const savePin = (id) => {
    if (!user) return;

    if (!alreadySaved) {
      toggleSavingPost();

      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [
          {
            _key: uuidv4(),
            userId: user._id,
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then((pinUpdated) => {
          setSave(pinUpdated.save);
          toggleSavingPost();
        });
    }
  };

  const deletePin = (id) => {
    if (!user) return;

    client.delete(id).then((transaction) => {
      if (transaction.results.length) {
        setPins((pins) => pins.filter((pin) => pin._id !== id));
      }
    });
  };

  return (
    <div className="m-2">
      <div>
        <Confirm
          title="Delete Post?"
          open={confirmOpen}
          onClose={() => setConfirmOpen(false)}
          onConfirm={() => deletePin(_id)}>
          Are you sure you want to delete this pin?
        </Confirm>
      </div>
      <div
        className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg group"
        onClick={() => navigate(`/pin-detail/${_id}`)}>
        <img
          className="w-full rounded-lg"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {!confirmOpen && (
          <div
            className="absolute top-0 z-50 flex-col justify-between hidden w-full h-full p-1 pt-2 pb-2 pr-2 group-hover:flex"
            style={{ height: '100%' }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center p-2 text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md">
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  onClick={(e) => e.stopPropagation()}
                  className="px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md">
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="px-5 py-1 text-base font-bold text-white bg-red-500 rounded-3xl opacity-70 hover:opacity-100-3xl hover:shadow-md outlined-none">
                  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between w-full gap-2">
              {destination && (
                <a
                  href={destination}
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 p-2 pl-4 pr-4 font-bold text-black bg-white rounded-full opacity-70 hover:opacity-100 hover:shadow-md">
                  <BsFillArrowUpRightCircleFill />
                  {shortDestination.length > 12
                    ? `${shortDestination.slice(0, 12)}...`
                    : shortDestination}
                </a>
              )}
              {canModerate && (
                <button
                  type="button"
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setConfirmOpen(true);
                  }}
                  className="flex items-center justify-center w-8 h-8 p-2 bg-white rounded-full outline-none opacity-75 text-dark hover:opacity-100">
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`user-profile/${postedBy?._id}`}
        className="flex items-center gap-2 mt-2">
        <UserImage
          src={postedBy?.image}
          className="object-cover w-8 h-8 rounded-full"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
