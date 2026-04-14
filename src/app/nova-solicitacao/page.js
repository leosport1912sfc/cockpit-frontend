"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // O nosso "motorista" de rotas

export default function NovaSolicitacao() {
  const router = useRouter();
  const [passo, setPasso] = useState(1);
  const [enviando, setEnviando] = useState(false);

  // O "Coração" do formulário: variáveis para guardar o que o usuário digita
  const [solicitante, setSolicitante] = useState("");
  const [destino, setDestino] = useState("");
  const [dataPartida, setDataPartida] = useState("");

  const proximoPasso = () => setPasso(passo + 1);
  const passoAnterior = () => setPasso(passo - 1);

  // O nosso "Pombo Correio": Função que leva os dados para o Node.js
  const finalizarPedido = async () => {
    setEnviando(true);

    try {
      const resposta = await fetch('https://cockpit-backend-mmd8.onrender.com/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Se o usuário deixar em branco, mandamos um texto padrão para não quebrar nada
          solicitante: solicitante || "Servidor do DETRAN", 
          destino: destino || "Destino não informado",
          dataPartida: dataPartida || "Data pendente"
        }),
      });

      if (resposta.ok) {
        // Sucesso! Vamos teletransportar o usuário para a Logística para ver a mágica!
        router.push('/logistica');
      } else {
        alert("Ops! O nosso cofre engasgou ao tentar salvar.");
        setEnviando(false);
      }
    } catch (erro) {
      console.error("Erro na comunicação:", erro);
      alert("O servidor backend parece estar desligado.");
      setEnviando(false);
    }
  };

  return (
    <div className="bg-light min-vh-100 pb-5">
      <header className="bg-warning text-dark py-3 px-4 shadow-sm d-flex align-items-center mb-4">
        <Link href="/home" className="btn btn-dark btn-sm me-3 fw-bold">
          &larr; Cancelar
        </Link>
        <h5 className="m-0 fw-bold">Nova Solicitação de Veículo</h5>
      </header>

      <main className="container" style={{ maxWidth: '600px' }}>
        <div className="progress mb-4" style={{ height: '10px' }}>
          <div 
            className="progress-bar bg-dark" 
            style={{ width: `${(passo / 3) * 100}%`, transition: '0.5s' }} 
          ></div>
        </div>

        <div className="card border-0 shadow-sm rounded-4">
          <div className="card-body p-4">
            
            {passo === 1 && (
              <div className="fade-in">
                <h5 className="fw-bold mb-4">Passo 1: Dados da Viagem</h5>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Nome do Solicitante</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Seu nome completo" 
                    value={solicitante}
                    onChange={(e) => setSolicitante(e.target.value)} // Salvando cada letra digitada!
                  />
                </div>
                
                <div className="mb-3">
                  <label className="form-label fw-semibold">Destino</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Ex: Uberlândia - MG" 
                    value={destino}
                    onChange={(e) => setDestino(e.target.value)}
                  />
                </div>
                
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Data e Hora de Partida</label>
                    <input 
                      type="datetime-local" 
                      className="form-control" 
                      value={dataPartida}
                      onChange={(e) => setDataPartida(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Data e Hora de Retorno</label>
                    <input type="datetime-local" className="form-control" />
                  </div>
                </div>
              </div>
            )}

            {passo === 2 && (
              <div className="fade-in">
                <h5 className="fw-bold mb-4">Passo 2: Detalhes de Transporte</h5>
                <div className="form-check form-switch mb-4 fs-5">
                  <input className="form-check-input" type="checkbox" id="precisaMotorista" defaultChecked />
                  <label className="form-check-label fw-semibold" htmlFor="precisaMotorista">
                    Necessita de Motorista?
                  </label>
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Passageiro Principal</label>
                  <input type="text" className="form-control" placeholder="Nome completo" />
                </div>
              </div>
            )}

            {passo === 3 && (
              <div className="fade-in">
                <h5 className="fw-bold mb-4">Passo 3: Justificativa e Envio</h5>
                <div className="alert alert-warning text-dark border-0" role="alert">
                  <strong>Atenção:</strong> O uso da frota oficial destina-se estritamente ao interesse público.
                </div>
                <div className="mb-4">
                  <label className="form-label fw-semibold">Justificativa Institucional</label>
                  <textarea className="form-control" rows="4" placeholder="Descreva o motivo..."></textarea>
                </div>
              </div>
            )}

            <div className="d-flex justify-content-between mt-4 pt-3 border-top">
              <button 
                className={`btn btn-light fw-bold ${passo === 1 ? 'invisible' : ''}`} 
                onClick={passoAnterior}
                disabled={enviando}
              >
                Voltar
              </button>
              
              {passo < 3 ? (
                <button className="btn fw-bold px-4 text-dark" style={{ backgroundColor: '#FDB913' }} onClick={proximoPasso}>
                  Próximo
                </button>
              ) : (
                <button 
                  className="btn btn-success fw-bold px-4" 
                  onClick={finalizarPedido}
                  disabled={enviando}
                >
                  {enviando ? 'Salvando no Cofre...' : 'Enviar Solicitação'}
                </button>
              )}
            </div>

          </div>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .fade-in { animation: fadeIn 0.3s ease-in-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
      `}} />
    </div>
  );
}