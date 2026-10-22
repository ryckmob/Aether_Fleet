'use client';

import { useState } from 'react';
import { Eye, Trash2, Save, X } from 'lucide-react';
import Toast from './toast';

type MarcaVeiculoDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MarcaVeiculoDrawer({ isOpen, onClose }: MarcaVeiculoDrawerProps) {
  const [marca, setMarca] = useState('');
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error'; closeDrawer?: boolean } | null>(null);

  const handleSalvar = async () => {
    if (!marca) {
      setToast({ message: 'Marca é obrigatória', type: 'error' });
      return;
    }

    const payload = { Marca: marca };

    try {
      const res = await fetch('http://127.0.0.1:8000/marcas_veiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: 'Marca de veículo criada com sucesso', type: 'success', closeDrawer: true });
        setMarca('');
      } else {
        setToast({ message: 'Erro: ' + data.error, type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setToast({ message: 'Erro ao salvar marca', type: 'error' });
    }
  };

  const handleToastClose = () => {
    if (toast?.closeDrawer) onClose();
    setToast(null);
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={handleToastClose} />}

      {/* Overlay */}
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      />

      {/* Drawer corrigido */}
      <div
        className={`fixed top-0 right-0 h-full z-50 transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ width: '360px', maxWidth: '100%', overflow: 'hidden' }} // largura fixa e overflow oculto
      >
        <div className="flex flex-col h-full bg-white shadow-2xl p-6">

          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-800">Nova Marca de Veículo</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800">
              <X size={20} />
            </button>
          </div>

          {/* Ações */}
          <div className="flex gap-2 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-sm">
              <Eye size={16} />
              Visualizar todas
            </button>

            <button className="flex-1 flex items-center justify-center gap-2 bg-red-100 hover:bg-red-200 text-red-600 py-2 rounded-xl text-sm">
              <Trash2 size={16} />
              Remover marca
            </button>
          </div>

          {/* Campo Marca */}
          <div className="mb-6">
            <label className="block text-sm text-slate-600 mb-2">Marca do veículo</label>
            <input
              type="text"
              placeholder="Ex: Toyota, Honda..."
              value={marca}
              onChange={e => setMarca(e.target.value)}
              className="w-full border border-slate-300 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div className="flex-1" />

          {/* Footer */}
          <div className="flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 text-slate-500 hover:text-slate-700">Cancelar</button>

            <button onClick={handleSalvar} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-4 py-2 rounded-xl">
              <Save size={16} />
              Salvar
            </button>
          </div>
        </div>
      </div>
    </>
  );
}