'use client';

import { Eye, Trash2, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import Toast from './toast';

type MarcaVeiculo = {
  ID: number;
  Marca: string;
  Criado_em: string;
};

type TipoVeiculo = {
  ID: number;
  Tipo: string;
  Criado_em: string;
};

type ModeloVeiculoDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ModeloVeiculoDrawer({ isOpen, onClose }: ModeloVeiculoDrawerProps) {
  const [marcas, setMarcas] = useState<MarcaVeiculo[]>([]);
  const [tipos, setTipos] = useState<TipoVeiculo[]>([]);

  const [selectedMarca, setSelectedMarca] = useState<number | null>(null);
  const [selectedTipo, setSelectedTipo] = useState<number | null>(null);

  const [modelo, setModelo] = useState('');
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error'; closeDrawer?: boolean } | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    fetch('http://127.0.0.1:8000/marcas_veiculo')
      .then(res => res.json())
      .then(data => setMarcas(data))
      .catch(err => console.error('Erro ao carregar marcas:', err));

    fetch('http://127.0.0.1:8000/tipos_veiculo')
      .then(res => res.json())
      .then(data => setTipos(data))
      .catch(err => console.error('Erro ao carregar tipos:', err));

  }, [isOpen]);

  const handleSalvar = async () => {
    if (!modelo) {
      setToast({ message: 'Modelo é obrigatório', type: 'error' });
      return;
    }

    if (!selectedMarca) {
      setToast({ message: 'Marca é obrigatória', type: 'error' });
      return;
    }

    if (!selectedTipo) {
      setToast({ message: 'Tipo é obrigatório', type: 'error' });
      return;
    }

    const payload = {
      Modelo: modelo,
      MarcaID: selectedMarca,
      TipoID: selectedTipo,
    };

    try {
      const res = await fetch('http://127.0.0.1:8000/modelo_veiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: 'Modelo de veículo criado com sucesso', type: 'success', closeDrawer: true });
        setModelo('');
        setSelectedMarca(null);
        setSelectedTipo(null);
      } else {
        setToast({ message: 'Erro: ' + data.error, type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Erro ao salvar modelo', type: 'error' });
    }
  };

  const handleToastClose = () => {
    if (toast?.closeDrawer) onClose();
    setToast(null);
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />}

      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      />

      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ width: '360px', maxWidth: '100%', overflow: 'hidden' }}
      >
        <div className="flex flex-col h-full bg-white shadow-2xl p-6">

          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Novo Modelo de Veículo</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
              <X size={20} />
            </button>
          </div>

          <div className="flex gap-2 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-sm">
              <Eye size={16} />
              Visualizar todos
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-xl text-sm">
              <Trash2 size={16} />
              Remover modelo
            </button>
          </div>

          {/* Marca */}
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">Marca do veículo</label>
            <select
              value={selectedMarca ?? ''}
              onChange={e => setSelectedMarca(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
            >
              <option value="" disabled>Selecione uma marca</option>
              {marcas.map(marca => (
                <option key={marca.ID} value={marca.ID}>
                  {marca.Marca}
                </option>
              ))}
            </select>
          </div>

          {/* Tipo (AGORA abaixo da marca) */}
          <div className="mb-4">
            <label className="block text-sm text-slate-600 mb-2">Tipo do veículo</label>
            <select
              value={selectedTipo ?? ''}
              onChange={e => setSelectedTipo(Number(e.target.value))}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
            >
              <option value="" disabled>Selecione um tipo</option>
              {tipos.map(tipo => (
                <option key={tipo.ID} value={tipo.ID}>
                  {tipo.Tipo}
                </option>
              ))}
            </select>
          </div>

          {/* Modelo (AGORA por último) */}
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">Modelo do veículo</label>
            <input
              type="text"
              placeholder="Ex: Corolla, Civic..."
              value={modelo}
              onChange={e => setModelo(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2"
            />
          </div>

          <div className="flex-1" />

          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:text-slate-700">
              Cancelar
            </button>

            <button
              onClick={handleSalvar}
              className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl"
            >
              <Save size={16} />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}