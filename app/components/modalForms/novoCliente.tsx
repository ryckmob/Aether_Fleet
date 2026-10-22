'use client';

import { useState, FormEvent } from 'react';

type NovoClienteProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export default function NovoCliente({ onSuccess, onCancel }: NovoClienteProps) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const [telefone, setTelefone] = useState('');
  const [foto, setFoto] = useState('');
  const [loading, setLoading] = useState(false);

  async function salvarCliente(e: FormEvent) {
    e.preventDefault();

    if (!nome || !cpf || !telefone) {
      alert('Preencha os campos obrigatórios: Nome, CPF e Telefone.');
      return;
    }

    setLoading(true);

    try {
      // Se você usou tags `json:"..."` no Go, use minusculas.
      // Caso NÃO tenha usado tags no Go, altere as chaves abaixo para iniciais maiúsculas (ex: Nome: nome).
      const payload = {
        nome: nome,
        cpf: cpf,
        rg: rg,
        telefone: telefone,
        foto: foto,
      };

      const response = await fetch('http://127.0.0.1:8000/cliente', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erro ao salvar cliente');
      }

      alert('Cliente salvo com sucesso!');
      
      // Limpa os campos
      setNome('');
      setCpf('');
      setRg('');
      setTelefone('');
      setFoto('');

      if (onSuccess) {
        onSuccess();
      }
    } catch (error: any) {
      alert(error.message || 'Erro ao conectar com o servidor');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={salvarCliente} className="flex flex-col gap-4">
      <div>
        <label className="text-sm font-medium text-slate-700">
          Nome do Cliente <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={nome}
          onChange={e => setNome(e.target.value)}
          placeholder="Digite o nome completo"
          required
          className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">
            CPF <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            placeholder="000.000.000-00"
            required
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-slate-700">
            RG
          </label>
          <input
            type="text"
            value={rg}
            onChange={e => setRg(e.target.value)}
            placeholder="Digite o RG"
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-slate-700">
            Telefone <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={telefone}
            onChange={e => setTelefone(e.target.value)}
            placeholder="(00) 00000-0000"
            required
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="hidden">
          <label className="text-sm font-medium text-slate-700">
            URL da Foto
          </label>
          <input
            type="text"
            value={foto}
            onChange={e => setFoto(e.target.value)}
            placeholder="https://..."
            className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="flex justify-end gap-2 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}