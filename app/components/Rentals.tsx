'use client';

import { useState } from 'react';
import { ClipboardList, Filter, Plus, UserPlus } from 'lucide-react';
import NovaLocacao from './modalForms/novaLocacao';

type RentalsViewProps = {
  setJanela: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
      content: React.ReactNode;
    }>
  >;
};

export default function RentalsView({ setJanela }: RentalsViewProps) {
  const [showFilters, setShowFilters] = useState(false);

  function abrirNovaLocacao() {
    setJanela({
      open: true,
      title: 'Nova Locação',
      content: (
        <NovaLocacao />
      ),
    });
  }


  return (
    <div id="rentals-view" className="view">
      <header className="mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Locações
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Filtre por cliente, veículo ou período
        </p>
      </header>

      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-slate-100">
              Ativas
            </button>

            <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-slate-100">
              Finalizadas
            </button>

            <select className="px-3 py-1 text-sm border rounded-md bg-white">
              <option>Ordenar</option>
              <option>Mais recentes</option>
              <option>Mais antigas</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden bg-white border px-3 py-2.5 rounded-lg"
            >
              <Filter size={18} />
            </button>

            <button
              onClick={abrirNovaLocacao}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 flex-1 sm:flex-none"
            >
              <Plus size={18} />
              <span>Adicionar Locação</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="sm:hidden flex flex-col gap-2">
            <button className="px-3 py-2 text-sm border rounded-md bg-white">
              Ativas
            </button>

            <button className="px-3 py-2 text-sm border rounded-md bg-white">
              Finalizadas
            </button>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Ordenar</option>
              <option>Mais recentes</option>
              <option>Mais antigas</option>
            </select>
          </div>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <p className="text-slate-500 text-center py-8">
          Nenhuma locação registrada ainda
        </p>
      </div>
    </div>
  );
}
