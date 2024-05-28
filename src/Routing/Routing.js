import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from '../pages/Login';
import NotFound from '../pages/NotFound';
import Products from '../pages/Products';
import Users from '../pages/Users';
import Orders from '../pages/Orders';
import Admin from '../pages/Admin';
import { MobileNav, SidebarContent } from '../pages/AdminDashboard';
import Protected from '../Protected';
import Public from '../Public';
import { useSelector } from 'react-redux';
import ProfilePage from '../pages/ProfilePage';
import ChangePassword from '../pages/ChangePassword';
import AddProduct from '../components/AddProduct';
import EditProduct from '../components/EditProduct';
import ForgetPassword from '../components/ForgetPassword';

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Protected />}>
          <Route path="/" element={<Navigate replace to="dashboard" />} />
          <Route path="/dashboard" element={<Orders />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/users" element={<Users />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/add-product" element={<AddProduct />} />
          <Route path="/products/edit-product/:id" element={<EditProduct />} />
          <Route path="/admins" element={<Admin />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="login" element={<Public />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route path="forget-password" element={<Public />}>
          <Route path="/forget-password" element={<ForgetPassword />} />
        </Route>
      </Routes>
    </Router>
  );
}
