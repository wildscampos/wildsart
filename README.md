# Meu Corre $ MVP

MVP funcional de marketplace logístico regional para **Lorena-SP**, conectando:
- Cliente
- Lojista
- Motoboy
- Admin

Slogan: **"Aqui o seu corre vale mais!"**

## Stack
- React + TypeScript (Vite)
- Tailwind CSS
- shadcn/ui
- Persistência local via `localStorage` (modo demo)

> Observação: este MVP é focado em demonstração para investidor (sem pagamentos e sem geolocalização real).

## Regras de negócio aplicadas
- Taxa de entrega fixa: **R$ 7,00**
- Taxa da plataforma por pedido: **R$ 1,50**
- Ganho do motoboy por entrega: **R$ 5,50**

## Usuários de demonstração
- `cliente@meucorre.com` / `123456`
- `lojista@meucorre.com` / `123456`
- `motoboy@meucorre.com` / `123456`
- `admin@meucorre.com` / `123456`

## Funcionalidades do fluxo principal
- Login e cadastro com seleção de perfil
- Cliente cria pedido com loja, itens e endereço
- Lojista aceita/recusa e atualiza status do preparo
- Motoboy fica online/offline, aceita corrida e avança status da entrega
- Cliente acompanha status no histórico
- Admin acompanha indicadores e fluxo em tempo real

## Rotas
- `/`
- `/login`
- `/cadastro`
- `/cliente`
- `/cliente/lojas`
- `/cliente/pedido/:id`
- `/lojista`
- `/motoboy`
- `/admin`

## Como rodar
```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

## Build de produção
```bash
npm run build
npm run preview
```

## Seed (modo demo)
Este projeto usa seed automático no front-end:
- Ao abrir o app, se não houver dados no `localStorage`, os dados iniciais são carregados automaticamente.
- Para resetar os dados, limpe o `localStorage` do navegador.

