# PARTICIPA.AI - Documentação do Projeto

## 📌 Visão Geral
O **PARTICIPA.AI** é uma plataforma de administração participativa que visa transformar a relação entre cidadãos e gestão pública através de transparência, engajamento ativo e inteligência artificial.

### 🎯 Objetivos Principais
- **Transparência Total**: Acesso fácil a dados e decisões públicas.
- **Engajamento Cidadão**: Ferramentas para enquetes, petições e fóruns.
- **Eficiência com IA**: Moderação automática, análise de sentimento e relatórios preditivos.
- **Segurança e Confiança**: Autenticação progressiva e auditoria em blockchain/RLS.

---

## 🏗️ Arquitetura Técnica (2025/2026 Ready)

### Stack Tecnológica
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Motion (Framer).
- **Backend**: Node.js (Express/NestJS) integrado com Supabase.
- **Banco de Dados**: Supabase (PostgreSQL) com Row Level Security (RLS).
- **IA**: Google Gemini API para moderação e análise.

### Níveis de Autenticação Progressiva
1. **Visitante**: Acesso a informações públicas e visualização de enquetes.
2. **Cadastrado**: Pode votar em enquetes simples e participar de fóruns básicos.
3. **Verificado Prata**: Requer validação de documento (CPF). Pode criar petições e denúncias.
4. **Premium Ouro**: Validação biométrica ou integração gov.br. Acesso a decisões orçamentárias e serviços avançados.

---

## 📂 Estrutura de Pastas (Feature-Based)
... (mantém o anterior)

---

## 🔐 Papéis e Hierarquia de Acesso (RBAC)

O sistema utiliza uma combinação de **Nível de Cidadão** (progressivo) e **Papéis Administrativos** (hierárquicos).

### Tabela de Papéis Administrativos
| Role | Descrição | Escopo | Criar Sub-admins? |
| :--- | :--- | :--- | :--- |
| `system_admin` | Administrador Global | Todo o sistema | Sim (Todos) |
| `estado_admin` | Governo Estadual | Um Estado específico | Sim (Estaduais/Municipais) |
| `assembleia_admin` | Assembleia Legislativa | Um Estado (Legislativo) | Sim (Legislativo Est.) |
| `prefeitura_admin` | Prefeitura Municipal | Uma Cidade (Executivo) | Sim (Secretarias) |
| `camara_admin` | Câmara de Vereadores | Uma Cidade (Legislativo) | Sim (Assessores) |
| `secretaria_admin` | Gestor de Secretaria | Uma Secretaria específica | Sim (Sub-setores) |

### Fluxo de Bootstrap Inicial
1. O **System Admin** cadastra Estados e suas Regiões (Imediatas/Intermediárias).
2. O **System Admin** cria as entidades iniciais (Prefeitura/Câmara) de cada cidade.
3. Os administradores de cada entidade podem então criar suas próprias sub-estruturas (Secretarias, Departamentos) e delegar acesso a sub-administradores.

---

## 🛠️ Roadmap MVP Fase 1
- [ ] Setup inicial e App Shell responsivo.
- [ ] Integração com Supabase Auth.
- [ ] Dashboard do Cidadão (Nível 1 e 2).
- [ ] Módulo de Enquetes (Listagem e Voto).
- [ ] Sistema de Auditoria e Logs.
