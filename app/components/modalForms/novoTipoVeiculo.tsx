'use client';

import { useState, useRef, useEffect } from 'react';
import { Save, X, Download, Eye, Upload, ChevronDown } from 'lucide-react';
import Toast from './toast';
import React from 'react';

type TipoVeiculoDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function TipoVeiculoDrawer({ isOpen, onClose }: TipoVeiculoDrawerProps) {
  const [tipo, setTipo] = useState('');
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error'; closeDrawer?: boolean } | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSave = async () => {
    if (!tipo.trim()) {
      setToast({ message: 'Digite o tipo do veículo', type: 'error' });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch('http://127.0.0.1:8000/tipos_veiculo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Tipo: tipo }),
      });
      const data = await res.json().catch(() => ({ error: 'Resposta inválida' }));
      if (!res.ok) throw new Error(data.error || 'Erro ao salvar');
      setToast({ message: 'Tipo de veículo criado com sucesso', type: 'success', closeDrawer: true });
      setTipo('');
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadCSV = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);
    setMenuOpen(false);

    try {
      const res = await fetch('http://127.0.0.1:8000/tipos_veiculo/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json().catch(() => ({ error: 'Erro no servidor' }));
      if (!res.ok) throw new Error(data.error || 'Erro no upload');
      setToast({ message: data.message || 'Importado com sucesso!', type: 'success' });
    } catch (err: any) {
      setToast({ message: err.message, type: 'error' });
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <div onClick={onClose} className={`fixed inset-0 bg-black/40 z-40 transition-opacity ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} />

      <div className={`fixed top-0 right-0 h-full z-50 bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ width: '360px' }}>
        <div className="flex flex-col h-full p-6">
          
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-lg font-bold text-slate-800">Novo Tipo de Veículo</h2>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-800 p-1"><X size={20} /></button>
          </div>

          {/* Seção de Botões Lado a Lado */}
          <div className="flex gap-2 mb-8">
  
          {/* Dropdown Avançado */}
          <div className="flex-1 relative" ref={dropdownRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full flex items-center justify-center gap-2 
              bg-slate-100 hover:bg-slate-200 
              text-slate-800 
              py-2.5 px-4 rounded-xl text-xs font-bold 
              border border-slate-200 transition-all"
            >
              Avançado 
              <ChevronDown 
                size={14} 
                className={`transition-transform ${menuOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {menuOpen && (
              <div className="absolute top-full left-0 mt-2 w-full bg-white border border-slate-200 rounded-xl shadow-xl z-[60] py-1 overflow-hidden">
                <button
                  onClick={() => { fileInputRef.current?.click(); }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  <Upload size={14} className="text-emerald-600" /> Importar CSV
                </button>
                <button
                  onClick={() => window.open('http://127.0.0.1:8000/tipos_veiculo/csv', '_blank')}
                  className="w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold text-slate-700 border-t border-slate-50 hover:bg-slate-50"
                >
                  <Download size={14} className="text-blue-600" /> Exportar CSV
                </button>
              </div>
            )}
            <input type="file" ref={fileInputRef} onChange={handleUploadCSV} accept=".csv" className="hidden" />
          </div>

          {/* Botão Visualizar Tudo */}
          <button
            onClick={() => console.log("Visualizar...")}
            className="flex-1 flex items-center justify-center gap-2 
            bg-slate-100 hover:bg-slate-200 
            text-slate-800 
            py-2.5 px-4 rounded-xl text-xs font-bold 
            border border-slate-200 transition-all shadow-sm"
          >
            <Eye size={14} /> Visualizar Tudo
          </button>
        </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-600 mb-2">Tipo do veículo</label>
            <input
              type="text"
              value={tipo}
              onChange={e => setTipo(e.target.value)}
              placeholder="Ex: SUV, Sedan..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
          </div>

          <div className="flex-1" />

          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-500">Cancelar</button>
            <button
              onClick={handleSave}
              disabled={loading}
              className="bg-slate-800 hover:bg-slate-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium disabled:opacity-50"
            >
              {loading ? 'Processando...' : 'Salvar'}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}