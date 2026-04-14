"use client";

import { useState } from 'react';
import Link from 'next/link';

// Nosso "banco de dados" de tutoriais
const tutoriaisMock = [
  { id: 1, titulo: "Como Solicitar Veículo", descricao: "Guia passo a passo para criar um novo pedido.", icone: "📱" },
  { id: 2, titulo: "Aprovando Pedidos", descricao: "Instruções para chefias e gestores aprovarem no Teams.", icone: "✅" },
  { id: 3, titulo: "Visão Geral do Bookings", descricao: "Como verificar a disponibilidade e agendas.", icone: "📅" },
  { id: 4, titulo: "Regras de Uso da Frota", descricao: "Cartilha oficial de conduta do servidor do DETRAN-MG.", icone: "📖" },
];

export default function TutoriaisLinks() {
  // Estado para controlar o que o usuário digita na barra de pesquisa
  const [busca, setBusca] = useState('');

  // Filtro mágico do React: atualiza a lista instantaneamente enquanto o usuário digita
  const tutoriaisFiltrados = tutoriaisMock.filter(tutorial => 
    tutorial.titulo.toLowerCase().includes(busca.toLowerCase()) || 
    tutorial.descricao.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Cabeçalho */}
      <header className="bg-warning text-dark py-3 px-4 shadow-sm d-flex align-items-center mb-4">
        <Link href="/home" className="btn btn-dark btn-sm me-3 fw-bold">
          &larr; Voltar
        </Link>
        <h5 className="m-0 fw-bold">Central de Ajuda e Links Úteis</h5>
      </header>

      <main className="container">
        <div className="row g-4">
          
          {/* COLUNA ESQUERDA: Links Rápidos */}
          <div className="col-lg-4">
            <h5 className="fw-bold mb-3">Links Rápidos</h5>
            <div className="row g-3">
              <div className="col-6">
                <a href="https://www.sei.mg.gov.br" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                  <div className="card border-0 shadow-sm text-center py-4 bg-white" style={{ transition: '0.2s' }}>
                    <h2 className="mb-2">📄</h2>
                    <span className="fw-bold text-dark small">SEI</span>
                  </div>
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="text-decoration-none">
                  <div className="card border-0 shadow-sm text-center py-4 bg-white" style={{ transition: '0.2s' }}>
                    <h2 className="mb-2">👤</h2>
                    <span className="fw-bold text-dark small">Portal do Servidor</span>
                  </div>
                </a>
              </div>
              <div className="col-6">
                <a href="#" className="text-decoration-none">
                  <div className="card border-0 shadow-sm text-center py-4 bg-white" style={{ transition: '0.2s' }}>
                    <h2 className="mb-2">🌐</h2>
                    <span className="fw-bold text-dark small">Intranet CET</span>
                  </div>
                </a>
              </div>
              <div className="col-6">
                <a href="mailto:suporte.frota@transito.mg.gov.br" className="text-decoration-none">
                  <div className="card border-0 shadow-sm text-center py-4 bg-dark text-warning">
                    <h2 className="mb-2">🎧</h2>
                    <span className="fw-bold small">Suporte Técnico</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* COLUNA DIREITA: Tutoriais e Manuais */}
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4">
                <h5 className="fw-bold mb-3">Tutoriais e Manuais</h5>
                
                {/* Barra de Pesquisa */}
                <div className="mb-4">
                  <input 
                    type="text" 
                    className="form-control form-control-lg bg-light border-0" 
                    placeholder="🔍 Buscar tutoriais..." 
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                  />
                </div>

                {/* Lista de Tutoriais (A nossa "Galeria") */}
                <div className="list-group list-group-flush">
                  {tutoriaisFiltrados.length > 0 ? (
                    tutoriaisFiltrados.map((tutorial) => (
                      <div key={tutorial.id} className="list-group-item border-0 px-0 py-3 d-flex align-items-center border-bottom">
                        <div className="bg-dark text-white rounded p-3 me-3 d-flex justify-content-center align-items-center fs-3" style={{ width: '60px', height: '60px' }}>
                          {tutorial.icone}
                        </div>
                        <div className="flex-grow-1">
                          <h6 className="fw-bold mb-1">{tutorial.titulo}</h6>
                          <p className="text-muted small mb-0">{tutorial.descricao}</p>
                        </div>
                        <button className="btn btn-sm text-dark fw-bold" style={{ backgroundColor: '#FDB913' }}>
                          Ler Mais
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5 text-muted">
                      <h5>Nenhum tutorial encontrado para "{busca}"</h5>
                      <p>Tente pesquisar com outras palavras.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}