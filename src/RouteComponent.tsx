import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import Dashboard from './pages/dashboard/Dashboard';
import OrderPage from './pages/order/OrderPage';
import PaymentPage from './pages/payment/PaymentPage';
import UserPage from './pages/user/UserPage';
import ItemPage from './pages/item/ItemPage';
import CategoryPage from './pages/category/CategoryPage';
import ReporPage from './pages/report/ReporPage';
import HomePage from './pages/home/homePage';
import CartPage from './pages/cart/CartPage';
import WaitingForApproval from './pages/cart/WaitingForApproval';
import SubCategoryPage from './pages/subCategory/SubCategoryPage';
import SettingPage from './pages/setting/SettingPage';
import ProfilePage from './pages/profile/ProfilePage';
import AdminApprovalPage from './pages/order/AdminApprovalPage';
import { useFetchCategoryData } from './services/category/fetchCategoryData';
import ItemDetailPage from './pages/item/ItemDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleItemPage from './pages/item/SingleItemPage';
import { Category, Subcategory } from './redux/types';
import Login from './components/login/Login';
import MyLibrary from './pages/myLibrary /MyLibrary';
import RegisterPage from './pages/user/Register';
import LoginPage from './pages/login/LoginPage';
import ProtectedRoute from './ProtectedRoute';

const RouteComponent: React.FC = () => {
  const { loading, categories, error } = useFetchCategoryData();

  const generateCategoryRoutes = () => {
    return categories.flatMap((category:Category) => {
      const categoryName = category.name.toLowerCase().replace(/\s+/g, '-');

      // Assuming each category may have subcategories
      return category.subcategories.map((subCategory:any) => {
        const subCategoryName = subCategory.name.toLowerCase().replace(/\s+/g, '-');
        const subCategoryId = subCategory.id;
        

        return {
          path: `/${categoryName}/${subCategoryName}`,
          element: <ItemDetailPage categoryId={category.id} subCategoryId={subCategoryId} />,
        };
      });
    });
  };

  const routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />,
    },
    {
      path: "/home",
      element: <HomePage />,
    },
    {
      path: "/items",
      element: <ItemPage />,
    },
    {
      path: '/categories',
      element: <CategoryPage />,
    },
    {
      path: '/subcategories',
      element: <SubCategoryPage />,
    },
    {
      path: '/waiting-for-approval',
      element: <WaitingForApproval />,
    },
    {
      path: '/orders',
      element: <OrderPage />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: '/payment',
      element: <PaymentPage />,
    },
    {
      path: '/users',
      element: <UserPage />,
    },
    {
      path: '/report',
      element: <ReporPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/login',
      element: <LoginPage />,
    },
    {
      path: '/setting',
      element: <SettingPage />,
    },
    {
      path: '/profile',
      element: <ProfilePage />,
    },
    {
      path: '/mylibrary',
      element: <ProtectedRoute component={MyLibrary} path="/mylibrary" />,
    },
    {
      path: '/approval',
      element: <AdminApprovalPage />,
    },
    {
      path: '/app/item/:idroval',
      element: <AdminApprovalPage />,
    },
    {
      path: '/item/:id',
      element: <SingleItemPage />, // This will render the ItemPage component for the specified route
    },
    ...generateCategoryRoutes(),
    {
      path: '*',
      element: <NotFoundPage />,
    },
  ]);

  return routes || <Navigate to="/404" />;
};

export default RouteComponent;