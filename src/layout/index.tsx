export { default as Header } from "./header";
import { Header } from "@/layout";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Header />
      <div className="flex flex-1 bg-[#161B28]">
        <div className="container mx-auto flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
