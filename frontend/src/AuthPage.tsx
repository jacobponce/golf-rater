import { useState } from 'react';
import axios from 'axios';
import './AuthPage.css'; // Import the CSS file

const AuthPage = ({ onLogin }: { onLogin: any }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and create account
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/signup';
    try {
      const payload = isLogin ? { email, password } : { email, password, username };
      const response = await axios.post(url, payload);
      const userData = response.data;
      console.log(userData)
      console.log(userData.user.username)
      console.log(response.data.message)
      localStorage.setItem('token', userData.token);
      localStorage.setItem('username', userData.user.username);
      localStorage.setItem('email', userData.user.email);
      localStorage.setItem('user_id', userData.user.id);
      onLogin(userData);
    } catch (error) {
        setErrorMessage(isLogin ? 'Login error: Incorrect email or password' : (error as any).response.data.message);
      console.error(isLogin ? 'Login failed' : (error as any).response.data.message);
    }
  };

  const toggleForm = () => {
    setPassword('');
    setUsername('');
    setEmail('');
    setIsLogin(!isLogin);
    setErrorMessage(null); // Clear error message when toggling form
  };

  return (
    <div>
      <div>
        
      </div>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
          )}
          <input type={!isLogin ? "email": "text"}value={email} onChange={(e) => setEmail(e.target.value)} placeholder={isLogin ? "Email/Username" : "Email"} />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button type="submit">{isLogin ? 'Login' : 'Create Account'}</button>
          <a className="toggle-link" onClick={toggleForm}>
          {isLogin ? 'Sign Up' : 'Already Have an Account'}
          </a>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;