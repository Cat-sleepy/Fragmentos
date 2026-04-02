# Fragmentos

---

## Sobre o Projecto

Vivemos numa sociedade que não dorme. Jonathan Crary, em *24/7: Late Capitalism and the Ends of Sleep*, descreve com precisão cirúrgica o colapso das fronteiras entre o trabalho e o descanso, entre o público e o privado, entre o humano e a máquina. O capitalismo tardio colonizou o tempo, transformando cada hora, cada momento de vigília, num recurso a explorar. O sono — esse acto radical e inútil — tornou-se o último reduto de resistência.

Byung-Chul Han, por sua vez, em *A Sociedade do Cansaço*, diagnostica a condição do sujeito contemporâneo: não o oprimido pelo outro, mas o sujeito que se oprime a si mesmo. A sociedade do desempenho substituiu a sociedade da disciplina. Já não há um Outro que proíbe — há um Eu que se exige, que se optimiza, que colapsa em silêncio. O cansaço não é fraqueza. É a consequência lógica de um sistema que transforma a liberdade em coerção.

**Fragmentos** nasce desta intersecção. É uma plataforma de arquivo colectivo e involuntário da nossa condição. Os utilizadores são convidados a depositar fragmentos da sua exaustão — textos, imagens, vídeos, áudios — aquilo que os deixa cansados, tristes, ansiosos, deprimidos. Não existe julgamento, não existe curadoria, não existe algoritmo de relevância. Existe apenas o depósito honesto de uma experiência vivida.

Esses fragmentos são depois devolvidos ao público de forma aleatória, sem hierarquia, sem contexto, sem autoria visível. O que emerge dessa aleatoriedade não é caos — é um retrato. Um retrato colectivo da nossa sociedade, das suas fracturas, das suas "doenças neurais", como Han as denomina. A aplicação não pretende curar. Pretende tornar visível aquilo que insistimos em tornar invisível: o colapso silencioso de quem tenta, todos os dias, ser suficiente.

**Fragmentos** é, em última instância, um arquivo do cansaço. E os arquivos, ao contrário das pessoas, não se cansam.

---

## Stack Tecnológica

| Camada | Tecnologia |
|---|---|
| Runtime | Node.js 24+ |
| Framework | Express |
| Base de Dados | Supabase (PostgreSQL) |
| Autenticação | Supabase Auth (JWT) |
| Storage | Supabase Storage |
| Linguagem | TypeScript |
| Testes | Jest + Supertest |
| Deploy | Render.com |

---

## Endpoints

### Autenticação
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/auth/register` | Registar novo utilizador | ❌ |
| POST | `/auth/login` | Iniciar sessão | ❌ |

### Fragmentos
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/fragments` | Listar 20 fragmentos aleatórios | ❌ |
| GET | `/fragments/mine` | Listar os meus fragmentos | ✅ |
| GET | `/fragments/stats` | Estatísticas gerais | ❌ |
| GET | `/fragments/:id` | Detalhe de um fragmento | ❌ |
| PUT | `/fragments/:id` | Editar fragmento (só o dono) | ✅ |
| DELETE | `/fragments/:id` | Eliminar fragmento (só o dono) | ✅ |

### Upload
| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/images` | Upload de ficheiro (imagem, vídeo, áudio, texto) | ✅ |

### Sistema
| Método | Rota | Descrição |
|---|---|---|
| GET | `/health` | Verificar estado do servidor |

---

## Como Correr Localmente

### Pré-requisitos
- Node.js 24+
- npm
- Conta no Supabase

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/Cat-sleepy/Fragmentos.git
cd Fragmentos/fragmentos/backend

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.example .env
# Editar o ficheiro .env com os teus valores

# Arrancar o servidor em modo de desenvolvimento
npm run dev
```

O servidor fica disponível em `http://localhost:3000`.

---

## Variáveis de Ambiente

Cria um ficheiro `.env` na raiz do backend com as seguintes variáveis:

```env
PORT=3000
SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
```

> ⚠️ Nunca partilhes os valores reais. Usa sempre o `.env.example` como referência.

---

## Testes

```bash
npm test
```

Os testes cobrem:
- `GET /health` → 200
- `POST /auth/login` sem body → 400
- `GET /fragments/mine` sem token → 401

---

## URL em Produção

🌐 [https://fragmentos-backend.onrender.com](https://fragmentos-backend.onrender.com)

> ⚠️ O servidor está no plano gratuito do Render — pode demorar até 50 segundos a responder após períodos de inactividade.

---

## Decisão de Design

O upload de ficheiros é tratado no backend com **Multer** (armazenamento em memória) e depois enviado directamente para o **Supabase Storage**. Esta abordagem evita guardar ficheiros temporários em disco, o que é essencial num ambiente de servidor efémero como o Render.com, onde o sistema de ficheiros é reiniciado a cada deploy. A validação do tipo de ficheiro é feita antes do upload, aceitando apenas `image/*`, `video/*`, `audio/*` e `text/*`, rejeitando qualquer outro formato com um erro `400`.

---

*Fragmentos — porque o cansaço também merece ser documentado.*
