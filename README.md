# Meu Corre $ — MVP Operacional (Web Demo)

## Visão geral
Este projeto implementa um MVP funcional do **Meu Corre $** para demonstração de fluxo logístico regional: cliente, lojista, motoboy e admin.

## O que já funciona
- Login/cadastro com perfil e persistência de sessão.
- Aprovação pendente, bloqueio/suspensão de usuário.
- Fluxo oficial de status de entrega:
  - `criado`, `procurando_motoboy`, `aceito`, `indo_coleta`, `coletado`, `indo_entrega`, `entregue`, `cancelado`.
- Status oficial de motoboy:
  - `offline`, `online`, `em_entrega`, `indisponivel`.
- Cálculos financeiros em **centavos** (sem `double/float`):
  - Entrega base: R$ 10,00 (1000)
  - Lojista paga +R$ 0,75
  - Motoboy recebe -R$ 0,75
  - Plataforma recebe R$ 1,50
- Painel Admin com métricas, aprovação/bloqueio e logs.

## Contas demo
- `cliente@meucorre.com` / `123456`
- `lojista@meucorre.com` / `123456`
- `motoboy@meucorre.com` / `123456`
- `admin@meucorre.com` / `123456`

## Rodando localmente
```bash
npm install
npm run dev
```

Build:
```bash
npm run build
```

## Observação importante (produção real)
Este repositório está em stack **React/Vite web**, sem backend Firebase real. Para operação real, ainda é necessário conectar:
- Firebase Auth
- Firestore + Security Rules
- Cloud Functions
- FCM
- Storage
- telemetria/monitoramento e mapa em tempo real
