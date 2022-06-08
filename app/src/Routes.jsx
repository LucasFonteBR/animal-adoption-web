import { Navigate } from 'react-router-dom';
import { DashboardLayout } from 'src/layout/DashboardLayout';
import MainLayout from 'src/layout/MainLayout';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import Dashboard from './pages/dashboard/Dashboard';
import AnimalList from './pages/animals/AnimalList';
import UserList from './pages/user/UserList';
import AnimalAdd from './pages/animals/AnimalAdd';
import RecoverPassword from './pages/RecoverPassword';
import { SetVerifyPassword } from './pages/SetVerifyPassword';
import UserAdd from './pages/user/UserAdd';
import { UserChangePassword } from './pages/user/UserChangePassword';
import PeopleAdd from './pages/people/PeopleAdd';
import PeopleList from './pages/people/PeopleList';
import VaccineList from './pages/vaccines/VaccineList';
import VaccineAdd from './pages/vaccines/VaccineAdd';
import PersonGet from './pages/people/PersonGet';
import PersonEdit from './pages/people/PersonEdit';

const routes = (currentUser) => {
  return [
    {
      element:
        currentUser && currentUser.accessToken ? (
          <DashboardLayout />
        ) : (
          <Navigate to="/login" />
        ),
      children: [
        {
          path: '/admin/dashboard',
          element: <Dashboard />,
        },
        {
          path: '/admin/animal',
          element: <AnimalList />,
        },
        {
          path: '/admin/animal/adicionar',
          element: <AnimalAdd />,
        },
        {
          path: '/admin/vacina',
          element: <VaccineList />,
        },
        {
          path: '/admin/vacina/adicionar',
          element: <VaccineAdd />,
        },
        {
          path: '/admin/usuario',
          element: <UserList />,
        },
        {
          path: '/admin/usuario/adicionar',
          element: <UserAdd />,
        },
        {
          path: '/admin/trocar-senha',
          element: <UserChangePassword />,
        },
        {
          path: '/admin/pessoa/adicionar',
          element: <PeopleAdd />,
        },
        {
          path: '/admin/pessoa',
          element: <PeopleList />,
        },
        {
          path: '/admin/pessoa/visualizar/:uuid',
          element: <PersonGet />,
        },
        {
          path: '/admin/pessoa/editar/:uuid',
          element: <PersonEdit />,
        },
      ],
    },
    {
      path: '/',
      element:
        currentUser && currentUser.accessToken ? (
          <Navigate to="/admin/dashboard" />
        ) : (
          <MainLayout />
        ),
      children: [
        { path: 'login', element: <Login /> },
        { path: 'recuperar/senha', element: <RecoverPassword /> },
        {
          path: 'primeiro/acesso/:hash',
          element: <SetVerifyPassword typeOperation="FIRST_ACCESS" />,
        },
        {
          path: 'recuperar/senha/:hash',
          element: <SetVerifyPassword typeOperation="RECOVER_PASSWORD" />,
        },
        { path: '404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/admin/dashboard" /> },
        { path: '*', element: <Navigate to="/login" /> },
      ],
    },
  ];
};

export default routes;
