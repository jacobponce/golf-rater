import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import AuthPage from './AuthPage';
import './App.css';
import { User } from './types/User';
import TopTabBar from './components/TopTabBar/TopTabBar';
import Home from './HomePage/Home';
import Courses from './Courses/Courses';
import Profile from './Profile';
import ReviewForm from './components/ReviewForm';

function App() {
  const [user, setUser] = useState<User | null>(null);

  const tokenCheck = () => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      const username = localStorage.getItem('username') || 'John Doe';
      const email = localStorage.getItem('email') || 'bruh';
      const password = localStorage.getItem('password') || 'password';

      setUser({ username, email, password });
    }
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    tokenCheck();
  };

  if (!user) {
    return <AuthPage onLogin={handleLogin} />;
  }

  return (
    <Router>
      <AppContent user={user} setUser={setUser} />
    </Router>
  );
}

function AppContent({ user, setUser }: { user: User, setUser: React.Dispatch<React.SetStateAction<User | null>> }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    navigate('/'); // Redirect to home page on logout
  }

  return (
    <div>
      <TopTabBar />
      <Routes>
        <Route path="/courses" element={<Courses />} />
        <Route path="/profile" element={<Profile user={user} onClick={handleLogout}/>} />
        <Route path="/" element={<Home user={user} />} />    
        <Route path="/:courseId/review" element={<ReviewForm />} />    
      </Routes>
    </div>
  );
}

export default App;