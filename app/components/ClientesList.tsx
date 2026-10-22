'use client';

type Cliente = {
  id: number;
  nome: string;
  cpf: string;
  rg: string;
  telefone: string;
  foto: string;
  criado_em: string;
};

type ClientsListProps = {
  clientes: Cliente[];
  loading: boolean;
};

export default function ClientsList({ clientes, loading }: ClientsListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center text-gray-500">
        Carregando clientes...
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center text-gray-500">
        Nenhum cliente cadastrado ainda
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden">Foto</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RG</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                #{cliente.id}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm hidden">
                {cliente.foto ? (
                  <img
                    src={cliente.foto}
                    alt={cliente.nome}
                    className="h-10 w-10 rounded-full object-cover border border-gray-200"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {cliente.nome ? cliente.nome.substring(0, 2).toUpperCase() : 'CL'}
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                {cliente.nome}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cliente.cpf || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cliente.rg || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {cliente.telefone || '-'}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {cliente.criado_em ? new Date(cliente.criado_em).toLocaleDateString('pt-BR') : '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}