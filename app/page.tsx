'use client';

import { useState } from 'react';
import { LayoutDashboard, Car, ClipboardList, User } from 'lucide-react';

import DashboardView from './components/Dashboard';
import VehiclesView from './components/Vehicles';
import RentalsView from './components/Rentals';
import ClientesView from './components/Clientes';
import Janela from './components/Janela';

type JanelaState = {
  open: boolean;
  title: string;
  content: React.ReactNode;
};

export default function Home() {
  const [view, setView] = useState<'dashboard' | 'vehicles' | 'rentals' | 'new-rentals' | 'clientes'>('dashboard');

  const [janela, setJanela] = useState<JanelaState>({
    open: false,
    title: '',
    content: null
  });

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="flex flex-col lg:flex-row h-full">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 bg-gradient-to-b from-indigo-600 to-indigo-800 text-white shadow-2xl z-10 flex flex-col">
          
          <div className="p-6 flex flex-col items-center justify-center">
            <div className="mb-1">
              <img
                src="/zBe5j01.svg"
                alt="Fundo SVG"
                className="w-[200px] opacity-100"
                style={{ filter: "invert(1) brightness(2)" }}
                onClick={() => setView('dashboard')}
              />
            </div>

            <p className="text-indigo-200 text-sm text-center">
              Sistema de Gestão de Locação
            </p>
          </div>
          
          <nav className="flex lg:block overflow-x-auto lg:overflow-visible border-t border-indigo-500/30 flex-1">
            <button
              onClick={() => setView('dashboard')}
              className={`flex-1 lg:w-full px-6 py-3 flex items-center gap-3 justify-center lg:justify-start hidden md:flex transition-colors
                ${view === 'dashboard' ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-700 text-indigo-100'}`}
            >
              <LayoutDashboard size={20} />
              <span className="hidden sm:inline">Dashboard</span>
            </button>

            <button
              onClick={() => setView('clientes')}
              className={`flex-1 lg:w-full px-6 py-3 flex items-center gap-3 justify-center lg:justify-start transition-colors
                ${view === 'clientes' ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-700 text-indigo-100'}`}
            >
              <User size={20} />
              <span className="hidden sm:inline">Clientes</span>
            </button>

            <button
              onClick={() => setView('vehicles')}
              className={`flex-1 lg:w-full px-6 py-3 flex items-center gap-3 justify-center lg:justify-start transition-colors
                ${view === 'vehicles' ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-700 text-indigo-100'}`}
            >
              <Car size={20} />
              <span className="hidden sm:inline">Veículos</span>
            </button>

            <button
              onClick={() => setView('rentals')}
              className={`flex-1 lg:w-full px-6 py-3 flex items-center gap-3 justify-center lg:justify-start transition-colors
                ${view === 'rentals' ? 'bg-indigo-500 text-white' : 'hover:bg-indigo-700 text-indigo-100'}`}
            >
              <ClipboardList size={20} />
              <span className="hidden sm:inline">Locações</span>
            </button>
          </nav>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 overflow-y-auto">
          {view === 'dashboard' && <DashboardView />}
          {view === 'clientes' && <ClientesView setJanela={setJanela} />}
          {view === 'vehicles' && <VehiclesView setJanela={setJanela} />}
          {view === 'rentals' && <RentalsView setJanela={setJanela} />}
        </main>
      </div>

      <Janela
        open={janela.open}
        title={janela.title}
        onClose={() => setJanela(prev => ({ ...prev, open: false }))}
      >
        {janela.content}
      </Janela>
    </div>
  );
}