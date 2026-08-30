# Prossigo para o Alvo

Site institucional da Comunidade Terapêutica Cristã **Prossigo para o Alvo** —
acolhimento e recuperação para homens e mulheres em situação de dependência
química, em Pernambuco.

Site novo, construído do zero em HTML5 + CSS3 + JavaScript. Sem passo de build.
A única biblioteca é o **GSAP**, incluído localmente (não usa CDN), apenas para
a animação do preloader. Página única com âncoras.

## Estrutura

```
index.html                estrutura e conteúdo
assets/css/style.css       estilos, layout, animações
assets/js/script.js        preloader, menu, revelação ao rolar, scrollspy, formulário → WhatsApp
assets/js/vendor/gsap.min.js   GSAP 3.13 (cópia local; usado só no preloader)
assets/fotos/              imagens otimizadas + favicons (SVG/PNG)
```

## Como abrir

Abra `index.html` em qualquer navegador. Não há passo de build nem instalação.

## Preloader e favicon

- **Preloader**: tela inicial em osso com a marca "alvo" (anéis concêntricos +
  ponto terracota) animada com GSAP e transição suave de saída. Roda a cada
  carregamento da página (F5, voltar, abrir de novo). É ignorado com
  `prefers-reduced-motion`, degrada para um fade simples se o GSAP não carregar
  e some sozinho por CSS após 4 s se o JavaScript falhar de todo.
- **Barra de rolagem**: personalizada na paleta do site (trilho bege, polegar
  verde) via `scrollbar-color` e `::-webkit-scrollbar`.
- **Favicon**: `assets/fotos/favicon.svg` (vetorial, mesma marca "alvo" da
  identidade — verde-pinho / cream / terracota), com `favicon-32.png` e
  `favicon-180.png` (apple-touch) como fallback.

## Antes de publicar

- **Domínio**: trocar `https://prossigoparaoalvo.org.br` em `index.html`
  (tags `canonical`, `og:url` e o bloco JSON-LD) pelo domínio real.
- **Endereço**: foi omitido de propósito por não estar confirmado. Quando o
  cliente confirmar, adicionar em `#contato`, no rodapé e no JSON-LD
  (trocando `Organization` por `LocalBusiness` com endereço e horários reais).
- **Avaliações / depoimentos**: removidos por não haver fonte verificável.
  Há espaço natural na seção `#familias` / `#fe` para inserir relatos reais
  e creditáveis (por exemplo, avaliações do Google Business) quando disponíveis.

## Dados de contato usados

- WhatsApp / telefone: **(81) 98694-9528** (número divulgado no Instagram)
- Instagram: **@prossigopalvo**

O formulário de contato não envia e-mail: ele monta uma mensagem e abre o
WhatsApp da comunidade com o texto já preenchido.

## Fontes das imagens

Fotos reais da comunidade (extraídas do Instagram / fornecidas pelo cliente),
recomprimidas para web em WebP. Uma imagem de banco (coroa de espinhos) que
existia no material antigo foi descartada — o site usa apenas fotos reais.
Os arquivos originais foram removidos a pedido; se precisar de resolução maior
para alguma foto, recupere a partir do Instagram ou do arquivo do cliente.
