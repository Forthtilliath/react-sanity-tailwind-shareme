import React, { useEffect, useMemo, useState } from 'react';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { fetchUser } from '../utils/fetchUser';
import { useEffectOnce, useToggle } from '../utils/hooks';

import { client, urlFor } from '../client';

const Pin = ({ pin }) => {
  const [postHovered, togglePostHovered] = useToggle();
  const [savingPost, toggleSavingPost] = useToggle();
  const navigate = useNavigate();

  const { _id, postedBy, image, destination } = pin;
  const [save, setSave] = useState(pin.save ?? []);

  const user = fetchUser();

  const alreadySaved = useMemo(
    () => save.some((item) => item.postedBy?._ref === user?.sub),
    [save]
  );

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
            userId: user.sub,
            postedBy: {
              _type: 'postedBy',
              _ref: user.sub,
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

    client
      .delete(id)
      .setIfMissing({ save: [] })
      .insert('after', 'save[-1]', [
        {
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user.sub,
          },
        },
      ])
      .commit()
      .then((pinUpdated) => {
        setSave(pinUpdated.save);
      });
  };

  return (
    <div className="m-2">
      {alreadySaved}
      <div
        className="relative w-auto overflow-hidden transition-all duration-500 ease-in-out rounded-lg cursor-zoom-in hover:shadow-lg"
        onMouseEnter={togglePostHovered}
        onMouseLeave={togglePostHovered}
        onClick={() => navigate(`/pin-detail/${_id}`)}>
        <img
          className="w-full rounded-lg"
          alt="user-post"
          src={urlFor(image).width(250).url()}
        />
        {postHovered && (
          <div
            className="absolute top-0 z-50 flex flex-col justify-between w-full h-full p-1 pt-2 pb-2 pr-2"
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
                user && (
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      savePin(_id);
                    }}
                    className="px-5 py-1 text-base font-bold text-white bg-red-500 rounded-3xl opacity-70 hover:opacity-100-3xl hover:shadow-md outlined-none">
                    {savingPost ? 'Saving' : 'Save'}
                  </button>
                )
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
                  <BsFillArrowUpRightCircleFill />{' '}
                  {destination.length > 15
                    ? destination.slice(8, 23)
                    : destination.slice(8)}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    deletePin(_id);
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
        <img
          className="object-cover w-8 h-8 rounded-full"
          src={postedBy?.image}
          referrerPolicy="no-referrer"
          alt="user-profile"
        />
        <p className="font-semibold capitalize">{postedBy?.userName}</p>
      </Link>
    </div>
  );
};

export default Pin;
