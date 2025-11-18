# Portfólio — Esqueleto Preto & Branco

Este é um esqueleto minimalista em preto e branco com uma animação 3D sutil (Three.js). A ideia é você preencher os textos, trocar os links e decidir para onde cada botão deve levar.

## Onde editar

- `index.html`: estrutura, seções, títulos e botões.
- `style.css`: identidade visual (cores, tipografia, espaçamentos, grid).
- `script.js`: navegação (menu mobile) e a animação 3D.

## Botões e Links

Procure por atributos `href="#"` e `data-*` para identificar os lugares fáceis de trocar:

- Botões principais (hero):
  - `a.btn.primary[data-button="primario"]` — ajuste `href` e o texto.
  - `a.btn[data-button="secundario"]` — ajuste `href` e o texto.
- Seção Trabalho:
  - `a.btn.small[data-link="projeto-a"]`, `projeto-b`, `projeto-c`.
  - Link “Ver todos”: `a.link[data-link="todos-projetos"]`.
- Seção Contato:
  - `data-button="email" | "linkedin" | "github"`.

## Animação 3D

A cena 3D fica no `canvas#scene-canvas`. O código está em `script.js`:

- Geometria: `THREE.IcosahedronGeometry` (wireframe), agora maior e ao fundo do hero.
- Interação: rotação e parallax da câmera conforme o mouse/toque.
- Respeita `prefers-reduced-motion` e pausa quando a aba fica em background.
- Para desativar a animação, você pode:
  1) Remover o `<script>` do Three.js no `index.html`, ou
  2) Comentar `initThree()` no `script.js`, ou
  3) Forçar `const prefersReduced = true;`.

## Estilo

- Cores e bordas: controlados por variáveis CSS em `:root`.
- Layout responsivo: grid para o hero e cards. O menu vira um dropdown simples no mobile.

## Dicas

- Use frases curtas e diretas (como no site de referência) e mantenha alto contraste.
- Foto: coloque uma imagem sua em `assets/profile.jpg`. O slot está no hero (`img#profile-photo` com classe `avatar`).
- Para tipografia diferente, troque a fonte em `index.html` (Google Fonts) e ajuste tamanhos em `style.css`.

Bom trabalho! ✨
