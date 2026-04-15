'use client';
import { useRouter } from 'next/navigation';

export default function NovaSolicitacaoHibrida() {
  const router = useRouter();

  // ATENÇÃO: Coloque aqui o link de COMPARTILHAMENTO do seu Microsoft Forms
  // Dica: Não use o link da barra de endereços (DesignPage). Use o botão "Coletar Respostas" no Forms.
  const linkMicrosoftForms = "https://forms.office.com/Pages/ResponsePage.aspx?id=fK7T5Tib3kigh_ZzSih1dIRexYvMcJdHq8ndPYnnCVNUN0c0SlMyQzFNUks4TkVQVUtUSFhEMjhaUS4u"; 

  return (
    <main className="bg-light min-vh-100 pb-5">
      {/* CABEÇALHO PADRONIZADO (Harmonia com o Dashboard) */}
      <header className="bg-warning text-dark py-3 px-4 d-flex align-items-center shadow-sm mb-4">
        <button 
          onClick={() => router.back()} 
          className="btn btn-sm btn-outline-dark fw-bold me-3"
        >
          ← Voltar
        </button>
        <h4 className="m-0 fw-bold">trânsito.mg | Nova Solicitação</h4>
      </header>

      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* MENSAGEM DE CONTEXTO */}
        <div className="alert border-warning bg-warning bg-opacity-10 text-dark mb-4 shadow-sm rounded-4" role="alert">
          <h5 className="fw-bold mb-1">🚗 Sistema Oficial de Reservas</h5>
          <p className="mb-0 small">
            Preencha o formulário abaixo para registrar sua solicitação. Após o envio, sua chefia imediata será notificada via Microsoft Teams para aprovação.
          </p>
        </div>

        {/* CONTÊINER DO IFRAME (O "Portal" para a Microsoft) */}
        <div className="card border-0 shadow-sm rounded-4 overflow-hidden" style={{ height: '800px', backgroundColor: '#fff' }}>
          <iframe 
            src={linkMicrosoftForms} 
            width="100%" 
            height="100%" 
            style={{ border: 'none' }}
            allowFullScreen
            title="Formulário de Solicitação de Veículos do DETRAN-MG"
          >
            Carregando formulário oficial...
          </iframe>
        </div>

      </div>
    </main>
  );
}