'use client';
export default function TotalValue() {
  return (
    <div className="md:col-span-2 bg-slate-50 rounded-lg p-4 flex justify-between items-center">
      <span className="text-slate-600 font-medium">Valor Total</span>
      <span className="text-xl font-bold text-indigo-600">R$ 0,00</span>
    </div>
  );
}
