import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/layout";
import { Outlet } from "react-router";

function Layout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Header />
      <div className="bg flex flex-1">
        <Outlet />
        <Toaster />
      </div>
    </div>
  );
}

export default Layout;
export { default as Header } from "./header";
