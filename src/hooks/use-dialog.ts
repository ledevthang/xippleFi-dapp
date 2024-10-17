import { DialogContext } from "@/providers/dialog-provider";
import { useContext } from "react";

function useDialog() {
  const { context, onChange, onClose } = useContext(DialogContext);

  return {
    context,
    onClose,
    onChange,
  };
}

export default useDialog;
