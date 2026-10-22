'use client';

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

type VehiclesListProps = {
  veiculos: Veiculo[];
  loading: boolean;
};

export default function VehiclesList({ veiculos, loading }: VehiclesListProps) {
  
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center text-gray-500">
        Carregando veículos...
      </div>
    );
  }

  if (veiculos.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden p-8 text-center text-gray-500">
        Nenhum veículo cadastrado ainda
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Marca</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modelo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Placa</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ano</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cor</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Diária</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Criado em</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {veiculos.map((veiculo) => (
            <tr key={veiculo.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.marca_label}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.modelo_label}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.tipo_label}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.placa}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.ano}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{veiculo.cor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                R$ {(veiculo.valor_diaria ?? 0).toFixed(2)}
              </td>
              <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${
                veiculo.status === 'disponivel' ? 'text-green-600' :
                veiculo.status === 'alugado' ? 'text-yellow-600' :
                'text-red-600'
              }`}>
                {veiculo.status.charAt(0).toUpperCase() + veiculo.status.slice(1)}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(veiculo.criado_em).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}