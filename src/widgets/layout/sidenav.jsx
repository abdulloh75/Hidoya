import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3Icon,
} from "@heroicons/react/24/solid";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import brandImg from '../../assets/Logo.png';
import { useMaterialTailwindController, setOpenSidenav } from "@/context";

export function Sidenav({ brandName, routes }) {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav, fixedNavbar } = controller;
  const sidenavTypes = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${openSidenav ? "translate-x-0" : "-translate-x-80"
        } overflow-y-auto fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0`}
    >
      <div
        className={`relative border-b ${sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
          }`}
      >
        <div className="flex items-center gap-4 py-4 px-8 ">
          <Link to="/" className="flex gap-4 items-center justify-center">
            <Avatar className="object-cover w-20 h-16 md:mt:3" src={brandImg} size="sm" />
            <Typography
              variant="h5"
              color={sidenavType === "dark" ? "white" : "blue-gray"}
            >
              {brandName}
            </Typography>
          </Link>
        </div>
      </div>
      <div className="m-2">
        {routes.map(({ layout, title, pages }, key) => (
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ icon, name, path, description }, index) => (
              <li key={index}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <Button
                      variant={isActive ? "gradient" : "text"}
                      color={
                        isActive
                          ? sidenavColor
                          : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                      }
                      className="flex items-center gap-4 px-4 capitalize"
                      fullWidth
                      onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    >
                      {icon}
                      {name ? 
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography> : 
                        null
                     }
                    </Button>
                  )}
                </NavLink>
                {description?
                
                  <Typography className="font-medium capitalize text-blue-gray-500 ml-3">{description}</Typography> : 
                  null
                }
              </li>
            ))}
          </ul>
        ))}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandName: "Hidoya ARM",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.jsx";

export default Sidenav;
