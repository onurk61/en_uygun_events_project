import './App.scss';
import '@fontsource/poppins';
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/400-italic.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './components/RootLayout/RootLayout';
import Home from './pages/Home/Home';
import Reservation from './pages/Reservation';
import Payment from './components/Payment';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/reservation/:id', element: <Reservation /> },
      { path: '/payment', element: <Payment /> },
    ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
