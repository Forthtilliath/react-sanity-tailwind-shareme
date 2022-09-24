import React, { useState } from 'react';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useUserContext } from '../../utils/contexts/UserContext';
import { categories } from '../../utils/data';
import { sleep } from '../../utils/methods';

import { Spinner, UserImage } from '../';
import { client } from '../../client';

const initialInputs = {
  title: '',
  about: '',
  destination: '',
  category: '',
};

const CreatePin = () => {
  const [inputs, setInputs] = useState(initialInputs);
  const [image, setImage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [wrongImageType, setWrongImageType] = useState(false);

  const { user } = useUserContext();
  const navigate = useNavigate();

  const handleChange = ({ target: input }) => {
    setInputs((inputs) => ({
      ...inputs,
      [input.name]: input.value,
    }));
  };

  const uploadImage = (e) => {
    const selectedFile = e.target.files[0];
    const authorizedTypes = [
      'image/png',
      'image/svg+xml',
      'image/jpeg',
      'image/gif',
      'image/tiff',
      'image/webp',
    ];

    if (authorizedTypes.includes(selectedFile.type)) {
      setWrongImageType(false);
      setLoading(true);

      client.assets
        .upload('image', selectedFile, {
          contentType: selectedFile.type,
          filename: selectedFile.name,
        })
        .then((document) => {
          setImage(document);
          setLoading(false);
        })
        .catch((error) => console.log('Image uplod error', error));
    } else {
      setWrongImageType(true);
    }
  };

  const savePin = async () => {
    if (Object.values(inputs).some((input) => input === '') || !image) {
      setError(true);
      await sleep(2000);
      setError(false);
      return;
    }

    const doc = {
      _type: 'pin',
      ...inputs,
      image: {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: image?._id,
        },
      },
      userId: user._id,
      postedBy: {
        _type: 'postedBy',
        _ref: user._id,
      },
    };

    client.create(doc).then(() => navigate('/'));
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5 lg:h-4/5">
      {error && (
        <div
          className="w-4/5 p-4 mb-2 text-red-700 bg-red-100 border-l-4 border-red-500"
          role="alert">
          <p>Please fill in all the fields</p>
        </div>
      )}
      <div className="flex flex-col items-center justify-center w-full p-3 bg-white lg:flex-row lg:p-5 lg:w-4/5">
        <div className="p-3 bg-secondaryColor flex flex-0.7 w-full">
          <div className="flex flex-col items-center justify-center w-full p-3 border-2 border-gray-300 border-dotted h-420">
            {loading && <Spinner />}
            {wrongImageType && <p>Wrong image type</p>}
            {!image ? (
              <label>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col items-center justify-center">
                    <p className="text-2xl font-bold">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>
                  <p className="mt-32 text-gray-400">
                    Use high quality JPG, SVG, PNG, GIF less than 20 MB
                  </p>
                </div>
                <input
                  type="file"
                  accept=".png,.jpg,.jpeg,.gif,.svg,.tiff,.webp"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) : (
              <div className="relative h-full">
                <img
                  src={image?.url}
                  alt="uploaded"
                  className="w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => setImage(null)}
                  className="absolute p-3 text-xl transition-all duration-500 ease-in bg-white rounded-full outline-none cursor-pointer bottom-3 right-3 hover:shadow-md">
                  <MdDelete />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col flex-1 w-full gap-6 mt-5 lg:pl-5">
          <input
            type="text"
            name="title"
            value={inputs.title}
            onChange={handleChange}
            placeholder="Add your title here"
            className="p-2 text-2xl font-bold border-b-2 border-gray-200 outline-none sm:text-3xl"
          />
          {user && (
            <div className="flex items-center gap-2 my-2 bg-white rounded-lg">
              <UserImage src={user.image} className="w-10 h-10 rounded-full" />
              <p className="font-bold">{user.userName}</p>
            </div>
          )}
          <input
            type="text"
            name="about"
            value={inputs.about}
            onChange={handleChange}
            placeholder="What is your pin about"
            className="p-2 outline-none border-gr ay-200 text-baseborder-b-2 sm:text-lg"
          />
          <input
            type="text"
            name="destination"
            value={inputs.destination}
            onChange={handleChange}
            placeholder="Add a destination link"
            className="p-2 outline-none border-gr ay-200 text-baseborder-b-2 sm:text-lg"
          />
          <div className="flex flex-col">
            <div>
              <p className="mb-2 text-lg font-semibold sm:text-xl">
                Choose Pin Category
              </p>
              <select
                name="category"
                onChange={handleChange}
                className="w-4/5 p-2 text-base border-b-2 border-gray-200 rounded-md outline-none cursor-pointer">
                <option value="" className="bg-white">
                  Select Category
                </option>
                {categories.map((categorie) => (
                  <option
                    key={categorie.name}
                    value={categorie.name}
                    className="text-base text-black capitalize bg-white border-0 outline-none">
                    {categorie.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-start justify-end mt-5">
              <button
                type="button"
                onClick={savePin}
                className="p-2 text-white bg-red-500 rounded-full outline-none font-border-ld w-28">
                Save Pin
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePin;
