# React Shadcn Starter

Starter React com TypeScript, Vite, Tailwind CSS e componentes shadcn baseados em Base UI. O código é organizado por funcionalidades, com roteamento e infraestrutura compartilhada já configurados.

## Ambiente

Use Node.js 24.x e npm 11.x para reproduzir o ambiente validado. Versões utilizadas: Node.js 24.21.0 e npm 11.19.0.

## Instalação e desenvolvimento

```bash
npm ci
npm run dev
```

`npm ci` instala as versões registradas no `package-lock.json`. Abra o endereço local informado pelo Vite.

## Comandos disponíveis

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento com atualização automática. |
| `npm run lint` | Verifica o código com ESLint. |
| `npm run build` | Verifica o TypeScript e gera a aplicação em `dist/`. |
| `npm run preview` | Serve o último build para conferência local. Execute o build antes. |

Antes de concluir uma alteração, execute:

```bash
npm run lint
npm run build
```

Não há comando `test` ou suíte de testes automatizados configurada neste starter. O lint e o build devem ser complementados pela conferência do comportamento afetado no navegador.

## Arquitetura

```text
src/
├── core/
│   ├── config/
│   ├── providers/
│   ├── queryClient/
│   ├── router/
│   ├── styles/
│   └── themes/
├── features/
│   └── home/
├── pages/
│   └── Home/
├── shared/
│   ├── components/
│   └── shadcn/
└── main.tsx
```

| Situação | Destino |
| --- | --- |
| Configuração, providers e infraestrutura global | `src/core/` |
| Componentes, hooks e lógica de uma funcionalidade | `src/features/{feature}/` |
| Composição de uma tela ou rota | `src/pages/{Pagina}/index.tsx` |
| Código genérico reutilizado entre funcionalidades | `src/shared/` |
| Primitivas e utilitários do shadcn | `src/shared/shadcn/` |

Mantenha um componente na sua feature até existir uma necessidade real de compartilhamento. O código de `shared` não deve depender das regras de uma feature.

A Home demonstra essa composição: `HomePage` utiliza `HomeHero`, que utiliza os componentes compartilhados `PageHeader` e `Button`.

Não há Plop ou geradores de features e páginas configurados. A criação desses arquivos é manual.

## Roteamento

As rotas são declaradas em `src/core/router/routes.tsx` como `RouteObject[]` e entregues diretamente ao `createBrowserRouter` em `src/core/router/index.tsx`. A configuração atual possui apenas a Home na raiz.

## Componentes e estilos

- O `components.json` configura o shadcn com preset `base-nova`, Base UI e aliases para `src/shared/shadcn/`.
- O CSS do Tailwind e os tokens semânticos ficam em `src/core/styles/core/index.css`.
- Os estilos globais básicos ficam em `src/core/styles/core/base.css`.
- A tipografia usa `Geist Variable`, importada do pacote local `@fontsource-variable/geist`.
- A inicialização e a preferência de tema claro/escuro ficam em `src/core/themes/`.

Para conferir a configuração com o CLI já instalado no projeto:

```bash
npm exec -- shadcn info
```

O ESLint mantém exceções por arquivo e nome para exports da API do kit shadcn, como variantes e hooks. As demais verificações continuam ativas. Exports mistos ainda podem fazer o Vite propagar a atualização aos módulos que os importam.

## Infraestrutura disponível

O projeto inclui TanStack Query, com provider e configuração em `core`, Zustand para o tema e Zod para configuração de ambiente. As dependências completas estão no `package.json`; utilize cada recurso conforme a necessidade da funcionalidade.

## Build e publicação

O build atual é uma SPA: o React monta o conteúdo no navegador. A saída publicável é `dist/`; `npm run preview` serve apenas para conferência local.

Se forem adicionadas rotas além da raiz, configure e valide o fallback para `index.html` na hospedagem, incluindo acesso direto e atualização dessas URLs. O comportamento de páginas inexistentes depende também da configuração do host.
