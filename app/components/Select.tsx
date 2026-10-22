'use client';
export interface SelectProps {
  label: string;
  id: string;
}

export default function Select({ label, id }: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-600 mb-1"
      >
        {label}
      </label>
      <select
        id={id}
       className="w-full h-[52px] rounded-lg border border-gray-300 px-4 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-green-600 focus:border-green-600"

      >
        <option value="">Selecione um veículo</option>
      </select>
    </div>
  );
}
