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
import Project from "./pages/project/index.tsx";

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
  {
    path: "/project/:id",
    element:
      <App>
        <Project />
      </App>,
    children: [{
      path: "sprint/:sprintId",
      children: [{ path: "card/:cardId" }]
    }]
  }

]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
    <Toaster />
  </>
);