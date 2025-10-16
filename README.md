# 🧾 OCR Invoice Backend

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" />
</p>

<p align="center">
  <strong>Sistema de processamento de faturas com OCR e IA</strong>
</p>

<p align="center">
  <a href="https://nestjs.com/" target="_blank">NestJS</a> • 
  <a href="https://www.prisma.io/" target="_blank">Prisma</a> • 
  <a href="https://openai.com/" target="_blank">OpenAI</a> • 
  <a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>
</p>

---

## 📋 Sobre o Projeto

Sistema backend desenvolvido em NestJS para processamento automático de faturas utilizando OCR (Optical Character Recognition) e Inteligência Artificial. O sistema permite upload de faturas em formato de imagem, extração automática de dados e interação via chat com IA para análise detalhada.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** com refresh tokens
- 📤 **Upload de faturas** (PNG, JPG, JPEG)
- 🤖 **Processamento OCR** com OpenAI
- 💬 **Chat interativo** para análise de faturas
- 📄 **Geração de PDFs** das faturas processadas
- 🏗️ **Arquitetura Clean** com separação de responsabilidades
- 📊 **Validação robusta** com class-validator
- 📚 **Documentação Swagger** automática

---

## 🛠️ Tecnologias Utilizadas

- **Framework**: NestJS (Node.js)
- **Banco de Dados**: PostgreSQL + Prisma ORM
- **Autenticação**: JWT (JSON Web Tokens)
- **IA/OCR**: OpenAI API
- **Storage**: Cloudflare R2
- **Validação**: class-validator + class-transformer
- **Documentação**: Swagger/OpenAPI
- **Testes**: Jest

---

## 🚀 Como Executar Localmente

### 📋 Pré-requisitos

Certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- [Yarn](https://yarnpkg.com/) ou npm
- [PostgreSQL](https://www.postgresql.org/) (versão 13 ou superior ou opte por algum banco em nuvem (neon na vercel, por exemplo))
- [Git](https://git-scm.com/)

### 🔧 Configuração do Ambiente

#### 1. Clone o Repositório

```bash
git clone <seu-repositorio>
cd ocr-invoice-backend
```

#### 2. Instale as Dependências

```bash
yarn install
# ou
npm install
```

#### 3. Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/ocr_invoice_db"

# JWT
JWT_SECRET="seu-jwt-secret-super-seguro-minimo-24-caracteres"

# OpenAI
OPENAI_API_KEY="sua-chave-da-openai"

# Cloudflare R2 (Storage)
R2_ACCOUNT_ID="seu-account-id"
R2_ACCESS_KEY_ID="sua-access-key"
R2_SECRET_ACCESS_KEY="sua-secret-key"
R2_BUCKET_NAME="seu-bucket-name"
R2_ENDPOINT="https://seu-account-id.r2.cloudflarestorage.com"
R2_CDN_URL="https://seu-cdn-url.com"

# Application
NODE_ENV="development"
PORT=3000
CORS_ORIGIN="*"
```

#### 4. Configure o Banco de Dados

```bash
# Execute as migrações do Prisma
npx prisma migrate dev

# (Opcional) Visualize o banco de dados
npx prisma studio

# Fazer o sync do prisma client no seu local.
npx prisma generate
```

#### 5. Execute a Aplicação

```bash
# Modo desenvolvimento (com hot reload)
yarn start:dev

# Modo produção
yarn build
yarn start:prod
```

### 🌐 Acessando a Aplicação

Após executar, a aplicação estará disponível em:

- **API**: http://localhost:3000/api/v1
- **Documentação Swagger**: http://localhost:3000/docs/swagger
- **Health Check**: http://localhost:3000/api/v1/

---

## 📚 Documentação da API

### 🔗 Endpoints Principais

#### Autenticação
- `POST /auth/register` - Registrar usuário
- `POST /auth/login` - Fazer login
- `POST /auth/logout` - Fazer logout

#### Usuários
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PUT /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

#### Faturas
- `POST /invoices` - Upload de fatura
- `GET /invoices` - Listar faturas
- `GET /invoices/:id` - Buscar fatura por ID
- `GET /invoices/user/:id` - Faturas por usuário
- `DELETE /invoices/:id` - Deletar fatura
- `GET /invoices/:id/pdf` - Gerar PDF

#### Chat
- `GET /invoices/:id/chat` - Histórico do chat
- `POST /invoices/:id/chat` - Enviar mensagem

### 📖 Documentação Completa

Acesse a documentação interativa do Swagger em: http://localhost:3000/docs/swagger

---

## 🧪 Testando a API

### Usando Postman

1. Importe a collection do Postman (arquivo em `/postman/`)
2. Configure o environment "Local Development"
3. Execute primeiro "Register User" ou "Login User"
4. Os tokens serão salvos automaticamente
5. Teste os outros endpoints

### Exemplo de Requisição

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@email.com",
    "password": "senha123456"
  }'

# Upload de fatura
curl -X POST http://localhost:3000/api/v1/invoices \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -F "file=@caminho/para/sua/fatura.jpg"
```

---

## 🏗️ Arquitetura do Projeto

```
src/
├── common/                 # Código compartilhado
│   ├── filters/           # Filtros de exceção
│   ├── interceptors/      # Interceptors globais
│   └── errors/           # Classes de erro customizadas
├── config/               # Configurações da aplicação
├── database/             # Configuração do banco
│   ├── prisma/          # Prisma service
│   └── storage/         # Serviço de storage
└── modules/              # Módulos da aplicação
    ├── auth/            # Autenticação
    ├── user/            # Gerenciamento de usuários
    ├── invoice/         # Processamento de faturas
    └── openai/          # Integração com OpenAI
```

### 🎯 Padrões Implementados

- **Clean Architecture** - Separação clara de responsabilidades
- **Repository Pattern** - Abstração da camada de dados
- **DTO Pattern** - Validação e transformação de dados
- **Dependency Injection** - Inversão de dependências
- **Error Handling** - Tratamento centralizado de erros

---

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento
yarn start:dev          # Executa em modo desenvolvimento
yarn start:debug        # Executa em modo debug

# Produção
yarn build              # Compila o projeto
yarn start:prod         # Executa em modo produção

# Banco de Dados
yarn prisma migrate dev  # Executa migrações
yarn prisma generate    # Gera cliente Prisma
yarn prisma studio      # Interface visual do banco

# Testes
yarn test               # Testes unitários
yarn test:e2e           # Testes end-to-end
yarn test:cov           # Cobertura de testes

# Linting
yarn lint               # Verifica código
yarn lint:fix           # Corrige problemas de lint
```

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Erro de Conexão com Banco
```bash
# Verifique se o PostgreSQL está rodando
sudo service postgresql status

# Verifique a string de conexão no .env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/nome_do_banco"
```

#### Erro de Migração
```bash
# Reset do banco (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Ou execute migrações manualmente
npx prisma migrate dev --name init

```

#### Erro de OpenAI
- Verifique se a chave da API está correta
- Confirme se tem créditos disponíveis
- Verifique a conectividade com a internet

#### Erro de Storage (R2)
- Verifique as credenciais do Cloudflare R2
- Confirme se o bucket existe
- Verifique as permissões de acesso

---

## 📈 Próximos Passos
- [ ] Containerizar a aplicação com docker
- [ ] Adicionar testes de integração
- [ ] Implementar rate limiting
- [ ] Implementar CI/CD com GitHub Actions
- [ ] Adicionar suporte a mais formatos de arquivo

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a [documentação do Swagger](http://localhost:3000/docs/swagger)
2. Consulte os [issues do projeto](../../issues)
3. Abra uma nova issue descrevendo o problema

---

<p align="center">
  Desenvolvido com ❤️ usando Pedro Lima
</p>