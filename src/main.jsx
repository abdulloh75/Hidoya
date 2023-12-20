import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import "./index.css"
import axios from "axios";
let global_url = 'https://hidoya.pythonanywhere.com/api/v1/'
let local_url ='http://192.168.1.139:8000/api/v1/'
axios.defaults.baseURL = global_url;
let token = sessionStorage.getItem('token')
if (token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <App />
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
