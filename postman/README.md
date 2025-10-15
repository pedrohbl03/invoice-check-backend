# Collection Postman - OCR Invoice Backend

Esta pasta contém a collection completa do Postman para testar todos os endpoints do sistema OCR Invoice Backend.

## Arquivos Inclusos

### 1. `OCR_Invoice_Backend.postman_collection.json`
Collection principal contendo todos os endpoints organizados por módulos:

#### 📁 **Authentication**
- **POST** `/auth/register` - Registra um novo usuário
- **POST** `/auth/login` - Autentica usuário e retorna tokens JWT
- **POST** `/auth/logout` - Faz logout do usuário autenticado

#### 📁 **Users Management**
- **POST** `/users` - Cria um novo usuário
- **GET** `/users` - Lista todos os usuários
- **GET** `/users/:id` - Busca usuário por ID
- **PUT** `/users/:id` - Atualiza dados do usuário
- **DELETE** `/users/:id` - Remove usuário

#### 📁 **Invoice Management**
- **POST** `/invoices` - Upload de fatura (multipart/form-data)
- **GET** `/invoices` - Lista todas as faturas
- **GET** `/invoices/:id` - Busca fatura por ID
- **DELETE** `/invoices/:id` - Remove fatura
- **GET** `/invoices/:id/chat` - Obtém histórico de chat da fatura
- **POST** `/invoices/:id/chat` - Envia mensagem no chat da fatura

#### 📁 **Health Check**
- **GET** `/` - Verifica se a API está funcionando
- **GET** `/docs/swagger` - Acessa documentação Swagger

### 2. `Local_Development.postman_environment.json`
Environment configurado para desenvolvimento local com variáveis:

- `baseUrl`: http://localhost:3000/api/v1
- `accessToken`: Token JWT (preenchido automaticamente)
- `refreshToken`: Token de refresh (preenchido automaticamente)  
- `userId`: ID do usuário logado (preenchido automaticamente)
- `invoiceId`: ID da fatura (preenchido automaticamente)

## Como Usar

### 1. **Importar no Postman**
1. Abra o Postman
2. Clique em "Import"
3. Selecione os dois arquivos JSON desta pasta
4. A collection e o environment serão importados automaticamente

### 2. **Configurar Environment**
1. No Postman, selecione o environment "OCR Invoice Backend - Local Development"
2. Verifique se a `baseUrl` está correta (http://localhost:3000/api/v1)

### 3. **Iniciar o Servidor**
Certifique-se de que o servidor NestJS está rodando:
```bash
npm run start:dev
```

### 4. **Fluxo de Teste Recomendado**

#### **Passo 1: Autenticação**
1. Execute **Register User** para criar uma conta
2. Ou execute **Login User** se já tiver uma conta
3. Os tokens serão salvos automaticamente nas variáveis do environment

#### **Passo 2: Gerenciar Usuários** (Opcional)
1. **Get All Users** - Para ver todos os usuários
2. **Get User by ID** - Para buscar usuário específico
3. **Update User** - Para atualizar dados
4. **Delete User** - Para remover usuário

#### **Passo 3: Gerenciar Faturas**
1. **Upload Invoice** - Faça upload de um arquivo (PDF, JPG, PNG)
   - O ID da fatura será salvo automaticamente
2. **Get All Invoices** - Para ver todas as faturas
3. **Get Invoice by ID** - Para ver detalhes de uma fatura específica

#### **Passo 4: Testar Chat** (Se disponível)
1. **Get Chat History** - Para ver histórico de conversas
2. **Send Chat Message** - Para enviar mensagem sobre a fatura

## Recursos Automáticos

### **Auto-Save de Tokens**
- Após login/register bem-sucedido, os tokens JWT são salvos automaticamente
- Não é necessário copiar/colar tokens manualmente

### **Auto-Save de IDs**
- User ID é salvo automaticamente após login/register
- Invoice ID é salvo automaticamente após upload

### **Autenticação Automática**
- Endpoints protegidos usam automaticamente o token salvo
- Headers de autorização são configurados automaticamente

## Exemplos de Dados

### **Registro/Login**
```json
{
  "name": "João Silva",
  "email": "joao.silva@email.com", 
  "password": "senha123"
}
```

### **Criação de Usuário**
```json
{
  "name": "Maria Santos",
  "email": "maria.santos@email.com",
  "password": "senha456",
  "role": "USER"
}
```

### **Mensagem de Chat**
```json
{
  "message": "Pode me explicar os detalhes desta fatura?"
}
```

## Troubleshooting

### **Token Expirado**
Se receber erro 401, faça login novamente para obter novos tokens.

### **Servidor Não Responde**
Verifique se:
- O servidor está rodando na porta 3000
- A URL base está correta no environment
- Não há conflitos de porta

### **Upload de Arquivo**
Para testar upload de faturas:
- Use arquivos PDF, JPG ou PNG
- Tamanho máximo recomendado: 10MB
- Selecione o arquivo no campo "file" do form-data

## Swagger Documentation

A API também possui documentação Swagger disponível em:
http://localhost:3000/docs/swagger

Esta documentação complementa os testes do Postman com:
- Esquemas detalhados dos DTOs
- Exemplos de responses
- Validações de campos
- Códigos de status HTTP

---

**Desenvolvido para o projeto OCR Invoice Backend**
*Collection atualizada em: Outubro 2024*