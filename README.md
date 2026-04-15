# 🚖 Cockpit de Gestão de Frota - Frontend (UI)

Bem-vindo à Vitrine do **Cockpit de Gestão de Frota** da CET-MG (DETRAN-MG).
Esta é a interface de usuário construída em **Next.js (React)**, focada em entregar uma experiência "Fricção-Zero". O sistema conta com um assistente guiado (Wizard) para solicitações de viagens e um painel logístico responsivo.

## 🛠️ Pré-requisitos

Para rodar esta interface, você precisará de:
* [Node.js](https://nodejs.org/en/) (Recomendada a versão LTS - v20+)
* [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
* O **Backend do Cockpit** rodando em paralelo (seja localmente ou na nuvem) para que os dados possam ser salvos.

## 🚀 Passo a Passo para Rodar Localmente

### Passo 1: Abrir o projeto
1. Abra o VS Code.
2. Vá em `File > Open Folder...` (Arquivo > Abrir Pasta...) e selecione a pasta `cockpit-frontend`.
3. Abra o terminal integrado do VS Code (`Ctrl` + `"` ou `Terminal > New Terminal`).

### Passo 2: Instalar as Dependências
No terminal, rode o comando abaixo para que o Node baixe o Next.js, React e demais ferramentas:
\`\`\`bash
npm install
\`\`\`

### Passo 3: Apontamento da API (Se necessário)
Por padrão, durante o desenvolvimento local, as chamadas (como o `fetch` na tela de Nova Solicitação) apontam para a API no endereço:
`http://localhost:3001/api/pedidos`
*Se o seu backend estiver rodando em uma porta diferente ou na nuvem (ex: Render), lembre-se de atualizar os links nos arquivos `src/app/nova-solicitacao/page.js` e `src/app/logistica/page.js`.*

### Passo 4: Ligar a Vitrine
Para iniciar o servidor de desenvolvimento do Next.js, digite:
\`\`\`bash
npm run dev
\`\`\`

Após alguns segundos, o terminal avisará que o servidor está pronto. 
Abra o seu navegador de internet e acesse:
**[http://localhost:3000](http://localhost:3000)**

## 🎨 Arquitetura de UI/UX
* **Design System:** Baseado na identidade visual do Governo de Minas Gerais (Amarelo Trânsito `#FDB913`).
* **Responsividade:** Utiliza contêineres fluidos do Bootstrap/CSS para adaptação perfeita tanto em monitores ultrawide da logística quanto nos celulares das chefias.
