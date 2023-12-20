import {
  Bars3Icon,
  InformationCircleIcon,
  BookOpenIcon,
  TruckIcon,
  CubeIcon,
  GlobeAltIcon,
  NewspaperIcon,
  UserGroupIcon,
  BookmarkIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import GetAlifbolar from "./pages/alifbolar/GetAlifbolar";
import GetLanguages from "./pages/languages/GetLanguages";
import GetKategoriya from "./pages/kategories/GetKategoriya";
import GetGroups from "./pages/groups/GetGroups";
import GetCourses from "./pages/courses/GetCourses";
import GetEkategoriya from "./pages/E-categoriya/GetEkategoriya";
import GetOrder from "./pages/order/GetOrder";
import GetEbooks from "./pages/E-books/GetEbooks";
import GetUser from "./pages/dashboard/GetUser";
import GetBooks from "./pages/books/GetBooks";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        description: "Kitob berish"
      },
      // {
      //   icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      //     <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      //   </svg>,
      //   name: "dashboard",
      //   path: "/home",
      //   element: <Home />,
      // },
      {
        icon: <TruckIcon {...icon} />,
        name: "Kitob berish",
        path: "/kitob-berish",
        element: <GetOrder />,
      },
      {
        description: "Foydalanuvchilar"
      },
      {
        icon: <UserGroupIcon {...icon} />,
        name: "Guruhlar",
        path: "/guruhlar",
        element: <GetGroups />,
      },
      {
        icon: <BookmarkIcon {...icon} />,
        name: "Kurslar",
        path: "/kurslar",
        element: <GetCourses />,
      },
      {
        icon: <UsersIcon {...icon} />,
        name: "Foydalanuvchilar",
        path: "/foydalanuvchilar",
        element: <GetUser />,
      },
      {
        description: "Kutubxona"
      },
      {
        icon: <Bars3Icon {...icon} />,
        name: "Kategoriya",
        path: "/kategoriya",
        element: <GetKategoriya />,
      },
      {
        icon: <InformationCircleIcon {...icon} />,
        name: "Alifbolar",
        path: "/alifbolar",
        element: <GetAlifbolar />,
      },
      {
        icon: <GlobeAltIcon {...icon} />,
        name: "Tillar",
        path: "/tillar",
        element: <GetLanguages />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Kitoblar",
        path: "/kitoblar",
        element: <GetBooks />,
      },
      {
        description: "Elektron Kutubxona"
      },
      {
        icon: <Bars3Icon {...icon} />,
        name: "Kategoriya",
        path: "/e-kategiriya",
        element: <GetEkategoriya />,
      },
      {
        icon: <BookOpenIcon {...icon} />,
        name: "Kitoblar",
        path: "/e-kitoblar",
        element: <GetEbooks />,
      },
    ],
  },
];

export default routes;
