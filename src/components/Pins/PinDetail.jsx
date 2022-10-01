import { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { useUserContext } from '../../utils/contexts/UserContext';
import { pinDetailMorePinQuery, pinDetailQuery } from '../../utils/data';

import { MasonryLayout, Spinner, UserImage } from '../';
import { client, urlFor } from '../../client';

const PinDetail = () => {
  const [pins, setPins] = useState([]);
  const [pinDetail, setPinDetail] = useState('');
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const { pinId } = useParams();
  const { user } = useUserContext();

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

  useEffect(fetchPinDetail, [pinId]);

  const addComment = (e) => {
    e.preventDefault();

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

  if (!user) return null;

  if (!pinDetail) {
    return <Spinner message="Loading pin..." />;
  }

  return (
    <>
      <div className="flex flex-col m-auto bg-white xl:flex-row max-w-[1500px] rounded-[32px]">
        <div className="flex items-center justify-center flex-initial md:items-start">
          <img
            src={pinDetail?.image && urlFor(pinDetail.image)}
            className="object-contain w-full h-full rounded-b-lg rounded-t-3xl"
            alt="user-post"
          />
        </div>
        <div className="flex-1 w-full p-5 xl:min-w-620">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <a
                href={`${pinDetail.image.asset.url}?dl=`}
                aria-labelledby="download-image"
                download
                onClick={(e) => e.stopPropagation()}
                className="grid content-center text-xl bg-white rounded-full outline-none w-9 h-9 hover:shadow-md focus:bg-red-500">
                <MdDownloadForOffline size={36} />
              </a>
            </div>
            <a
              href={pinDetail.destination}
              target="_blank"
              rel="noreferrer"
              className="outline-none hocus:text-red-500 hocus:underline hocus:decoration-red-500 hocus:decoration-solid">
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
            to={`/user-profile/${pinDetail.postedBy?._id}`}
            className="flex items-center gap-2 mt-5 bg-white outline-red-500 outline-2 outline-offset-2 rounded-2xl">
            <UserImage
              src={pinDetail.postedBy.image}
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
                  src={comment.postedBy.image}
                  className="w-10 h-10 rounded-full cursor-pointer"
                />
                <div className="flex flex-col">
                  <p className="font-bold">{comment.postedBy.userName}</p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            ))}
          </div>
          <form className="flex flex-wrap gap-3 m-6" onSubmit={addComment}>
            <Link
              to={`/user-profile/${user._id}`}
              className="w-10 h-10 rounded-full outline-red-500 outline-2 outline-offset-2">
              <UserImage
                src={user.image}
                className="w-full h-full rounded-full cursor-pointer"
              />
            </Link>
            <input
              type="text"
              placeholder="Add a comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="flex-1 p-2 border-2 border-gray-100 outline-none rounded-2xl focus:border-red-500"
            />
            <button
              type="submit"
              disabled={comment === ''}
              className="px-6 py-2 text-base font-semibold text-white bg-red-500 border-2 border-red-500 rounded-full outline-none disabled:opacity-25 focus:border-red-700">
              {addingComment ? 'Posting the comment...' : 'Post'}
            </button>
          </form>
        </div>
      </div>
      {pins?.length ? (
        <>
          <h2 className="mt-8 mb-4 font-bold text-center text-2x">
            More like this
          </h2>
          <MasonryLayout pins={pins} setPins={setPins} />
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
