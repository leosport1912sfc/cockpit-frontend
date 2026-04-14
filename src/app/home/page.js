import Link from 'next/link';

export default function HomeDashboard() {
    return (
        <div className="bg-light min-vh-100">
            {/* Cabeçalho Amarelo Corporativo */}
            <header className="bg-warning text-dark py-3 px-4 d-flex justify-content-between align-items-center shadow-sm">
                <h4 className="m-0 fw-bold">trânsito.mg</h4>

                <div className="d-flex align-items-center">
                    {/* Oculta o nome em telas de celular muito pequenas para não quebrar o layout (d-none d-md-inline) */}
                    <span className="me-3 fw-semibold d-none d-md-inline">Olá, Leonardo!</span>

                    {/* Espaço temporário para a foto de perfil */}
                    <div className="bg-dark rounded-circle text-white d-flex justify-content-center align-items-center me-3" style={{ width: '40px', height: '40px' }}>
                        LI
                    </div>

                    {/* Botão de Sair / Logout */}
                    <Link href="/" className="btn btn-sm btn-outline-dark fw-bold" style={{ transition: '0.2s' }}>
                        Sair
                    </Link>
                </div>
            </header>

            {/* Conteúdo Principal (Grid de Botões) */}
            <main className="container py-5">
                <h2 className="mb-4 fw-bold text-secondary">Painel de Controle</h2>

                <div className="row g-4">

                    {/* Botão Nova Solicitação */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link href="/nova-solicitacao" className="text-decoration-none">
                            <div className="card h-100 border-0 shadow-sm text-center py-4" style={{ cursor: 'pointer', transition: '0.3s' }}>
                                <div className="card-body">
                                    <h1 className="display-4 mb-3">🚗</h1>
                                    <h5 className="fw-bold text-dark mb-0">Nova Solicitação</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Botão Meus Pedidos */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link href="/meus-pedidos" className="text-decoration-none">
                            <div className="card h-100 border-0 shadow-sm text-center py-4 bg-warning bg-opacity-25" style={{ cursor: 'pointer' }}>
                                <div className="card-body">
                                    <h1 className="display-4 mb-3">📋</h1>
                                    <h5 className="fw-bold text-dark mb-0">Meus Pedidos</h5>
                                    <span className="badge bg-warning text-dark mt-2">3 Ativos</span>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Botão Cockpit Logístico */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link href="/logistica" className="text-decoration-none">
                            <div className="card h-100 border-0 shadow-sm text-center py-4 bg-dark text-warning" style={{ cursor: 'pointer', transition: '0.3s' }}>
                                <div className="card-body">
                                    <h1 className="display-4 mb-3">🛠️</h1>
                                    <h5 className="fw-bold mb-0">Cockpit Logístico</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                    {/* Botão Tutoriais */}
                    <div className="col-12 col-md-6 col-lg-3">
                        <Link href="/tutoriais" className="text-decoration-none">
                            <div className="card h-100 border-0 shadow-sm text-center py-4" style={{ cursor: 'pointer', backgroundColor: '#FDB913', transition: '0.3s' }}>
                                <div className="card-body">
                                    <h1 className="display-4 mb-3 text-dark">📖</h1>
                                    <h5 className="fw-bold text-dark mb-0">Tutoriais</h5>
                                </div>
                            </div>
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}