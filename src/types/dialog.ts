import { ReactNode } from "react";

export interface DialogContextState {
  open: boolean;
  title?: string;
  description?: string;
  content?: ReactNode;
  footer?: string;
  onSubmit?: () => void;
}

export interface DialogContextProps {
  context: DialogContextState;
  onClose: () => void;
  onChange: (data: DialogContextState) => void;
}
