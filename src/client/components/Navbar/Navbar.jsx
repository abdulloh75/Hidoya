import React, { useState } from "react";
import logo from '../../../assets/Logo.png'
import { Link } from "react-router-dom";
import Ekategoriya from "../E-kategoriya/Ekategoriya";
export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  return (
    <>
      <nav className="flex flex-wrap items-center justify-between px-2 bg-white mb-1 relative top-0 w-full z-50 shadow-md backdrop-blur-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <img className="w-20 h-20 object-cover bg-contain" src={logo} alt="" />
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <div className="w-full flex items-center justify-center">
              <h1 className=" text-3xl text-blue-500 font-bold">Hidoya ARM</h1>
            </div>
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <Link to="/auth/sign-in">
                <button className="w-[12rem] h-10 text-xl text-white rounded-lg bg-blue-500">Log in</button>
              </Link>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}