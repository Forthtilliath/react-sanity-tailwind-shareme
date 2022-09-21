import React, { useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data';
import { useEffectOnce } from '../../utils/hooks';

import { client, urlFor } from '../../client';
import MasonryLayout from '../MasonryLayout';
import Spinner from '../Spinner';
import UserImage from '../User/UserImage';

const PinDetail = ({ user }) => {
  const [pins, setPins] = useState([]);
  const [pinDetail, setPinDetail] = useState('');
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();

  const fetchPinDetail = () => {
    let query = pinDetailQuery(pinId);

    if (query) {
      client.fetch(query).then((data) => {
        setPinDetail(data[0]);

        if (data[0]) {
          query = pinDetailMorePinQuery(data[0]);

          client.fetch(query).then((res) => setPins(res));
        }
      });
    }
  };

  useEffectOnce(fetchPinDetail, [pinId]);

  const addComment = () => {
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [
          {
            comment,
            _key: uuidv4(),
            postedBy: {
              _type: 'postedBy',
              _ref: user._id,
            },
          },
        ])
        .commit()
        .then(() => {
          fetchPinDetail();
          setComment('');
          setAddingComment(false);
        });
    }
  };

  if (!pinDetail) {
    return <Spinner message="Loading pin..." />;
  }

  return (
    <>
      <div className="flex flex-col m-auto bg-white xl:flex-row max-w-[1500px] rounded-[32px]">
        <div className="flex items-center justify-center flex-initial md:items-start">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image)}
            className="rounded-b-lg rounded-t-3xl"
            alt="user-post"
          />
        </div>
        <div className="flex-1 w-full p-5 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                download
                onClick={(e) => e.stopPropagation()}
                className="flex items-center justify-center p-2 text-xl bg-white rounded-full outline-none opacity-75 w-9 h-9 text-dark hover:opacity-100 hover:shadow-md">
                <MdDownloadForOffline />
              </a>
            </div>
            <a href={pinDetail.destination} target="_blank" rel="noreferrer">
              {pinDetail.destination}
            </a>
          </div>
          <div>
            <h1 className="mt-3 text-4xl font-bold break-words">
              {pinDetail.title}
            </h1>
            <p className="mt-3">{pinDetail.about}</p>
          </div>
          <Link
            to={`user-profile/${pinDetail.postedBy?._id}`}
            className="flex items-center gap-2 mt-5 bg-white rounded-lg">
            <UserImage
              user={pinDetail.postedBy}
              className="object-cover w-8 h-8 rounded-full"
            />
            <p className="font-semibold capitalize">
              {pinDetail.postedBy?.userName}
            </p>
          </Link>
          <h2 className="mt-5 text-2xl">Comments</h2>
          <div className="overflow-y-auto max-h-370">
            {pinDetail.comments?.map((comment, i) => (
              <div
                key={i}
                className="flex items-center gap-2 mt-5 bg-white rounded-lg">
                <UserImage
                  user={comment.postedBy}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-3 m-6">
            <Link to={`user-profile/${pinDetail.postedBy?._id}`}>
              <UserImage
                user={pinDetail.postedBy}
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Link>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 border-2 border-gray-100 outline-none rounded-2xl focus:border-gray-300"
            />
            <button
              type="button"
              onClick={addComment}
              disabled={comment === ''}
              className="px-6 py-2 text-base font-semibold text-white bg-red-500 rounded-full outline-none disabled:opacity-25">
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </div>
        </div>
      </div>
      {pins?.length ? (
        <>
          <h2 className="mt-8 mb-4 font-bold text-center text-2x">
            More like this
          </h2>
          <MasonryLayout pins={pins} />
        </>
      ) : (
        <h2 className="mt-8 mb-4 font-bold text-center text-2x">
          No more pins available
        </h2>
      )}
    </>
  );
};

export default PinDetail;
