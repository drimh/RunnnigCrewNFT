import { useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Main } from "./pages/Main";
import ErrorPage from "./pages/error/ErrorPage";
import NotFoundErrorPage from "./pages/error/NotFoundErrorPage";
import { Mint } from "./pages/Mint";
import Login from "./pages/Login";

export default function App() {
  const [account, setAccount] = useState("");
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/mint",
      element: <Mint />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/login",
      element: <Login setAccount={setAccount} />,
      errorElement: <ErrorPage />,
    },
    {
      path: "*",
      element: <NotFoundErrorPage />,
    },
  ]);
  return <RouterProvider router={router} />;
}
