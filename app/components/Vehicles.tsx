'use client';

import { useEffect, useState } from 'react';
import { Car, Plus, Filter } from 'lucide-react';
import VehiclesList from './VehiclesList';
import NovoVeiculo from './modalForms/novoVeiculo';

type VehiclesViewProps = {
  setJanela: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
      content: React.ReactNode;
    }>
  >;
};

type Veiculo = {
  id: number;
  marca_id: number;
  modelo_id: number;
  tipo_id: number;
  placa: string;
  ano: number;
  cor: string;
  valor_diaria: number;
  status: string;
  criado_em: string;
  marca_label?: string;
  modelo_label?: string;
  tipo_label?: string;
};

export default function VehiclesView({ setJanela }: VehiclesViewProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVeiculos = async () => {
  setLoading(true);

  try {
    const res = await fetch('http://127.0.0.1:8000/veiculo');
    const data: Veiculo[] = await res.json();

    setVeiculos(data);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchVeiculos();
  }, []);


  function abrirCadastroVeiculo() {
    setJanela({
      open: true,
      title: 'Cadastro de Veículo',
      content: (
        <NovoVeiculo 
        fetchVeiculos={fetchVeiculos} 
        fecharJanela={() => setJanela(prev => ({ ...prev, open: false }))}
        />
      )
    });
  }

  return (
    <div id="vehicles-view" className="view">
      <header className="mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <Car className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Veículos
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Gerencie os veículos disponíveis para locação
        </p>
      </header>

      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-slate-100">
              Ativos
            </button>

            <button className="px-3 py-1 text-sm border rounded-md bg-white hover:bg-slate-100">
              Inativos
            </button>

            <select className="px-3 py-1 text-sm border rounded-md bg-white">
              <option>Categoria</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <select className="px-3 py-1 text-sm border rounded-md bg-white">
              <option>Ordenar</option>
              <option>Mais recentes</option>
              <option>Mais antigos</option>
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
              onClick={abrirCadastroVeiculo}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 flex-1 sm:flex-none"
            >
              <Plus size={18} />
              <span>Adicionar veículo</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="sm:hidden flex flex-col gap-2">
            <button className="px-3 py-2 text-sm border rounded-md bg-white">
              Ativos
            </button>

            <button className="px-3 py-2 text-sm border rounded-md bg-white">
              Inativos
            </button>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Categoria</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Ordenar</option>
              <option>Mais recentes</option>
              <option>Mais antigos</option>
            </select>
          </div>
        )}
      </div>

      <VehiclesList veiculos={veiculos} loading={loading} />

    </div>
  );
}
