<p align="center">
<img src="https://raw.githubusercontent.com/mrpunkdasilva/attendance-hero/main/client/public/logos/main/AttendaceHero.svg" width="500px" height="180px" />
</p>

```       _   _                 _                      _    _                
     /\  | | | |               | |                    | |  | |               
    /  \ | |_| |_ ___ _ __   __| | __ _ _ __   ___ ___| |__| | ___ _ __ ___  
   / /\ \| __| __/ _ \ '_ \ / _` |/ _` | '_ \ / __/ _ \  __  |/ _ \ '__/ _ \ 
  / ____ \ |_| |_  __/ | | | (_| | (_| | | | | (__  __/ |  | |  __/ | | (_) |
 /_/    \_\__|\__\___|_| |_|\__,_|\__,_|_| |_|\___\___|_|  |_|\___|_|  \___/ 
```

Attendance Hero é um ecossistema digital com estética cyberpunk projetado para que estudantes tenham controle total sobre sua vida acadêmica. Com uma interface inspirada em interfaces de comando e games, ele transforma o acompanhamento de frequência em uma experiência visual e intuitiva.

---

## Tecnologias Utilizadas

- **Frontend**: React.js com Vite
- **Estilização**: SCSS (Sass) e Material UI (MUI)
- **Animações**: Framer Motion
- **Banco de Dados & Auth**: Firebase (Firestore & Google Auth)
- **Gráficos**: Recharts
- **Componentes**: Lucide React

## Recursos Atuais

- **Autenticação Segura**: Login simplificado e rápido utilizando exclusivamente Google Accounts.
- **Dashboard de Comando**: Visualização 3D do status global do aluno, incluindo Rank de classe (S a F) baseado na assiduidade.
- **Seletor de Ciclos**: Navegação focada que permite visualizar um semestre por vez, mantendo a interface limpa e organizada.
- **Controle de Faltas**: Registro de presença em tempo real com indicadores de risco (Baixo, Médio, Alto e WF).
- **Central de Análise (Stats)**: Gráficos dinâmicos que mostram a distribuição de faltas por disciplina e a margem de segurança global do semestre.
- **Interface Responsiva**: Design adaptável com Sidebar retrátil, otimizado para desktop e dispositivos móveis.

## Como Configurar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/mrpunkdasilva/attendance-hero.git
   ```
2. Instale as dependências:
   ```bash
   cd client
   npm install
   ```
3. Configure as variáveis de ambiente:
   Crie um arquivo `.env` na pasta `client` com suas credenciais do Firebase:
   ```env
   VITE_FIREBASE_API_KEY=sua_key
   VITE_FIREBASE_AUTH_DOMAIN=seu_dominio
   VITE_FIREBASE_PROJECT_ID=seu_id
   VITE_FIREBASE_STORAGE_BUCKET=seu_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
   VITE_FIREBASE_APP_ID=seu_app_id
   ```
4. Inicie o ambiente de desenvolvimento:
   ```bash
   npm run dev
   ```

## Estrutura de Diretórios

- `/src/components`: Componentes modulares e reutilizáveis (Header, Sidebar, SemesterTabs, etc).
- `/src/pages`: Páginas principais da aplicação (Login, Home, Stats).
- `/src/services`: Integração com Firebase e serviços de autenticação.
- `/src/config`: Configurações globais e Feature Flags.
- `/src/assets`: Fontes personalizadas (Comfortaa, Lexend) e ativos visuais.

## Licença

Este projeto é de uso pessoal e privado de [mr punk da silva](https://github.com/mrpunkdasilva).
