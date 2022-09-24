import { GoogleLogin } from '@react-oauth/google';
import jwt_decode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { ROLES } from '../../utils/constants';
import { useUserContext } from '../../utils/contexts/UserContext';

import { client } from '../../client';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useUserContext();

  const responseGoogle = async (res) => {
    const user = jwt_decode(res.credential);

    const { name, sub, picture } = user;

    const doc = {
      _id: sub,
      _type: 'user',
      userName: name,
      image: picture,
      roles: [ROLES.user],
    };

    client.createIfNotExists(doc).then((data) => {
      login(data);
      navigate('/', { replace: true });
    });
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
