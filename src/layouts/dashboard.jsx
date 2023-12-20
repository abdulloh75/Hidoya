// Import necessary dependencies and components
import { useMaterialTailwindController } from "@/context";
import routes from "@/routes";
import {
  Configurator,
  DashboardNavbar,
  Sidenav
} from "@/widgets/layout";
import { Route, Routes } from "react-router-dom";

// Define the Dashboard component
export function Dashboard() {
  // Retrieve state and dispatch function from context
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;

  return (
    // Dashboard layout structure
    <div className="min-h-screen bg-blue-gray-50/50">
      {/* Sidenav component with routes and brand image */}
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      {/* Main content area */}
      <div className="p-4 xl:ml-80">
        {/* DashboardNavbar and Configurator components */}
        <DashboardNavbar />
        <Configurator />
        {/* Routes for dashboard pages */}
        <Routes>
          {routes.map(
            ({ layout, pages }) =>
              layout === "dashboard" &&
              pages.map(({ path, element }) => (
                <Route exact path={path} element={element} />
              ))
          )}
        </Routes>
      </div>
    </div>
  );
}

// Set a display name for the component (used in error messages)
Dashboard.displayName = "/src/layout/dashboard.jsx";

// Export the Dashboard component as the default export
export default Dashboard;
