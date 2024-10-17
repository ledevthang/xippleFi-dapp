import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dialogBodyStyles } from "@/constants";
import { DialogContextProps, DialogContextState } from "@/types/dialog";
import { createContext, PropsWithChildren, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";
export const DialogContext = createContext<DialogContextProps>({} as never);

function DialogProvider({ children }: PropsWithChildren) {
  const [state, setState] = useState<DialogContextState>({ open: false });
  const { open, title, description, content, footer, onSubmit } = state;

  const onChange = (state: DialogContextState) => {
    setState(state);
  };

  const onClose = () => {
    setState({ open: false });
  };

  const context = {
    context: state,
    onClose,
    onChange: onChange,
  };

  return (
    <DialogContext.Provider value={context}>
      {children}
      <Dialog.Root
        open={open}
        defaultOpen={false}
        onOpenChange={() => onClose()}
      >
        <DialogContent
          className={dialogBodyStyles}
          onPointerDownOutside={onClose}
          onInteractOutside={onClose}
        >
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription className="text-xs text-white">
              {description}
            </DialogDescription>
          </DialogHeader>
          {content}
          <DialogFooter className="mt-6 flex-1 !justify-center">
            <Button
              type="submit"
              className="w-full"
              disabled={!footer}
              onClick={onSubmit}
            >
              {footer || "Enter an amount"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog.Root>
    </DialogContext.Provider>
  );
}

export default DialogProvider;
