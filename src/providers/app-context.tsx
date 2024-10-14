import { AppContextProps } from "@/types";
import { createContext, PropsWithChildren, useState } from "react";

export const Context = createContext<AppContextProps>({} as never);

function AppContext({ children }: PropsWithChildren) {
  const [isLogin, setLogin] = useState(false);
  const onLogin = (_isLogin: boolean) => {
    setLogin(_isLogin);
  };

  const context: AppContextProps = {
    isLogin,
    onLogin,
  };

  return <Context.Provider value={context}>{children}</Context.Provider>;
}

export default AppContext;
