import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { APP_ROUTE } from "@/types";
import Layout from "./layout";
import Loading from "./components/loading";
import { ErrorPage, LendingPage, StakePage, SwapPage } from "./pages";

const router = createBrowserRouter([
  {
    path: APP_ROUTE.HOME,
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <LendingPage />,
      },
      {
        path: APP_ROUTE.STAKE,
        element: <StakePage />,
      },
      {
        path: APP_ROUTE.SWAP,
        element: <SwapPage />,
      },
      {
        path: "*",
        element: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<Loading />} />;
}

export default App;
