import * as React from "react";
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

import Home from "./pages/home/index.tsx";
import Login from './pages/login/index.tsx';
import SignUp from "./pages/sign-up/index.tsx";
import Landing from "./pages/landing/index.tsx";

import { App } from './App.tsx';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/theme.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Landing />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/home",
    element:
      <App>
        <Home />
      </App> 
  },

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </React.StrictMode>
);