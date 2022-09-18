import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();
  const responseGoogle = async (res) => {
    const decoded = jwt_decode(res.credential);
    localStorage.setItem('user', JSON.stringify(decoded));

    const { name, jti, picture } = decoded;

    const doc = {
      _id: jti,
      _type: 'user',
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => navigate('/', { replace: true }));
  };
  return (
    <div className="flex flex-col items-center justify-start h-screen">
      <div className="relative w-full h-full">
        <video
          src={process.env.PUBLIC_URL + '/assets/share.mp4'}
          type="video/mp4"
          loop
          muted
          controls={false}
          autoPlay
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-blackOverlay">
          <div className="p-5">
            <img
              src={process.env.PUBLIC_URL + '/assets/logowhite.png'}
              width={130}
              alt="logo"
            />
          </div>
          <div className="shadow-2xl">
            <GoogleLogin onSuccess={responseGoogle} onError={console.log} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
