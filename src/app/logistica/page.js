"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CockpitLogistica() {

  // Nossos novos estados para guardar os dados reais da API
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [pedidos, setPedidos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // O controlador do nosso Toast charmoso
  const [toast, setToast] = useState({ mostrar: false, mensagem: '' });

  // A função que manda o carro pra rua!
  const alocarVeiculo = async () => {
    if (!pedidoSelecionado) return;

    try {
      const resposta = await fetch(`http://localhost:3001/api/pedidos/${pedidoSelecionado.id}`, {
        method: 'PATCH',
      });

      if (resposta.ok) {
        const pedidosAtualizados = pedidos.map(p =>
          p.id === pedidoSelecionado.id ? { ...p, status: 'Agendado' } : p
        );

        setPedidos(pedidosAtualizados);
        setPedidoSelecionado(null);

        // A MÁGICA ACONTECE AQUI: Ligamos o Toast em vez do Alert!
        setToast({ mostrar: true, mensagem: "Veículo alocado com sucesso! O motorista foi notificado. 🚗💨" });

        // Escondemos o Toast automaticamente depois de 4 segundos
        setTimeout(() => {
          setToast({ mostrar: false, mensagem: '' });
        }, 4000);

      }
    } catch (erro) {
      console.error("Erro ao alocar:", erro);
      setToast({ mostrar: true, mensagem: "Ops! Falha na comunicação com o servidor. ❌" });
      setTimeout(() => setToast({ mostrar: false, mensagem: '' }), 4000);
    }
  };

  // A magia acontece aqui: o React "bate na porta" da nossa API assim que a tela abre
  useEffect(() => {
    fetch('http://localhost:3001/api/pedidos')
      .then((resposta) => resposta.json())
      .then((dadosDaApi) => {
        setPedidos(dadosDaApi); // Guarda os dados no estado
        setCarregando(false);   // Desliga o aviso de carregando
      })
      .catch((erro) => {
        console.error("Erro de conexão com o motor Node:", erro);
        setCarregando(false);
      });
  }, []);

  return (
    <div className="bg-light min-vh-100 pb-5">
      {/* Cabeçalho */}
      <header className="bg-dark text-white py-3 px-4 shadow d-flex justify-content-between align-items-center mb-4">
        <div className="d-flex align-items-center">
          <Link href="/home" className="btn btn-outline-light btn-sm me-3 fw-bold">
            &larr; Voltar
          </Link>
          <h5 className="m-0 fw-bold text-warning">Cockpit de Gestão de Frota</h5>
        </div>
        <span className="badge bg-warning text-dark fs-6">Perfil: Logística</span>
      </header>

      <main className="container-fluid px-4">
        {/* Painel de Indicadores Ocultado para focar no aprendizado (Você pode recolocá-lo aqui depois) */}

        <div className="row g-4">
          {/* LADO ESQUERDO: Fila de Pedidos */}
          <div className="col-lg-5">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-header bg-white border-0 pt-4 pb-0">
                <h5 className="fw-bold">Fila de Despacho (Ao Vivo)</h5>
              </div>
              <div className="card-body p-0">

                {/* Se estiver carregando, mostra uma mensagem elegante */}
                {carregando ? (
                  <div className="text-center p-5 text-muted">
                    <div className="spinner-border text-warning mb-3" role="status"></div>
                    <p>Buscando dados no servidor...</p>
                  </div>
                ) : (
                  <div className="list-group list-group-flush mt-2">
                    {pedidos.map((pedido) => (
                      <button
                        key={pedido.id}
                        type="button"
                        className={`list-group-item list-group-item-action p-3 border-bottom ${pedidoSelecionado?.id === pedido.id ? 'bg-warning bg-opacity-10 border-start border-warning border-4' : ''}`}
                        onClick={() => setPedidoSelecionado(pedido)}
                      >
                        <div className="d-flex w-100 justify-content-between mb-1">
                          <h6 className="mb-0 fw-bold">#{pedido.id} - {pedido.solicitante}</h6>
                          <span className={`badge ${pedido.status === 'Aprovado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                            {pedido.status}
                          </span>
                        </div>
                        <small className="text-muted d-block mb-1">📍 {pedido.destino}</small>
                      </button>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* LADO DIREITO: Detalhes do Pedido (Mesmo código de antes, mas enxuto) */}
          <div className="col-lg-7">
            <div className="card border-0 shadow-sm rounded-4 h-100">
              <div className="card-body p-4 d-flex flex-column">
                {!pedidoSelecionado && (
                  <div className="text-center my-auto text-muted">
                    <h1 className="display-1 mb-3">📡</h1>
                    <h5>Aguardando seleção</h5>
                  </div>
                )}

                {pedidoSelecionado && (
                  <div className="fade-in">
                    <h4 className="fw-bold">Pedido #{pedidoSelecionado.id}</h4>
                    <p className="text-muted mb-4">{pedidoSelecionado.solicitante}</p>

                    <div className="bg-light p-3 rounded mb-4">
                      <p className="mb-0 fw-bold">Destino: {pedidoSelecionado.destino}</p>
                    </div>

                    <button
                      className="btn btn-dark w-100 py-2 fw-bold shadow-sm"
                      onClick={alocarVeiculo}
                    >
                      Alocar Veículo
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
      </main>

      {/* --- O NOSSO TOAST CHARMOSO DO BOOTSTRAP --- */}
      {toast.mostrar && (
        <div className="toast-container position-fixed bottom-0 end-0 p-4" style={{ zIndex: 1055 }}>
          <div className="toast show align-items-center text-bg-success border-0 shadow-lg fade-in" role="alert">
            <div className="d-flex">
              <div className="toast-body fw-bold fs-6">
                {toast.mensagem}
              </div>
              <button 
                type="button" 
                className="btn-close btn-close-white me-2 m-auto" 
                onClick={() => setToast({ mostrar: false, mensagem: '' })}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Nosso CSS charmoso continua aqui */}
      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.4s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}