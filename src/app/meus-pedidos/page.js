import Link from 'next/link';

export default function MeusPedidos() {
  return (
    <div className="bg-light min-vh-100">
      {/* Cabeçalho simplificado com botão de voltar */}
      <header className="bg-warning text-dark py-3 px-4 shadow-sm d-flex align-items-center">
        <Link href="/home" className="btn btn-dark btn-sm me-3 fw-bold">
          &larr; Voltar
        </Link>
        <h5 className="m-0 fw-bold">Meus Pedidos Ativos</h5>
      </header>

      <main className="container py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>Data da Viagem</th>
                    <th>Destino</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Linha Falsa para visualização (depois virá do Node/SharePoint) */}
                  <tr>
                    <td className="fw-semibold">15/10/2026 08:00</td>
                    <td>Cidade Administrativa</td>
                    <td><span className="badge bg-success">Aprovado</span></td>
                    <td><button className="btn btn-sm btn-outline-secondary">Ver detalhes</button></td>
                  </tr>
                  <tr>
                    <td className="fw-semibold">20/10/2026 14:00</td>
                    <td>Uberlândia - MG</td>
                    <td><span className="badge bg-warning text-dark">Pendente</span></td>
                    <td><button className="btn btn-sm btn-outline-secondary">Ver detalhes</button></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}