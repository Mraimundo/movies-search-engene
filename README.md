# Movie and Serie Search Engene

Projeto web simples para busca de filmes, desenvolvido com HTML, CSS e JavaScript puro. Inclui uma página principal (index.html) e uma página de testes (test-runner.html) para executar testes do front-end.

## Sumário

- Visão geral
- Funcionalidades
- Estrutura do projeto
- Pré‑requisitos
- Como executar
- Scripts de desenvolvimento
- Testes
- Configuração/Personalização
- Boas práticas e padrões adotados
- Acessibilidade
- Performance
- Próximos passos (Roadmap)
- Contribuição
- Licença

## Visão geral

O objetivo do Movie and Serie Search Engene é permitir que usuários pesquisem filmes e visualizem resultados de forma rápida e responsiva. O projeto foi feito para ser leve, sem dependências de frameworks, facilitando o estudo e a manutenção.

## Funcionalidades

- Campo de busca para filmes e séries
- Exibição de resultados com estilos responsivos
- Feedback visual de carregamento e/ou erros (quando implementado)
- Testes básicos de UI e lógica em `test-runner.html`

<hr/>

## Print do projeto final (screenshots)

<img width="1900" height="846" alt="Image" src="https://github.com/user-attachments/assets/23c3d9da-1787-4d56-9ea5-34901e27445c" />

<hr/>

# Deploy da Aplicação :dash:

> <a href="https://movie-serie-search-engene.netlify.app/" target='_blank'>Link do deploy da aplicação<a/>

<hr/>

## Estrutura do projeto

```
/ (raiz)
├─ index.html              # Página principal do app
├─ test-runner.html        # Página para executar testes no navegador
├─ src/
│  ├─ assets/
│  │  └─ favico.svg       # Ícone do site
│  ├─ css/
│  │  ├─ global.css       # Estilos globais (reset, variáveis, utilitários)
│  │  └─ styles.css       # Estilos específicos da aplicação
│  └─ js/
│     ├─ app.js        # Lógica principal do app (busca/renderização)
│     └─ app.spec.js         # Testes front-end executados via test-runner.html
└─ README.md
```

## Pré‑requisitos

- Navegador moderno (Chrome, Firefox, Edge, Safari)
- Opcional: Servidor estático local para evitar restrições de CORS ao carregar arquivos (ex.: VS Code Live Server, `python -m http.server`, `npx serve`)

## Como executar

1. Método direto (sem servidor):

   - Abra o arquivo `index.html` diretamente no navegador (duplo clique ou arraste e solte no navegador).
   - Observação: alguns recursos podem ser limitados por políticas de CORS dependendo do navegador.

2. Método recomendado (com servidor local):
   - Usando Python 3:
     - macOS/Linux: `python3 -m http.server 5173`
     - Windows: `py -3 -m http.server 5173`
     - Abra http://localhost:5173 no navegador e navegue até `index.html`.
   - Usando Node.js (npx serve):
     - `npx serve . -l 5173`
     - Abra http://localhost:5173
   - VS Code Live Server: clique em “Go Live” na barra de status com o projeto aberto e acesse o endereço indicado.

## Scripts de desenvolvimento

Não há ferramentas de build. Todo o código é carregado diretamente no navegador. Caso deseje, você pode integrar ferramentas como Vite, Parcel ou Webpack no futuro (ver seção Roadmap).

## Testes

- Abra `test-runner.html` no navegador para executar os testes definidos em `src/js/tests.js`.
- Os testes foram pensados para rodar em ambiente de navegador sem dependências externas. Ajuste/expanda os testes conforme a evolução do app.

## Configuração/Personalização

- Endpoints de API: o `script.js` consome uma API (ex.: OMDb, The Movie DB), configure a URL base e a chave de API no próprio arquivo, preferencialmente usando variáveis claras e um ponto único de configuração.
- Estilos: personalize cores, tipografia e espaçamentos em `src/css/global.css` e `src/css/styles.css`.
- Assets: adicione ícones e imagens em `src/assets/`.

## Boas práticas e padrões adotados

- JavaScript modular e funções puras quando possível
- Nomes de funções e variáveis descritivos
- Separação de responsabilidades (DOM, lógica, estilos)
- Comentários sucintos e úteis somente onde agregam valor
- CSS organizado por responsabilidade (global vs. específico)

## Acessibilidade

- Use semântica HTML adequada (header, main, section, etc.)
- Forneça rótulos (labels) para campos de formulário
- Garanta contraste suficiente entre texto e fundo
- Gerencie foco ao exibir resultados ou estados de erro

## Performance

- Evite repinturas desnecessárias (batching de atualizações no DOM)
- Use delegação de eventos quando aplicável
- Comprima imagens e ícones
- Considere lazy-loading de assets pesados se adicionados no futuro

## Próximos passos (Roadmap)

- Integração com API pública de filmes (OMDb/TMDB) com paginação
- Estado de carregamento e tratamento de erros aprimorados
- Componentização leve da UI
- Testes adicionais de integração e snapshots de DOM
- Integração contínua (CI) com execução de testes no GitHub Actions
- Suporte a i18n (pt-BR/en-US)

## Contribuição

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b feat/minha-feature`
3. Faça commits atômicos: `git commit -m "feat: descrição objetiva"`
4. Abra um Pull Request descrevendo o que mudou e o porque

## Licença

Defina a licença do projeto (ex.: MIT). Caso opte pela MIT, crie um arquivo `LICENSE` na raiz com o texto correspondente.
