import { UserProvider, useUser } from './contexts/AuthContext';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeSearch from './components/home/HomeSearch';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import ProfilePage from './components/profile/ProfilePage';
import ListingsPage from './components/listing/ListingsPage';
import ListingDetail from './components/listing/ListingDetail';
import { AuthContext, AuthProvider } from './contexts/AuthContext';  

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomeSearch />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/venues" element={<ListingsPage />} />
            <Route path="/venues/:id" element={<ListingDetail />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;