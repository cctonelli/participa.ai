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
- `src/app/`: Rotas e layouts principais.
- `src/features/`: Slices de funcionalidades (auth, enquetes, denuncias).
- `src/domain/`: Entidades e regras de negócio puras.
- `src/components/`: Componentes de UI reutilizáveis (shadcn/ui style).
- `src/lib/`: Configurações de serviços (supabase, gemini, utils).

---

## 🛠️ Roadmap MVP Fase 1
- [ ] Setup inicial e App Shell responsivo.
- [ ] Integração com Supabase Auth.
- [ ] Dashboard do Cidadão (Nível 1 e 2).
- [ ] Módulo de Enquetes (Listagem e Voto).
- [ ] Sistema de Auditoria e Logs.
