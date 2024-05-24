import AuthProvider from './components/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

import './App.css';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import NaveBar from './components/NaveBar';
import CreateShop from './pages/CreateShop';
import CreateCategory from './pages/CreateCategory';
import CategoryInfo from './pages/CategoryInfo';
import AddProdunct from './pages/AddProdunct';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NaveBar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/createShop" element={<CreateShop />} />
          <Route path="/createCategory" element={<CreateCategory />} />
          <Route path="/categoryInfo/:id" element={<CategoryInfo />} />
          <Route path="/addProduct/:id" element={<AddProdunct />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
