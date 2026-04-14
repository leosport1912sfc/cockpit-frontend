import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CockpitLogistica from './page';

// Mock the global fetch API to prevent actual network requests
global.fetch = jest.fn();

describe('CockpitLogistica Component', () => {
  beforeEach(() => {
    // Clear any previous mock usage before each test
    jest.clearAllMocks();
  });

  it('should render the loading state initially', () => {
    // Return a never-resolving promise to keep the component in the "loading" state
    fetch.mockImplementationOnce(() => new Promise(() => {}));

    render(<CockpitLogistica />);

    // Assert that the loading spinner/text is present
    expect(screen.getByText('Buscando dados no servidor...')).toBeInTheDocument();
  });

  it('should load and display a list of pedidos', async () => {
    const mockPedidos = [
      { id: 1, solicitante: 'João', destino: 'São Paulo - SP', status: 'Pendente' },
      { id: 2, solicitante: 'Maria', destino: 'Rio de Janeiro - RJ', status: 'Aprovado' },
    ];

    // Mock the successful GET response
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPedidos,
    });

    render(<CockpitLogistica />);

    // Wait for the loading text to be removed
    await waitFor(() => {
      expect(screen.queryByText('Buscando dados no servidor...')).not.toBeInTheDocument();
    });

    // Assert that our mocked items are rendered on the screen
    expect(screen.getByText('#1 - João')).toBeInTheDocument();
    expect(screen.getByText('#2 - Maria')).toBeInTheDocument();
  });

  it('should select a pedido, allocate a vehicle, and show a success toast', async () => {
    const mockPedidos = [
      { id: 1, solicitante: 'João Silva', destino: 'Belo Horizonte - MG', status: 'Aprovado' },
    ];

    // 1. Mock the initial GET fetch
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockPedidos,
    });

    render(<CockpitLogistica />);

    // Wait for the list to be rendered and find our button
    const pedidoButton = await screen.findByText('#1 - João Silva');

    // 2. Select the pedido by clicking it
    fireEvent.click(pedidoButton);

    // Assert that the details panel shows the right info
    expect(screen.getByText('Pedido #1')).toBeInTheDocument();
    expect(screen.getByText('Destino: Belo Horizonte - MG')).toBeInTheDocument();

    // 3. Mock the PATCH fetch for allocating the vehicle
    fetch.mockResolvedValueOnce({
      ok: true,
    });

    const alocarButton = screen.getByRole('button', { name: /alocar veículo/i });
    fireEvent.click(alocarButton);

    // Verify the correct API endpoint and method were used
    expect(fetch).toHaveBeenCalledWith(
      'https://cockpit-backend-mmd8.onrender.com/api/pedidos/1',
      expect.objectContaining({ method: 'PATCH' })
    );

    // 4. Wait for the success toast to appear
    await waitFor(() => {
      expect(screen.getByText(/veículo alocado com sucesso/i)).toBeInTheDocument();
    });
  });
});
