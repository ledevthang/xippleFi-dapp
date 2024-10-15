import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { NAVBARS } from "@/constants";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function NavbarXs() {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="sm:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <HamburgerMenuIcon className="ml-3 size-7" />
        </SheetTrigger>
        <SheetContent className="bg-dialog">
          <ul className="flex cursor-pointer flex-col items-end gap-4 pt-10 font-semibold text-white">
            {NAVBARS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => (isActive ? "text-[#69e2db]" : "")}
                onClick={onClose}
              >
                <li className="hover:text-[#69e2db]">{label}</li>
              </NavLink>
            ))}
          </ul>
        </SheetContent>
      </Sheet>
    </div>
  );
}
