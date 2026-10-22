'use client';

import React, { useState, useEffect } from 'react';
import Toast from './toast';

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
};

type Marca = { ID: number; Marca: string };
type Tipo = { ID: number; Tipo: string };
type Modelo = { id: number; modelo: string; marca_id: number; tipo_id: number };

type NovoVeiculoProps = {
  fetchVeiculos: () => Promise<void>;
  fecharJanela: () => void;
};


export default function NovoVeiculo({ fetchVeiculos, fecharJanela }: NovoVeiculoProps) {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [tipos, setTipos] = useState<Tipo[]>([]);
  const [modelos, setModelos] = useState<Modelo[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [marcaSelecionada, setMarcaSelecionada] = useState<number | null>(null);
  const [tipoSelecionado, setTipoSelecionado] = useState<number | null>(null);
  const [modeloSelecionado, setModeloSelecionado] = useState<number | null>(null);
  const [placa, setPlaca] = useState('');
  const [ano, setAno] = useState<number | null>(null);
  const [cor, setCor] = useState('');
  const [valorDiaria, setValorDiaria] = useState<number | null>(null);
  const [status, setStatus] = useState('');
  const [mensagem, setMensagem] = useState('');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/marcas_veiculo').then(res => res.json()).then(setMarcas);
    fetch('http://127.0.0.1:8000/tipos_veiculo').then(res => res.json()).then(setTipos);
    fetch('http://127.0.0.1:8000/modelo_veiculo').then(res => res.json()).then(setModelos);
  }, []);

  const modelosFiltrados = modelos.filter(
    m => m.marca_id === marcaSelecionada && m.tipo_id === tipoSelecionado
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!marcaSelecionada || !tipoSelecionado || !modeloSelecionado || !placa || !valorDiaria) {
      setMensagem('Preencha todos os campos obrigatórios!');
      return;
    }

    const payload: Omit<Veiculo, 'id'> = {
      marca_id: marcaSelecionada,
      modelo_id: modeloSelecionado,
      tipo_id: tipoSelecionado,
      placa,
      ano: ano ?? 0,
      cor,
      valor_diaria: valorDiaria,
      status,
      criado_em: new Date().toISOString(),
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/veiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        await res.json();
        await fetchVeiculos();
        setToastMessage('Veículo cadastrado com sucesso!');
        setToastVisible(true);

        setMarcaSelecionada(null);
        setTipoSelecionado(null);
        setModeloSelecionado(null);
        setPlaca('');
        setAno(null);
        setCor('');
        setValorDiaria(null);
        setStatus('');
      } else {
        const data = await res.json();
        setMensagem('Erro: ' + (data.error || 'não foi possível cadastrar'));
      }
    } catch (err) {
      console.error(err);
      setMensagem('Erro ao cadastrar veículo');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl p-8 relative">
        <h3 className="text-3xl font-bold text-gray-800 mb-6">Cadastrar Novo Veículo</h3>

        {mensagem && (
          <div className="p-3 bg-yellow-50 text-yellow-800 border-l-4 border-yellow-400 rounded mb-6">
            {mensagem}
          </div>
        )}

        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {/* Marca */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={marcaSelecionada ?? ''}
              onChange={e => {
                setMarcaSelecionada(Number(e.target.value));
                setTipoSelecionado(null);
                setModeloSelecionado(null);
              }}
            >
              <option value="" disabled>Selecione a marca</option>
              {marcas.map(m => <option key={m.ID} value={m.ID}>{m.Marca}</option>)}
            </select>
          </div>

          {/* Tipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
            <select
              className={`w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${!marcaSelecionada ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
              value={tipoSelecionado ?? ''}
              onChange={e => {
                setTipoSelecionado(Number(e.target.value));
                setModeloSelecionado(null);
              }}
              disabled={!marcaSelecionada}
            >
              <option value="" disabled>{!marcaSelecionada ? 'Defina marca primeiro' : 'Selecione o tipo'}</option>
              {tipos.map(t => <option key={t.ID} value={t.ID}>{t.Tipo}</option>)}
            </select>
          </div>

          {/* Modelo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modelo</label>
            <select
              className={`w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition ${modelosFiltrados.length === 0 ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
              value={modeloSelecionado ?? ''}
              onChange={e => setModeloSelecionado(Number(e.target.value))}
              disabled={!tipoSelecionado}
            >
              <option value="" disabled>{!tipoSelecionado ? 'Defina tipo primeiro' : 'Selecione o modelo'}</option>
              {modelosFiltrados.map(m => <option key={m.id} value={m.id}>{m.modelo}</option>)}
            </select>
          </div>

          {/* Placa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Placa</label>
            <input
              placeholder="Ex: ABC1D23"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={placa}
              onChange={e => setPlaca(e.target.value)}
            />
          </div>

          {/* Ano */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Ano</label>
            <input
              type="number"
              placeholder="Ex: 2023"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={ano ?? ''}
              onChange={e => setAno(Number(e.target.value))}
            />
          </div>

          {/* Cor */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Cor</label>
            <input
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={cor}
              onChange={e => setCor(e.target.value)}
            />
          </div>

          {/* Valor diária */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valor Diária</label>
            <input
              type="number"
              step="0.01"
              placeholder="Ex: 175.00"
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={valorDiaria ?? ''}
              onChange={e => setValorDiaria(Number(e.target.value))}
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              className="w-full rounded-xl border border-gray-300 px-4 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              <option value="">Selecione</option>
              <option value="disponivel">Disponível</option>
              <option value="alugado">Alugado</option>
              <option value="manutencao">Manutenção</option>
            </select>
          </div>

          {/* Botões */}
          <div className="md:col-span-2 flex justify-end gap-4 pt-6">
            <button
              type="button"
              className="px-6 py-2 rounded-xl border border-gray-300 hover:bg-gray-100 transition font-medium"
              onClick={fecharJanela}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-medium transition"
            >
              Cadastrar Veículo
            </button>
          </div>
        </form>

        {/* Toast de sucesso */}
      {toastVisible && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setToastVisible(false)}
        />
      )}

      </div>
    </div>
  );
}