'use client';

import { useState } from 'react';
import StatsCards from './StatsCards';
import { PlusCircle, FileText, TrendingUp, DollarSign, BarChart3, Calendar, Users, ChevronDown } from 'lucide-react';
import TipoVeiculoModal from './modalForms/novoTipoVeiculo';
import MarcaVeiculoDrawer from './modalForms/novoMarcaVeiculo';
import ModeloVeiculoDrawer from './modalForms/novoModeloVeiculo';

type ModalsState = {
  tipo: boolean;
  marca: boolean;
  modelo: boolean;
};

export default function DashboardView() {

  const [modals, setModals] = useState<ModalsState>({
    tipo: false,
    marca: false,
    modelo: false,
  });

  const openModal = (key: keyof ModalsState) => {
    setModals((prev) => ({ ...prev, [key]: true }));
  };

  const closeModal = (key: keyof ModalsState) => {
    setModals((prev) => ({ ...prev, [key]: false }));
  };

  const buttons = [
    { label: 'Marca', key: 'marca' },
    { label: 'Modelo', key: 'modelo' },
    { label: 'Tipo', key: 'tipo' },
  ] as const;
  
  return (
    <div className="view px-4 py-6 h-full">
      <header className="mb-8">
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Dashboard
        </h2>
        <p className="text-slate-500 font-medium text-sm">
          Gerencie sua frota e acompanhe seus resultados.
        </p>
      </header>

      <StatsCards />

      <div className="flex flex-col gap-6 mt-10 pb-10">
        
        <section className="bg-white border border-slate-200 p-5 rounded-[1.5rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-md shadow-indigo-100">
              <PlusCircle size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Veículos
            </h3>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            {buttons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => openModal(btn.key)}
                className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold border border-indigo-600 rounded-xl bg-indigo-50 text-indigo-800 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
              >
                <PlusCircle size={14} />
                {btn.label}
              </button>
            ))}
          </div>

          <TipoVeiculoModal
            isOpen={modals.tipo}
            onClose={() => closeModal('tipo')}
          />

          <MarcaVeiculoDrawer
            isOpen={modals.marca}
            onClose={() => closeModal('marca')}
          />

          <ModeloVeiculoDrawer
            isOpen={modals.modelo}
            onClose={() => closeModal('modelo')}
          />
        </section>

        <section className="bg-white border border-slate-200 p-5 rounded-[1.5rem] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-md shadow-indigo-100">
              <BarChart3 size={18} className="text-white" />
            </div>
            <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
              Geral e Relatórios
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: 'Relatório', icon: FileText },
              { label: 'Veículos mais alugados', icon: TrendingUp },
              { label: 'Receita por veículo', icon: DollarSign },
              { label: 'Receita Total', icon: BarChart3 },
              { label: 'Frequência de clientes', icon: Users },
            ].map((item) => (
              <button
                key={item.label}
                className="flex items-center gap-2 px-4 py-1.5 text-xs font-bold border border-indigo-600 rounded-xl bg-indigo-50 text-indigo-800 hover:bg-indigo-600 hover:text-white transition-all active:scale-95"
              >
                <item.icon size={14} />
                {item.label}
              </button>
            ))}

            <div className="relative">
              <Calendar size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-indigo-800" />
              <select className="appearance-none pl-9 pr-8 py-1.5 text-xs font-bold border border-indigo-600 rounded-xl bg-indigo-50 text-indigo-800 cursor-pointer focus:outline-none hover:bg-indigo-600 hover:text-white transition-all">
                <option>Filtro por meses</option>
                <option>Março 2026</option>
                <option>Abril 2026</option>
              </select>
              <ChevronDown size={12} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-800" />
            </div>

          </div>
        </section>

      </div>
    </div>
  );
}