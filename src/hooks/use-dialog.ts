import { DialogContext } from "@/providers/dialog-provider";
import { useContext } from "react";

function useDialog() {
  const { context, onChange } = useContext(DialogContext);

  return {
    context,
    onChange,
  };
}

export default useDialog;
