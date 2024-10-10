import { PropsWithChildren } from "react";

interface AssetsProps extends PropsWithChildren {
  label: string;
  color: string;
}

function Assets({ label, color, children }: AssetsProps) {
  return (
    <div className="flex !h-fit flex-1 flex-col">
      <div className="mb-7 flex items-center gap-9">
        <div className={`h-full w-[2px] bg-[${color}]`}></div>
        <h3 className={`text-xl font-bold text-[${color}]`}>{label}</h3>
      </div>
      {children}
    </div>
  );
}

export default Assets;
