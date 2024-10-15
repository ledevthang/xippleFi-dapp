import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/layout";
import { Outlet } from "react-router";
import Footer from "./footer";

function Layout() {
  return (
    <div className="flex min-h-[100vh] flex-col">
      <Header />
      <div className="bg body flex flex-1">
        <Outlet />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}

export default Layout;
export { default as Header } from "./header";
