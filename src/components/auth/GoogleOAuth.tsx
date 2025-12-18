import { GoogleLogin } from '@react-oauth/google';
import { useAuth } from '../../contexts/AuthContext';
import { setTokens } from '../../lib/tokenStorage';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/api';

const GoogleOAuth = ({ isLogin = false }: { isLogin?: boolean }) => {
  const { login: authLogin } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = async (credentialResponse: any) => {
    try {
      // Decode the JWT to get user info
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );

      const { email, name, sub: googleId, picture } = JSON.parse(jsonPayload);

      // Send to your backend
      const response = await api.post('/api/auth/google', {
        email,
        name,
        googleId,
        image: picture,
      });

      const { refresh_token, data: user } = response.data;

      // Handle authentication
      setTokens(user.access_token, refresh_token);
      authLogin(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  const handleError = () => {
    console.log('Google login failed');
  };

  return (
    <div className="border-2 border-[#C8CAC8] p-3 mb-9 rounded-[10px] flex justify-center cursor-pointer">
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap={isLogin} // Show one-tap sign-in on login page
        text={isLogin ? 'continue_with' : 'signup_with'}
        shape="rectangular"
        size="medium"
        width="100%"
      />
    </div>
  );
};

export default GoogleOAuth;