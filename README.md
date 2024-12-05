# MedCon-Angular

**MedCon-Angular** é um sistema de gerenciamento de consultas médicas desenvolvido com **Angular** como projeto final do módulo de **Angular II** do curso **Santander Coders**. O objetivo é aplicar conceitos como componentização, rotas, autenticação e integração com APIs, apresentados ao longo do curso.

---

## 🚀 **Descrição do Projeto**

O **MedCon-Angular** facilita o gerenciamento de consultas médicas com funcionalidades específicas para dois tipos de usuários:

- **ADMIN**:
  - Visualiza todas as consultas.
  - Pode marcar consultas como concluídas ou cancelá-las.

- **USER**:
  - Visualiza apenas suas consultas.
  - Pode criar, editar ou cancelar consultas.

> **Regras de Negócio**:
> - Consultas **concluídas** não podem ser editadas ou canceladas.  
> - Consultas **canceladas** não podem ser editadas ou marcadas como concluídas.

---

## 🛠️ **Funcionalidades**

### 🔑 **Autenticação**
- Login para acesso ao sistema.
- Perfis disponíveis:
  - **USER**
  - **ADMIN**

### 📋 **Cadastro de Usuário**
- Registro de novos usuários com escolha de perfil.

### 🖥️ **Dashboard**
- **ADMIN**:
  - Visualiza todas as consultas.
  - Gerencia status das consultas (concluída ou cancelada).
- **USER**:
  - Visualiza, edita ou cancela suas consultas.

### ⚙️ **Gestão de Consultas**
- Criação, edição e cancelamento de consultas pelos usuários.
- Gerenciamento de status pelos administradores:
  - **SCHEDULED**: Padrão ao criar a consulta.
  - **DONE**: Concluída.
  - **CANCELED**: Cancelada.

---

## 📂 **Estrutura do Projeto**

```plaintext
src/
├── app/
│   ├── common/                 # Componentes reutilizáveis e comuns
│   │   ├── aside/              # Menu lateral
│   │   ├── header/             # Cabeçalho
│   │   └── not-found/          # Página de erro 404
│   ├── core/                   # Recursos centrais da aplicação
│   │   ├── constants/          # Constantes globais
│   │   ├── guards/             # Guards para proteção de rotas
│   │   └── services/           # Serviços compartilhados
│   │       ├── auth.interceptor.spec.ts
│   │       └── auth.interceptor.ts
│   ├── modules/                # Módulos funcionais da aplicação
│   │   ├── appointments/       # Gerenciamento de consultas médicas
│   │   │   ├── components/     # Componentes relacionados às consultas
│   │   │   │   ├── appointments-create/   # Tela de criação de consultas
│   │   │   │   └── main/                  # Tela principal de consultas
│   │   │   ├── models/         # Modelos de dados para consultas
│   │   │   └── services/       # Serviços relacionados a consultas
│   │   └── auth/               # Gerenciamento de autenticação
│   │       ├── components/     # Componentes relacionados à autenticação
│   │       │   ├── login/      # Tela de login
│   │       │   └── signup/     # Tela de cadastro
│   │       ├── models/         # Modelos de dados de autenticação
│   │       └── services/       # Serviços de autenticação
│   ├── app.component.css       # Estilo global do componente raiz
│   ├── app.component.html      # Template do componente raiz
│   ├── app.component.spec.ts   # Testes unitários do componente raiz
│   ├── app.component.ts        # Lógica do componente raiz
│   ├── app.config.ts           # Configurações globais da aplicação
│   └── app.routes.ts           # Configuração de rotas
├── assets/                     # Recursos estáticos (imagens, ícones, etc.)

```

---

## 📡 **Integração com API**

A aplicação conecta-se a uma API para persistência e gerenciamento dos dados das consultas. A API suporta operações de **CRUD** e gerencia automaticamente os status das consultas.

- **Status inicial**: `SCHEDULED`.

> **Repositório da API**: [API Médica - Repositório](https://github.com/ivirson/1177-Angular-II).

---

## 🛠️ **Tecnologias Utilizadas**

- **Frontend**: Angular
- **Estilos**: SCSS
- **Gerenciamento de Estado**: Angular Services
- **Autenticação**: Guards e rotas protegidas
- **Backend (API)**: Fornecido pelo repositório oficial

---

## 📦 **Como Executar o Projeto**

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/SEU-USUARIO/medcon-angular.git
   cd medcon-angular
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Configure o ambiente**:
   - Atualize as variáveis em `src/environments` com a URL da API.

4. **Inicie o servidor de desenvolvimento**:
   ```bash
   ng serve
   ```
   - Acesse: `http://localhost:4200`.

---

## 📧 **Contato**

Desenvolvido por **[Gekyume Serna, Lucas Borges, Pedro Carvalho]** no curso **Santander Coders**:  
- **Pedro Carvalho**: [GitHub](https://github.com/pdrLCarvalho)  
- **Lucas Borges**: [GitHub](https://github.com/DOULORES)  
- **Gekyumi**: [GitHub](https://github.com/TheBestGekyume)  

**Transformando a gestão médica com tecnologia!**
