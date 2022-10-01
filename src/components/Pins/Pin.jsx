import { useEffect, useMemo, useState } from 'react';
import { useRef } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ROLES } from '../../utils/constants';
import { useUserContext } from '../../utils/contexts/UserContext';
import { useToggle } from '../../utils/hooks';
import { removeHttp } from '../../utils/methods';

import { client, urlFor } from '../../client';
import Confirm from '../Dialog/Confirm';
import UserImage from '../User/UserImage';

const Pin = ({ pin, setPins }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [savingPost, toggleSavingPost] = useToggle();
  const navigate = useNavigate();

  const { _id, postedBy, image, destination } = pin;
  const shortDestination = removeHttp(destination);

  const [save, setSave] = useState(pin.save ?? []);
  const { user } = useUserContext();

  const dlRef = useRef(null);
  const saveRef = useRef(null);
  const linkRef = useRef(null);
  const delRef = useRef(null);

  /* Checking if the user has already saved the pin. */
  const alreadySaved = useMemo(
    () => save.some((item) => item.postedBy?._ref === user?._id),
    [save]
  );

  /* Checking if the user is the owner of the pin or if the user is a moderator or admin. */
  const canModerate =
    postedBy?._id === user?._id ||
    [ROLES.moderator, ROLES.admin].some((role) => user?.roles?.includes(role));

  useEffect(() => {
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

  const handleKeyDown = ({ code }) => {
    if (['Enter', 'Space'].includes(code)) {
      navigate(`/pin-detail/${_id}`);
    }
    if (code === 'KeyD') {
      dlRef.current.click();
      return;
    }
    if (code === 'KeyS') {
      saveRef.current.click();
      return;
    }
    if (code === 'KeyL') {
      linkRef.current.click();
      return;
    }
    if (code === 'KeyR') {
      delRef.current.click();
      return;
    }
  };

  return (
    <div className="m-2">
      <div>
        <Confirm
          aria-labelledby="delete-modal"
          title="Delete Post?"
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
          onConfirm={() => deletePin(_id)}>
          Are you sure you want to delete this pin?
        </Confirm>
      </div>
      <div
        className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg group outline-red-500 outline-2 outline-offset-0"
        onClick={() => navigate(`/pin-detail/${_id}`)}
        onKeyDown={handleKeyDown}
        aria-label="Show Pin Details"
        tabIndex={0}
        role="button">
        <img
          className="w-full rounded-lg"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {!dialogOpen && (
          <div
            className="absolute top-0 z-10 flex-col justify-between hidden w-full h-full p-2 group-hover:flex group-focus:flex"
            style={{ height: '100%' }}>
            <div className="flex items-center justify-between">
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  download
                  tabIndex={-1}
                  ref={dlRef}
                  onClick={(e) => e.stopPropagation()}
                  className="grid content-center p-2 text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md">
                  <MdDownloadForOffline />
                </a>
              </div>
              {alreadySaved ? (
                <button
                  type="button"
                  tabIndex={-1}
                  ref={saveRef}
                  onClick={(e) => e.stopPropagation()}
                  className="px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-100 rounded-3xl">
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type="button"
                  tabIndex={-1}
                  ref={saveRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    savePin(_id);
                  }}
                  className="px-5 py-1 text-base font-bold text-white bg-red-500 outline-none opacity-70 hover:opacity-100 rounded-3xl hover:shadow-md">
                  {savingPost ? 'Saving' : 'Save'}
                </button>
              )}
            </div>
            <div className="flex items-center justify-between w-full gap-2">
              {destination && (
                <a
                  href={destination}
                  tabIndex={-1}
                  ref={linkRef}
                  aria-label="Go to destination"
                  onClick={(e) => e.stopPropagation()}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 overflow-hidden font-bold text-black bg-white rounded-full opacity-70 hover:opacity-100 hover:shadow-md whitespace-nowrap">
                  <BsFillArrowUpRightCircleFill width={16} height={16} />
                  <span className="w-full overflow-hidden text-ellipsis">
                    {shortDestination}
                  </span>
                  {/* {shortDestination.length > 12
                    ? `${shortDestination.slice(0, 12)}...`
                    : shortDestination} */}
                </a>
              )}
              {canModerate && (
                <button
                  type="button"
                  tabIndex={-1}
                  ref={delRef}
                  aria-label="delete"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDialogOpen(true);
                  }}
                  className="grid content-center w-8 h-8 p-2 bg-white rounded-full outline-none opacity-75 text-dark hover:opacity-100">
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      <Link
        to={`/user-profile/${postedBy?._id}`}
        className="flex items-center gap-2 mt-2 outline-red-500 outline-2 outline-offset-2 rounded-2xl">
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
