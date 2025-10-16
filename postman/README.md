# OCR Invoice Backend - Postman Collection

Esta collection contém todos os endpoints da API OCR Invoice Backend desenvolvida em NestJS.

## 📋 Pré-requisitos

- Node.js instalado
- Aplicação rodando em `http://localhost:3000`
- Postman instalado

## 🚀 Como usar

### 1. Importar Collection e Environment

1. Abra o Postman
2. Clique em **Import**
3. Selecione os arquivos:
   - `OCR_Invoice_Backend.postman_collection.json`
   - `Local_Development.postman_environment.json`
4. Selecione o environment **"OCR Invoice Backend - Local Development"**

### 2. Fluxo de Teste Recomendado

#### Passo 1: Autenticação
1. Execute **"Register User"** ou **"Login User"**
2. Os tokens serão salvos automaticamente nas variáveis globais
3. Verifique no console do Postman se os tokens foram salvos

#### Passo 2: Testar Usuários (Opcional)
1. **"Get All Users"** - Lista todos os usuários
2. **"Get User by ID"** - Busca usuário específico
3. **"Update User"** - Atualiza dados do usuário
4. **"Delete User"** - Remove usuário (cuidado!)

#### Passo 3: Testar Faturas
1. **"Upload Invoice"** - Faça upload de uma imagem (PNG/JPG/JPEG)
2. **"Get All Invoices"** - Lista todas as faturas
3. **"Get Invoice by ID"** - Busca fatura específica
4. **"Get Chat History"** - Ver histórico de chat
5. **"Send Chat Message"** - Enviar mensagem no chat
6. **"Generate Invoice PDF"** - Gerar PDF da fatura

## 🔧 Configurações

### Environment Variables

- **baseUrl**: `http://localhost:3000/api/v1`
- **accessToken**: Token JWT (preenchido automaticamente)
- **refreshToken**: Token de refresh (preenchido automaticamente)
- **userId**: ID do usuário (preenchido automaticamente)
- **invoiceId**: ID da fatura (preenchido automaticamente)

### Validações Automáticas

A collection inclui testes automáticos que verificam:
- ✅ Status codes válidos (200, 201, 204, 400, 401, 403, 404, 409, 422, 500)
- ✅ Tempo de resposta aceitável (< 10 segundos)
- ✅ Salvamento automático de tokens após login/registro
- ✅ Salvamento automático de invoiceId após upload

## 📁 Estrutura da Collection

### Authentication
- **Register User**: Registra novo usuário
- **Login User**: Autentica usuário existente
- **Logout User**: Faz logout (requer autenticação)

### Users Management
- **Create User**: Cria novo usuário (requer autenticação)
- **Get All Users**: Lista todos os usuários (requer autenticação)
- **Get User by ID**: Busca usuário por ID (requer autenticação)
- **Update User**: Atualiza dados do usuário (requer autenticação)
- **Delete User**: Remove usuário (requer autenticação)

### Invoice Management
- **Upload Invoice**: Upload de fatura (PNG/JPG/JPEG, máx 10MB)
- **Get All Invoices**: Lista todas as faturas
- **Get Invoice by ID**: Busca fatura por ID
- **Get Invoices by User ID**: Lista faturas por usuário
- **Delete Invoice**: Remove fatura
- **Get Chat History**: Histórico de chat da fatura
- **Send Chat Message**: Enviar mensagem no chat
- **Generate Invoice PDF**: Gerar PDF da fatura

### Health Check
- **API Health Check**: Verifica se API está funcionando
- **Swagger Documentation**: Acessa documentação Swagger

## 🔒 Autenticação

Todos os endpoints protegidos usam **Bearer Token**:
- Token é obtido automaticamente após login/registro
- Token é incluído automaticamente em requisições protegidas
- Use **"Logout User"** para invalidar o token

## 📤 Upload de Arquivos

Para testar upload de faturas:
1. Use o endpoint **"Upload Invoice"**
2. Selecione uma imagem (PNG, JPG, JPEG)
3. Tamanho máximo: 10MB
4. O invoiceId será salvo automaticamente para uso posterior

## 🐛 Troubleshooting

### Erro 401 (Unauthorized)
- Execute **"Login User"** primeiro
- Verifique se o token foi salvo nas variáveis globais

### Erro 400 (Bad Request)
- Verifique se o JSON está correto
- Para uploads, verifique se o arquivo é PNG/JPG/JPEG e < 10MB

### Erro 404 (Not Found)
- Verifique se a aplicação está rodando em `http://localhost:3000`
- Verifique se o endpoint existe na API

### Token não está sendo salvo
- Verifique o console do Postman para erros
- Execute novamente **"Login User"** ou **"Register User"**

## 📝 Logs

Monitore o console do Postman para:
- Status das requisições
- Tempo de resposta
- Tokens sendo salvos
- Erros detalhados

## 🔄 Atualizações

Esta collection é atualizada conforme mudanças na API:
- Novos endpoints são adicionados
- Validações são melhoradas
- Documentação é atualizada

---

**Desenvolvido para OCR Invoice Backend API v1.0**