import { ReactNode } from "react";

export interface DialogContextState {
  open: boolean;
  title?: string;
  description?: string;
  content?: ReactNode;
  footer?: string;
}

export interface DialogContextProps {
  context: DialogContextState;
  onChange: (data: DialogContextState) => void;
}
