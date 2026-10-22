'use client';

import { ReactNode } from 'react';
import { X, Save, Printer, RefreshCcw } from 'lucide-react';

type JanelaProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
};

export default function Janela({ open, title, onClose, children }: JanelaProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-2">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md md:max-w-lg lg:max-w-xl overflow-hidden">

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-100 border-b select-none">
          <span className="text-sm font-semibold text-slate-700">
            {title}
          </span>

          <div className="flex items-center gap-2">
            <button
              className="hidden p-1 rounded hover:bg-slate-200"
              title="Atualizar"
            >
              <RefreshCcw size={16} />
            </button>

            <button
              className="hidden p-1 rounded hover:bg-slate-200"
              title="Salvar"
            >
              <Save size={16} />
            </button>

            <button
              className="hidden p-1 rounded hover:bg-slate-200"
              title="Imprimir"
            >
              <Printer size={16} />
            </button>

            <button
              onClick={onClose}
              className="p-1 rounded hover:bg-red-500 hover:text-white"
              title="Fechar"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="p-4 md:p-6 lg:p-6 max-h-[85vh] md:max-h-[80vh] lg:max-h-[75vh] overflow-y-auto overflow-x-hidden">
          {children}
        </div>

      </div>
    </div>
  );
}
