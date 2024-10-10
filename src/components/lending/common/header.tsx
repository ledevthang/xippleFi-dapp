interface HeaderProps {
  columns: { label: string; className?: string }[];
  className?: string;
}

export const headerStyles = `text-xs font-bold text-[#8c8c8c]`;

export default function Header({ columns, className }: HeaderProps) {
  return (
    <div className={`mb-3 grid grid-cols-5 gap-2 ${className}`}>
      {columns.map(({ label, className }, index) => (
        <p key={index} className={`${className} ${headerStyles}`}>
          {label}
        </p>
      ))}
    </div>
  );
}
