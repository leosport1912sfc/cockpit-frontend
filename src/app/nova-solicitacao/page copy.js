'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NovaSolicitacao() {
  const router = useRouter();
  const [showToast, setShowToast] = useState(false);

  const [formData, setFormData] = useState({
    nomeSolicitante: '',
    emailSolicitante: '',
    setorSolicitante: '',
    tipoServico: '',
    paraQuem: 'Eu mesmo',
    telefoneSolicitante: '',
    nomePassageiro: '',
    telefonePassageiro: '',
    quantidadePessoas: 1,
    passageirosAdicionais: '',
    dataViagem: '',
    horarioPartida: '',
    enderecoOrigem: 'Cidade Administrativa',
    necessitaRetorno: 'Não',
    motoristaAguarda: 'Não',
    horarioTermino: '',
    horarioRetorno: '',
    nomeDestino: '',
    enderecoDestino: '',
    municipio: '',
    itinerario: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const finalizarPedido = async (e) => {
    e.preventDefault();

    try {
      const resposta = await fetch('http://localhost:3001/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (resposta.ok) {
        setShowToast(true);
        // Aguarda 2.5 segundos para o usuário ler o Toast antes de ir para o Painel
        setTimeout(() => {
          router.push('/dashboard'); // Ajuste aqui para o caminho da sua página de painel!
        }, 2500);
      }
    } catch (erro) {
      console.error(erro);
      alert('Ih, deu erro na conexão com o servidor!');
    }
  };

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

      {/* TOAST DE SUCESSO DO BOOTSTRAP */}
      <div className="toast-container position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div className={`toast align-items-center text-white bg-success border-0 ${showToast ? 'show' : 'hide'}`} role="alert">
          <div className="d-flex">
            <div className="toast-body fw-bold">
              ✅ Viagem solicitada com sucesso! Atualizando painel...
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px' }}>
        <form onSubmit={finalizarPedido} className="row g-4">

          {/* SEÇÃO 1: SOLICITANTE */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold text-secondary border-bottom pb-2 mb-3">1. Dados do Solicitante</h5>
              <div className="row g-3">
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Nome Completo</label>
                  <input type="text" name="nomeSolicitante" className="form-control" value={formData.nomeSolicitante} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">E-mail Institucional</label>
                  <input type="email" name="emailSolicitante" className="form-control" value={formData.emailSolicitante} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Setor que trabalha</label>
                  <input type="text" name="setorSolicitante" className="form-control" value={formData.setorSolicitante} onChange={handleChange} required />
                </div>

                {/* INSERIDO: Lógica de Identificação e Telefone */}
                <div className="col-12 mt-3">
                  <p className="small fw-bold text-muted mb-2">Pedido para você ou outra pessoa?</p>
                  <div className="btn-group w-100 mb-3" role="group">
                    <input type="radio" className="btn-check" name="paraQuem" id="eu" value="Eu mesmo" checked={formData.paraQuem === 'Eu mesmo'} onChange={handleChange} />
                    <label className="btn btn-outline-warning text-dark fw-semibold" htmlFor="eu">Eu mesmo</label>
                    <input type="radio" className="btn-check" name="paraQuem" id="outro" value="Outra pessoa" checked={formData.paraQuem === 'Outra pessoa'} onChange={handleChange} />
                    <label className="btn btn-outline-warning text-dark fw-semibold" htmlFor="outro">Outra pessoa</label>
                  </div>
                </div>

                {formData.paraQuem === 'Eu mesmo' ? (
                  <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">Telefone do Solicitante (DDD + Número)</label>
                    <input type="text" name="telefoneSolicitante" className="form-control" placeholder="Ex: 31999998888" value={formData.telefoneSolicitante} onChange={handleChange} required />
                  </div>
                ) : (
                  <div className="col-12 p-3 bg-light rounded-3 border border-warning">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Nome do Passageiro Principal</label>
                        <input type="text" name="nomePassageiro" className="form-control" value={formData.nomePassageiro} onChange={handleChange} required />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Telefone do Passageiro</label>
                        <input type="text" name="telefonePassageiro" className="form-control" value={formData.telefonePassageiro} onChange={handleChange} required />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO 2: SERVIÇO E PASSAGEIROS */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold text-secondary border-bottom pb-2 mb-3">2. Dados do Serviço e Passageiros</h5>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label small fw-bold text-muted">Tipo de Serviço</label>
                  <select name="tipoServico" className="form-select" value={formData.tipoServico} onChange={handleChange} required>
                    <option value="">Selecione...</option>
                    <option value="Transporte - Veículo Comum (4 lugares)">Veículo Comum (4 lugares)</option>
                    <option value="Transporte - Van/Minibus (7+ lugares)">Van/Minibus (7+ lugares)</option>
                    <option value="Transporte - Carga/Caminhonete">Carga/Caminhonete</option>
                  </select>
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">Quantas pessoas vão?</label>
                  <input type="number" name="quantidadePessoas" className="form-control" value={formData.quantidadePessoas} onChange={handleChange} min="1" required />
                </div>
                {/* INSERIDO: Passageiros Adicionais */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Passageiros Adicionais (Nome e E-mail)</label>
                  <textarea name="passageirosAdicionais" className="form-control" rows="2" value={formData.passageirosAdicionais} onChange={handleChange} placeholder="Liste quem mais irá na viagem..."></textarea>
                </div>
              </div>
            </div>
          </div>

          {/* SEÇÃO 3: LOGÍSTICA */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold text-secondary border-bottom pb-2 mb-3">3. Informações da Viagem</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Data da Viagem</label>
                  <input type="date" name="dataViagem" className="form-control" value={formData.dataViagem} onChange={handleChange} required />
                </div>
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-muted">Horário da Partida</label>
                  <input type="time" name="horarioPartida" className="form-control" value={formData.horarioPartida} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Endereço de Origem</label>
                  <input type="text" name="enderecoOrigem" className="form-control" value={formData.enderecoOrigem} onChange={handleChange} required />
                </div>

                <div className="col-12 mt-3">
                  <div className="form-check form-switch">
                    <input className="form-check-input" type="checkbox" id="retSwitch" checked={formData.necessitaRetorno === 'Sim'} onChange={(e) => setFormData({ ...formData, necessitaRetorno: e.target.checked ? 'Sim' : 'Não' })} />
                    <label className="form-check-label fw-bold text-muted" htmlFor="retSwitch">Necessita Retorno?</label>
                  </div>
                </div>

                {formData.necessitaRetorno === 'Sim' && (
                  <div className="col-12 p-3 bg-warning bg-opacity-10 rounded-3">
                    {/* INSERIDO: Lógica do Motorista Aguardar */}
                    <div className="mb-3">
                      <p className="small fw-bold text-muted mb-2">O motorista vai aguardar os passageiros?</p>
                      <div className="btn-group" role="group">
                        <input type="radio" className="btn-check" name="motoristaAguarda" id="aguardaSim" value="Sim" checked={formData.motoristaAguarda === 'Sim'} onChange={handleChange} />
                        <label className="btn btn-sm btn-outline-dark fw-semibold" htmlFor="aguardaSim">Sim</label>
                        <input type="radio" className="btn-check" name="motoristaAguarda" id="aguardaNao" value="Não" checked={formData.motoristaAguarda === 'Não'} onChange={handleChange} />
                        <label className="btn btn-sm btn-outline-dark fw-semibold" htmlFor="aguardaNao">Não</label>
                      </div>
                    </div>

                    <div className="row g-3">
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Término Previsto do Evento</label>
                        <input type="time" name="horarioTermino" className="form-control" value={formData.horarioTermino} onChange={handleChange} />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label small fw-bold text-muted">Horário de Retorno</label>
                        <input type="time" name="horarioRetorno" className="form-control" value={formData.horarioRetorno} onChange={handleChange} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SEÇÃO 4: DESTINO E ENVIO */}
          <div className="col-12">
            <div className="card border-0 shadow-sm rounded-4 p-4">
              <h5 className="fw-bold text-secondary border-bottom pb-2 mb-3">4. Destino</h5>
              <div className="row g-3">
                <div className="col-md-8">
                  <label className="form-label small fw-bold text-muted">Nome do Local</label>
                  <input type="text" name="nomeDestino" className="form-control" value={formData.nomeDestino} onChange={handleChange} placeholder="Ex: BDMG" required />
                </div>
                <div className="col-md-4">
                  <label className="form-label small fw-bold text-muted">Município</label>
                  <input type="text" name="municipio" className="form-control" value={formData.municipio} onChange={handleChange} required />
                </div>
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Endereço do Destino</label>
                  <input type="text" name="enderecoDestino" className="form-control" value={formData.enderecoDestino} onChange={handleChange} required />
                </div>
                {/* INSERIDO: Itinerário/Obs */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-muted">Itinerário (Viagens com paradas / Observações)</label>
                  <textarea name="itinerario" className="form-control" rows="3" value={formData.itinerario} onChange={handleChange} placeholder="Insira o roteiro ou notas complementares..."></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 mb-5">
            <button type="submit" className="btn btn-warning w-100 py-3 fw-bold shadow-sm" style={{ transition: '0.3s' }}>
              SUBMETER SOLICITAÇÃO
            </button>
          </div>

        </form>
      </div>
    </main>
  );
}