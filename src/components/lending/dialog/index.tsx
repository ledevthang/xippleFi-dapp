import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PropsWithChildren } from "react";
import { dialogBodyStyles } from "@/constants";

interface LendingDialogProps extends PropsWithChildren {
  active: boolean;
  title: string;
  footer: string;
}

function LendingDialog({
  children,
  title,
  footer,
  active,
}: LendingDialogProps) {
  return (
    <DialogContent className={dialogBodyStyles}>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
      </DialogHeader>
      {children}
      <DialogFooter className="mt-6 flex-1 !justify-center">
        <Button type="submit" className="w-full" disabled={!active}>
          {active ? footer : "Enter an amount"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

export default LendingDialog;
