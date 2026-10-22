'use client';
export interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 lg:p-6 space-y-4">
      <h3 className="text-lg font-bold text-slate-800">{title}</h3>
      <div >{children}</div>
    </div>
  );
}
