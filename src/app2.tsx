import { useRoutes, Navigate } from 'react-router-dom';
import NavBar from "@/components/NavBar/NavBar";
import Dashboard from './pages/dashboard/Dashboard';

function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Dashboard />, // Route for Home
    },
    {
      path: "/settings",
      element: (
        <section className="px-4 md:px-8">
          <h1 className="font-bold leading-8 font-inter text-color3 text-2xl">
            Settings
          </h1>
          <p className="font-normal text-base leading-6 font-inter mt-1 text-color4">
            Manage your team and preferences here.
          </p>
        </section>
      ),
    },
    {
      path: "*", // Catch-all route for undefined paths
      element: <Navigate to="/home" />, // Redirect to Home if path is not found
    },
  ]);

  return (
    <div>
      <NavBar />
      <div className="border-gray-900 mt-16 md:mt-0 min-h-[100px] md:ml-[17.5rem] py-8">
        {routes}
      </div>
    </div>
  );
}

export default App;