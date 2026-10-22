'use client';

import { useState, useEffect } from 'react';
import {
  Filter,
  Plus,
  Trash2Icon,
  User
} from 'lucide-react';
import NovoCliente from './modalForms/novoCliente';
import ClientsList from './ClientesList';

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  foto: string;
  criado_em: string;
};

type ClientesViewProps = {
  setJanela: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      title: string;
      content: React.ReactNode;
    }>
  >;
};

export default function ClientesView({ setJanela }: ClientesViewProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  // Busca os clientes da API
  async function carregarClientes() {
    setLoading(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/cliente');
      if (response.ok) {
        const data = await response.json();
        setClientes(data);
      } else {
        console.error('Erro ao buscar clientes');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarClientes();
  }, []);

  function abrirCadastroCliente() {
    setJanela({
      open: true,
      title: 'Cadastro de Cliente',
      content: (
        <NovoCliente
          onSuccess={() => {
            setJanela(prev => ({ ...prev, open: false }));
            carregarClientes(); // Recarrega a lista após cadastrar
          }}
          onCancel={() => setJanela(prev => ({ ...prev, open: false }))}
        />
      )
    });
  }

  return (
    <div id="clientes-view" className="view">
      <header className="mx-auto px-4 pt-10 pb-6">
        <div className="flex items-center gap-3">
          <User className="w-6 h-6 text-green-600" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Clientes
          </h1>
        </div>

        <p className="mt-2 text-sm text-gray-500">
          Filtre o cliente por nome ou CPF.
        </p>
      </header>

      <div className="flex flex-col gap-4 mb-6 sm:mb-8">
        <div className="flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-2">
            <button className="px-3 py-2 text-sm border rounded-md bg-white hover:bg-slate-100">
              Recentes
            </button>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Por período</option>
              <option>Dia</option>
              <option>Semana</option>
              <option>Mês</option>
              <option>Ano</option>
            </select>

            <button className="flex px-3 py-2 text-sm border rounded-md bg-white hover:bg-slate-100 items-center gap-2">
              <Trash2Icon className="w-5 h-5" />
              Limpar filtro
            </button>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="sm:hidden bg-white border px-3 py-2.5 rounded-lg"
            >
              <Filter size={18} />
            </button>

            <button
              onClick={abrirCadastroCliente}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center gap-2 flex-1 sm:flex-none"
            >
              <Plus size={18} />
              <span>Adicionar Cliente</span>
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="sm:hidden flex flex-col gap-2">
            <button className="px-3 py-2 text-sm border rounded-md bg-white">
              Recentes
            </button>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Status</option>
              <option>Ativo</option>
              <option>Inativo</option>
            </select>

            <select className="px-3 py-2 text-sm border rounded-md bg-white">
              <option>Por período</option>
              <option>Dia</option>
              <option>Semana</option>
              <option>Mês</option>
              <option>Ano</option>
            </select>
          </div>
        )}
      </div>

      {/* Passando as props obrigatórias aqui */}
      <ClientsList clientes={clientes} loading={loading} />

    </div>
  );
}