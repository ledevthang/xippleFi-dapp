import { PropsWithChildren } from "react";

function Row({ children }: PropsWithChildren) {
  return (
    <div className="grid cursor-pointer grid-cols-5 gap-2 rounded-sm px-2 py-1 transition hover:bg-[#151b28]">
      {children}
    </div>
  );
}

export default Row;
