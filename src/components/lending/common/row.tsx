import { PropsWithChildren } from "react";

interface RowProps extends PropsWithChildren {
  onClick?: () => void;
  className?: string;
}

function Row({ children, onClick, className }: RowProps) {
  return (
    <div
      className={`grid cursor-pointer grid-cols-5 gap-2 rounded-sm px-2 py-1 transition hover:bg-[#151b28] ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export default Row;
