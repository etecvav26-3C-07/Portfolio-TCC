# Documentação Completa - Portfolio-TCC (Render Index)

## 📋 Visão Geral do Projeto

**Nome do Projeto:** Render Index  
**Tipo:** Site de documentação e indexação sobre computação gráfica  
**Propósito:** Facilitar o acesso a conteúdos sobre renderização 3D, computação gráfica e ferramentas relacionadas  
**TCC do:** Grupo 07 de Desenvolvimento de Sistemas 2026 - Etec Vasco Antonio Venchiarutti  
**Repositório:** https://github.com/etecvav26-3C-07/Portfolio-TCC

### Objetivos Principais
- Indexação de conteúdos sobre renderização 3D
- Foco principal em: OpenGL, Vulkan, Blender
- Conceito baseado em "Awesome Index" (organização de links via Markdown)
- Explicações sobre Blender, OpenGL, Vulkan e WebGL
- Demonstração de conceitos através de animações web interativas

---

## 🛠️ Tecnologias e Frameworks Utilizados

### Frontend Principal
- **VitePress (v2.0.0-alpha.19):** Framework de documentação estática baseado em Vue.js
- **Vue.js 3:** Framework JavaScript reativo para componentes
- **Three.js (v0.160.0):** Biblioteca 3D para animações e visualizações web
- **JavaScript ES6+:** Linguagem principal do projeto

### Bibliotecas Adicionais
- **google-translate-api-x (v10.7.3):** Tradução automática de conteúdo RSS
- **rss-parser (v3.13.0):** Parser de feeds RSS para sistema de notícias

### Gerenciamento de Pacotes
- **pnpm:** Gerenciador de pacotes (configuração via pnpm-workspace.yaml)
- **Node.js:** Runtime JavaScript

### APIs Web para Gráficos
- **WebGL 2:** API nativa para gráficos 3D no navegador
- **WebGPU:** API moderna para gráficos de alta performance (futuro)
- **Three.js:** Abstração de alto nível sobre WebGL
- **Babylon.js:** Engine 3D completa para web

---

## 📁 Estrutura Completa de Pastas

```
Portfolio-TCC/
├── .git/                          # Controle de versão Git
├── .gitignore                     # Arquivos ignorados pelo Git
├── README.md                      # Documentação principal do projeto
├── B1/                            # Materiais do Bimestre 1
│   └── B1-M1-questionario.md      # Questionário do Módulo 1
├── docs/                          # Documentação VitePress (raiz)
│   └── .vitepress/               # Configuração do VitePress
│       ├── cache/                # Cache de build
│       ├── components/           # Componentes Vue personalizados
│       │   ├── animations/       # Animações Three.js
│       │   │   ├── anim_camera.js
│       │   │   ├── anim_default.js
│       │   │   ├── anim_luz.js
│       │   │   ├── anim_modelagem.js
│       │   │   ├── anim_opengl.js
│       │   │   ├── anim_rasterizacao.js
│       │   │   ├── anim_render.js
│       │   │   ├── anim_threejs.js
│       │   │   ├── anim_transformacoes.js
│       │   │   ├── anim_vulkan.js
│       │   │   └── anim_webgpu.js
│       │   ├── BabylonPanel.vue   # Componente para demos Babylon.js
│       │   ├── ConceptCarousel.vue
│       │   ├── ConceptScroller.vue
│       │   ├── ThreePanel.vue     # Componente principal para animações 3D
│       │   ├── WebGLPanel.vue     # Componente para demos WebGL
│       │   └── WebGPUPanel.vue    # Componente para demos WebGPU
│       ├── dist/                 # Build de produção
│       ├── theme/                # Tema personalizado
│       └── config.mts            # Configuração do VitePress
│   ├── docs/                     # Subdocumentos
│   ├── public/                   # Arquivos estáticos públicos
│   │   ├── icons/                # Ícones SVG
│   │   ├── blender-news.json     # Notícias traduzidas do Blender
│   │   ├── box.svg               # Logo principal
│   │   ├── folder-code.svg      # Ícone de código
│   │   ├── noticias.json         # Feed de notícias geral
│   │   ├── opengl-news.json      # Notícias traduzidas do OpenGL
│   │   └── vulkan-news.json      # Notícias traduzidas do Vulkan
│   ├── scripts/                 # Scripts de build/utilitários
│   │   └── rss-conversor.mjs     # Script para converter RSS em JSON
│   ├── api-examples.md           # Página de renderização mobile
│   ├── bibliotecas.md            # Página de bibliotecas
│   ├── blender.md                # Página sobre Blender
│   ├── conceitos.md              # Página de conceitos
│   ├── edicao-de-video.md        # Página sobre edição de vídeo
│   ├── glossario.md              # Glossário de termos
│   ├── guia.md                   # Guia para iniciantes
│   ├── impressao-3d-e-modelagem.md # Página sobre impressão 3D
│   ├── index.md                  # Página inicial (home)
│   ├── material-educativo.md     # Materiais educativos
│   ├── noticias.md               # Sistema de notícias RSS
│   ├── opengl.md                 # Página sobre OpenGL
│   ├── software.md               # Página de softwares
│   ├── vulkan.md                 # Página sobre Vulkan
│   └── web.md                    # Página sobre gráficos web
├── NotebookLM/                   # Materiais do NotebookLM
│   ├── fernando-braz-notebooklm.md
│   └── gustavo-henrique-notebooklm.md
├── produto/                      # Diretório principal do produto (site)
│   ├── node_modules/             # Dependências npm
│   ├── package-lock.json         # Lock file do npm
│   ├── package.json              # Configuração do projeto npm
│   ├── pnpm-lock.yaml            # Lock file do pnpm
│   └── pnpm-workspace.yaml       # Configuração workspace pnpm
├── tcc-2026/                     # Materiais do TCC 2026
│   ├── Indexação sobre Computação Gráfica - Relatório.docx
│   ├── Indexação sobre Computação Gráfica.pdf
│   ├── Plano de pesquisa.md
│   ├── README.md                 # Resumo do projeto TCC
│   ├── slides.pdf                # Apresentação em PDF
│   └── slides.pptx               # Apresentação PowerPoint
└── uml-pesquisa/                 # Pesquisa sobre UML
    ├── diagrama_classe.png       # Diagrama de classes
    ├── diagrama_uso.png          # Diagrama de caso de uso
    ├── README.MD                 # Documentação UML
    └── UML.md                    # Conteúdo detalhado sobre UML
```

---

## 🚀 Scripts e Comandos

### Comandos Disponíveis (package.json)
```json
{
  "scripts": {
    "docs:dev": "vitepress dev docs",      // Servidor de desenvolvimento
    "docs:build": "vitepress build docs",  // Build para produção
    "docs:preview": "vitepress preview docs" // Preview do build
  }
}
```

### Como Executar
1. **Desenvolvimento:**
   ```bash
   cd produto
   pnpm install
   pnpm docs:dev
   ```
   O site estará disponível em `http://localhost:5173`

2. **Build de Produção:**
   ```bash
   pnpm docs:build
   ```
   Os arquivos gerados estarão em `produto/docs/.vitepress/dist`

3. **Preview de Produção:**
   ```bash
   pnpm docs:preview
   ```

### Script RSS Conversor
Localização: `produto/docs/scripts/rss-conversor.mjs`

**Funcionalidade:**
- Baixa feeds RSS de fontes externas (Vulkan, OpenGL, Blender)
- Traduz automaticamente o conteúdo para português usando google-translate-api-x
- Gera arquivos JSON com as notícias traduzidas
- Salva os arquivos em `produto/docs/public/`

**Fontes RSS:**
- Vulkan: https://www.khronos.org/feeds/vulkan_news_feed
- OpenGL: https://www.gamingonlinux.com/article_rss.php
- Blender: https://code.blender.org/feed/

**Execução:**
```bash
cd produto/docs/scripts
node rss-conversor.mjs
```

---

## 🎨 Componentes Vue Personalizados

### ThreePanel.vue
**Localização:** `produto/docs/.vitepress/components/ThreePanel.vue`

**Funcionalidade:**
- Componente principal para renderização 3D usando Three.js
- Aceita props: `topic`, `title`, `subtitle`, `playing`, `showHeader`
- Carrega animações dinamicamente baseadas no `topic`
- Gerencia ciclo de vida da cena 3D (setup, render, dispose)
- Responsivo com ResizeObserver
- Otimizações: para animação quando página não está visível
- Sistema de luzes padrão (key, fill, rim)

**Uso:**
```vue
<ThreePanel 
  topic="opengl" 
  title="Pipeline OpenGL" 
  subtitle="VBO → Vertex Shader → Rasterização → Fragment Shader"
  :playing="true"
  :showHeader="true"
/>
```

### WebGLPanel.vue
**Localização:** `produto/docs/.vitepress/components/WebGLPanel.vue`

**Funcionalidade:**
- Demo nativa de WebGL 2 sem Three.js
- Implementa shaders GLSL (vertex e fragment)
- Cubo colorido rotativo com matrizes MVP
- Tratamento de erros de compilação de shaders
- Fallback para navegadores sem suporte WebGL 2

**Shaders implementados:**
- Vertex Shader: transformação de posição e cor
- Fragment Shader: interpolação de cores

### WebGPUPanel.vue
**Localização:** `produto/docs/.vitepress/components/WebGPUPanel.vue`

**Funcionalidade:**
- Demo de WebGPU (API moderna)
- Usa WGSL (WebGPU Shading Language)
- Fallback automático se `navigator.gpu` não estiver disponível
- Pipeline de renderização moderna

### BabylonPanel.vue
**Localização:** `produto/docs/.vitepress/components/BabylonPanel.vue`

**Funcionalidade:**
- Integração com Babylon.js engine
- Suporte a WebGL e WebGPU
- Prop `preferWebGPU` para forçar WebGPU quando disponível
- Cena completa com câmera, luzes e objetos

---

## 🎬 Sistema de Animações

### Estrutura das Animações
Localização: `produto/docs/.vitepress/components/animations/`

Cada arquivo de animação exporta duas funções:
```javascript
export function createMesh(THREE, context) {
  // Retorna um objeto THREE.Object3D ou estrutura com {object, update, dispose}
}

export function update(mesh, dt, THREE, context) {
  // Atualiza a animação (opcional)
}

export function dispose(mesh) {
  // Limpa recursos (opcional)
}
```

### Animações Disponíveis

1. **anim_default.js:** Icosaedro rotativo simples (fallback)
2. **anim_camera.js:** Demonstração de câmera
3. **anim_luz.js:** Demonstração de iluminação
4. **anim_modelagem.js:** Conceitos de modelagem
5. **anim_opengl.js:** Pipeline de renderização OpenGL com 4 estágios
6. **anim_rasterizacao.js:** Processo de rasterização
7. **anim_render.js:** Conceito de renderização
8. **anim_threejs.js:** Cena complexa com Three.js
9. **anim_transformacoes.js:** Transformações geométricas
10. **anim_vulkan.js:** Paralelismo com instancing (48 cubos em 3 lanes)
11. **anim_webgpu.js:** Compute shaders e instancing

### Exemplo: anim_opengl.js
```javascript
export function createMesh(THREE) {
  const group = new THREE.Group();
  const stages = [
    { label: "VBO", color: 0x38bdf8 },
    { label: "VS", color: 0x818cf8 },
    { label: "Raster", color: 0xf472b6 },
    { label: "FS", color: 0xfbbf24 }
  ];
  
  // Cria caixas representando estágios do pipeline
  stages.forEach((stage, index) => {
    const box = new THREE.Mesh(
      new THREE.BoxGeometry(0.85, 0.42, 0.85),
      new THREE.MeshStandardMaterial({
        color: stage.color,
        roughness: 0.35,
        metalness: 0.25,
        transparent: true,
        opacity: 0.82
      })
    );
    box.position.y = 1.35 - index * 0.85;
    group.add(box);
  });
  
  // Triângulo que percorre os estágios
  const tri = new THREE.Mesh(
    new THREE.ConeGeometry(0.18, 0.32, 3),
    new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      emissive: 0x38bdf8,
      emissiveIntensity: 0.55
    })
  );
  group.add(tri);
  
  group.userData.tri = tri;
  group.userData.elapsed = 0;
  return group;
}

export function update(mesh, dt) {
  mesh.userData.elapsed += dt;
  const t = mesh.userData.elapsed;
  const y = 1.55 - ((t * 0.55) % 3.2);
  mesh.userData.tri.position.set(Math.sin(t * 1.6) * 0.18, y, 0);
  mesh.userData.tri.rotation.y += dt * 2.4;
  mesh.rotation.y += dt * 0.12;
}
```

---

## ⚙️ Configuração do VitePress

### Arquivo: config.mts
**Localização:** `produto/docs/.vitepress/config.mts`

**Configurações principais:**
```typescript
export default de.+60fineConfig({
  title: 'Render Index',
  description: 'Um site VitePress para indexação de contéudo sobre computação gráfica.',
  
  themeConfig: {
    logo: '/box.svg',
    
    nav: [
      { text: 'Início', link: '/' },
      { text: 'Guia', link: '/guia' },
      { text: 'Notícias', link: '/noticias' }
    ],
    
    sidebar: [
      {
        text: 'Principal',
        items: [
          { text: 'Início', link: '/' },
          { text: 'Guia para iniciantes', link: '/guia' },
          { text: 'Notícias', link: '/noticias' },
          { text: 'API Examples', link: '/api-examples' }
        ]
      },
      {
        text: 'Aprendizado',
        items: [
          { text: 'Glossário', link: '/glossario' },
          { text: 'Material Educativo', link: '/material-educativo' },
          { text: 'Bibliotecas', link: '/bibliotecas' },
          { text: 'Software', link: '/software' },
          { text: 'Conceitos', link: '/conceitos' }
        ]
      },
      {
        text: 'Ferramentas e Tecnologias',
        items: [
          { text: 'OpenGL', link: '/opengl' },
          { text: 'Vulkan', link: '/vulkan' },
          { text: 'Web', link: '/web' },
          { text: 'Blender', link: '/blender' },
          { text: 'Edição de Vídeo', link: '/edicao-de-video' },
          { text: 'Impressão 3D e Modelagem', link: '/impressao-3d-e-modelagem' }
        ]
      }
    ],
    
    socialLinks: [
      { icon: 'github', link: 'https://github.com/etecvav26-3C-07/Portfolio-TCC' }
    ],
    
    lastUpdated: true
  }
})
```

---

## 📄 Páginas do Site

### index.md (Home)
**Layout:** Hero section com features
**Seções:**
- Hero com título "Render Index"
- Botões de ação: Guia para iniciantes, Postagem, Contribuir
- 12 features cards com ícones e links:
  - Software, Glossário, Material Educativo, Bibliotecas
  - Conceitos, Vulkan, OpenGL, Web, Mobile
  - Blender, Edição de Vídeo, Impressão 3D e Modelagem

### web.md (Gráficos Web)
**Conteúdo:**
- WebGL 2 com demo interativa
- WebGPU com demo interativa
- Three.js com cena complexa
- Babylon.js com demos (WebGL e WebGPU)
- Links rápidos para documentação
- Lista de bibliotecas recomendadas

### api-examples.md (Renderização Mobile)
**Conteúdo:**
- Explicação sobre renderização em dispositivos móveis
- Características principais (performance, memória, bateria)
- Tecnologias: WebGL, WebGPU, Three.js, Babylon.js
- Otimizações essenciais com exemplos de código
- Checklist de otimização
- Exemplo completo de app 3D mobile

### blender.md
**Conteúdo:**
- Interface do Blender
- Topbar e menus principais
- Blender Menu, File Menu
- Templates de aplicação
- Explicação detalhada da interface

### opengl.md
**Conteúdo:**
- Introdução ao OpenGL
- Pipeline de renderização
- Exemplos de código
- Links para documentação

### vulkan.md
**Conteúdo:**
- Introdução ao Vulkan
- Comparação com OpenGL
- Arquitetura moderna
- Exemplos de código

### glossario.md
**Conteúdo:**
- Termos técnicos de computação gráfica
- Definições e explicações

### material-educativo.md
**Conteúdo:**
- Canais educativos
- Repositórios
- Cursos online

### bibliotecas.md
**Conteúdo:**
- Bibliotecas para 3D, 2D e renderização
- Links e descrições

### software.md
**Conteúdo:**
- Softwares gratuitos para computação gráfica
- Categorias e descrições

### noticias.md
**Conteúdo:**
- Sistema de notícias RSS
- Feed traduzido de múltiplas fontes
- Atualizações sobre Vulkan, OpenGL, Blender

---

## 🔄 Sistema de Notícias RSS

### Funcionamento
1. O script `rss-conversor.mjs` baixa feeds RSS de fontes externas
2. Usa `google-translate-api-x` para traduzir títulos e conteúdo
3. Gera arquivos JSON com estrutura:
```json
[
  {
    "title": "Título traduzido",
    "link": "URL original",
    "date": "Data da publicação",
    "content": "Conteúdo traduzido"
  }
]
```
4. Arquivos são salvos em `produto/docs/public/`
5. Página `noticias.md` consome esses JSONs

### Arquivos Gerados
- `blender-news.json`: Notícias do blog oficial do Blender
- `opengl-news.json`: Notícias sobre OpenGL (via GamingOnLinux)
- `vulkan-news.json`: Notícias oficiais do Vulkan (Khronos)
- `noticias.json`: Feed consolidado

---

## 🎯 Conceitos e Arquitetura

### Awesome Index
O projeto segue o conceito de "Awesome Index" (popularizado por sindresorhus/awesome):
- Organização de links via arquivos Markdown
- Facilidade de edição e manutenção
- Síntese de informações de forma estruturada
- Comunidade pode contribuir via pull requests

### Arquitetura de Componentes
- **Componentização:** Cada visualização 3D é um componente Vue independente
- **Modularidade:** Animações são módulos JavaScript separados
- **Reutilização:** ThreePanel é genérico e aceita diferentes tópicos
- **Performance:** Otimizações para renderização e memória

### Sistema de Navegação
- Sidebar com 3 categorias principais
- Navegação top com links principais
- Breadcrumbs automáticos do VitePress
- Last updated automático

### Design System
- Cores: Tema escuro com acentos azul/roxo
- Ícones: SVG personalizados em `public/icons/`
- Tipografia: Fonte padrão do VitePress
- Responsivo: Mobile-first design

---

## 👥 Equipe do Projeto

### Grupo 07 - Desenvolvimento de Sistemas 2026
- **Fernando dos Santos Braz**
- **Gustavo Henrique da Silva Alves**
- **Gustavo Müller Santos**

### Instituição
- **Etec Vasco Antonio Venchiarutti**
- **Curso:** Técnico em Desenvolvimento de Sistemas
- **Ano:** 2026

---

## 📊 Materiais de Pesquisa e Documentação

### TCC-2026
- **Relatório:** "Indexação sobre Computação Gráfica"
- **Plano de pesquisa:** Documento de planejamento
- **Apresentação:** Slides em PDF e PowerPoint
- **Resumo:** Objetivos e pontos principais do projeto

### UML-Pesquisa
- **Diagrama de Caso de Uso:** Representa funcionalidades e interações de usuários
- **Diagrama de Classes:** Representa estrutura interna do sistema
- **Documentação UML:** Explicação detalhada sobre UML, seus conceitos e aplicações

### NotebookLM
- **Notas de pesquisa:** Materiais gerados via NotebookLM
- **Fernando Braz:** Notas individuais
- **Gustavo Henrique:** Notas individuais

### B1 (Bimestre 1)
- **Questionário M1:** Questionário do módulo 1

---

## 🔧 Padrões e Convenções

### Código JavaScript/TypeScript
- ES6+ para JavaScript moderno
- TypeScript para configuração do VitePress (.mts)
- Vue 3 Composition API (`<script setup>`)
- Modules para import/export

### Estrutura de Componentes Vue
```vue
<script setup>
// Imports
import { ref, onMounted, onBeforeUnmount } from 'vue'

// Props
const props = defineProps({
  // prop definitions
})

// State
const state = ref(null)

// Lifecycle
onMounted(() => {
  // setup
})

onBeforeUnmount(() => {
  // cleanup
})
</script>

<template>
  <!-- template -->
</template>

<style scoped>
/* scoped styles */
</style>
```

### Nomenclatura
- **Arquivos:** kebab-case (`three-panel.vue`, `rss-conversor.mjs`)
- **Componentes:** PascalCase (`ThreePanel`, `WebGLPanel`)
- **Funções:** camelCase (`createMesh`, `update`)
- **Variáveis:** camelCase (`mesh`, `renderer`, `scene`)

### Git
- Branch principal: `main`
- Commits em português (equipe brasileira)
- Pull requests para revisão

---

## 🚦 Checklist de Desenvolvimento

### Para Adicionar Nova Animação
1. Criar arquivo `anim_[nome].js` em `components/animations/`
2. Implementar `createMesh(THREE, context)`
3. Opcionalmente implementar `update(mesh, dt, THREE, context)`
4. Adicionar prop `topic="[nome]"` em um `<ThreePanel />`
5. Testar em desenvolvimento

### Para Adicionar Nova Página
1. Criar arquivo `.md` em `produto/docs/`
2. Adicionar frontmatter com title, sidebar_label, description
3. Adicionar entrada no `sidebar` em `config.mts`
4. Criar conteúdo em Markdown
5. Testar navegação

### Para Atualizar RSS
1. Editar `rss-conversor.mjs` para adicionar nova fonte
2. Executar `node rss-conversor.mjs`
3. Verificar arquivo JSON gerado em `public/`
4. Atualizar página `noticias.md` se necessário

---

## 🎨 Design e UX

### Cores Principais
- Background: `#0b1220` (azul escuro)
- Acentos: `#38bdf8` (azul claro), `#818cf8` (roxo), `#f472b6` (rosa)
- Texto: `#f8fafc` (branco), `#94a3b8` (cinza claro)

### Tipografia
- Títulos: Sans-serif, peso 600
- Subtítulos: Sans-serif, peso normal, cor cinza
- Código: Monospace

### Espaçamento
- Gap padrão: 14px
- Border radius: 24px para cards/containers
- Padding consistente em componentes

### Animações
- Rotação suave de objetos 3D
- Transições de hover
- Loading states

---

## 📱 Responsividade

### Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

### Otimizações Mobile
- Pixel ratio reduzido (0.75)
- Shadows desabilitados
- Texturas comprimidas
- Limite de FPS (30-60)
- Geometria simplificada

---

## 🔐 Segurança e Boas Práticas

### Não Commitar
- `node_modules/`
- `.vitepress/cache/`
- `.vitepress/dist/`
- Arquivos de ambiente (.env)
- Secrets/keys

### Dependências
- Usar versões estáveis (publicadas há > 7 dias)
- Evitar ranges flutuantes (`latest`, `*`)
- Manter lock files commitados

### Performance
- Lazy loading de componentes
- Code splitting automático do VitePress
- Otimização de imagens
- Minificação automática no build

---

## 🧪 Testes e Validação

### Testes Manuais
- Testar em múltiplos navegadores (Chrome, Firefox, Edge, Safari)
- Verificar responsividade em diferentes tamanhos de tela
- Testar animações em dispositivos móveis
- Validar WebGL/WebGPU support

### Validação
- Markdown lint
- Vue component lint
- TypeScript type checking
- Acessibilidade (WCAG)

---

## 📈 Monitoramento e Analytics

### Métricas Importantes
- FPS em animações
- Tempo de carregamento
- Tamanho de bundle
- Erros de console

### Ferramentas Sugeridas
- Chrome DevTools (Performance, Lighthouse)
- Firefox DevTools
- VitePress analytics integrado

---

## 🚀 Deploy

### Build de Produção
```bash
cd produto
pnpm docs:build
```

### Output
- Diretório: `produto/docs/.vitepress/dist/`
- Arquivos estáticos prontos para deploy
- Pode ser hospedado em:
  - GitHub Pages
  - Netlify
  - Vercel
  - Qualquer servidor estático

### Configuração de Deploy (Exemplo GitHub Pages)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm docs:build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./produto/docs/.vitepress/dist
```

---

## 📚 Recursos Externos e Referências

### Documentação Oficial
- [VitePress](https://vitepress.dev/)
- [Vue.js](https://vuejs.org/)
- [Three.js](https://threejs.org/docs/)
- [WebGL MDN](https://developer.mozilla.org/pt-BR/docs/Web/API/WebGL_API)
- [WebGPU](https://www.w3.org/TR/webgpu/)
- [Babylon.js](https://doc.babylonjs.com/)

### Tutoriais e Aprendizado
- [WebGL Fundamentals](https://webglfundamentals.org/)
- [WebGPU Fundamentals](https://webgpufundamentals.org/)
- [Three.js Examples](https://threejs.org/examples/)
- [Babylon Playground](https://playground.babylonjs.com/)

### Comunidade
- [GitHub](https://github.com/etecvav26-3C-07/Portfolio-TCC)
- [Awesome Lists](https://github.com/sindresorhus/awesome)

---

## 🎯 Roadmap e Futuras Melhorias

### Estrutura ✅
- [x] Criar repositório
- [x] Configurar VitePress
- [x] Criar página inicial
- [x] Criar sistema de navegação
- [ ] Adicionar busca interna
- [x] Sistema de notícias RSS
- [x] Painel custom para animações web
- [x] Histórico das páginas client-side

### Conteúdo 🚧
- [x] Introdução ao Blender
- [ ] Introdução ao OpenGL (em andamento)
- [ ] Introdução ao Vulkan (em andamento)
- [ ] Introdução ao WebGL
- [x] Indexação de Software (com MEGA LINK DUMP estilo FMHY)
- [x] Glossário (com MEGA LINK DUMP estilo FMHY)
- [x] Conceitos (com MEGA LINK DUMP estilo FMHY)
- [x] Bibliotecas (com MEGA LINK DUMP estilo FMHY)
- [x] Material educativo (com MEGA LINK DUMP estilo FMHY)
- [x] Web (com MEGA LINK DUMP estilo FMHY)
- [x] Edição de Vídeo (com MEGA LINK DUMP estilo FMHY)
- [x] Impressão 3D e Modelagem (com MEGA LINK DUMP estilo FMHY)
- [x] Guia para iniciantes (atualizado com links)
- [x] Links quebrados verificados e removidos

### APIs Web 🚧
- [x] Three.js
- [x] WebGL
- [x] WebGPU
- [x] Babylon.js
- [ ] React Three Fiber
- [ ] A-Frame

### Funcionalidades Futuras 🔮
- Busca full-text
- Dark/Light mode toggle
- Internacionalização (i18n)
- Comentários em páginas
- Sistema de contribuição
- API REST para conteúdo
- PWA (Progressive Web App)
- Offline support

---

## 💡 Dicas para Outras IAs Trabalharem Neste Projeto

### 1. Entendendo a Estrutura
- O site VitePress está em `produto/docs/`
- Componentes Vue ficam em `.vitepress/components/`
- Animações são módulos JS em `components/animations/`
- Assets estáticos em `public/`

### 2. Adicionando Conteúdo
- Use Markdown para páginas
- Siga o padrão de frontmatter existente
- Adicione ao sidebar em `config.mts`
- Use componentes Vue para interatividade

### 3. Criando Animações
- Siga o padrão `createMesh(THREE, context)`
- Retorne object ou {object, update, dispose}
- Use `userData` para armazenar estado
- Implemente `update` para animações
- Lembre-se de fazer dispose de recursos

### 4. Estilização
- Use scoped styles em componentes
- Siga o design system existente
- Mantenha consistência de cores
- Teste responsividade

### 5. Performance
- Use instancing para múltiplos objetos
- Limpe recursos no unmount
- Otimize geometrias
- Use texturas comprimidas
- Limite FPS em mobile

### 6. Convenções
- Código em português (interface) ou inglês (técnico)
- Commits em português
- Comentários explicativos
- Seguir padrões existentes

### 7. Debugging
- Use console.log para debug
- Chrome DevTools para performance
- Verifique suporte WebGL/WebGPU
- Teste em múltiplos navegadores

### 8. Testes
- Teste animações em mobile
- Verifique carregamento de assets
- Valide markdown
- Teste navegação

---

## 🆘 Solução de Problemas Comuns

### Three.js não renderiza
- Verifique se o canvas tem tamanho
- Confirme que renderer foi inicializado
- Cheque se há erros no console
- Valide suporte WebGL

### Animação não atualiza
- Verifique se `update` está sendo chamada
- Confirme que `playing` prop é true
- Cheque `pageVisible` state
- Valide `dt` (delta time)

### Build falha
- Limpe cache: `rm -rf .vitepress/cache`
- Reinstale dependências: `pnpm install`
- Verifique TypeScript errors
- Confirme todos imports

### RSS não atualiza
- Verifique API key do translate
- Confirme URLs RSS estão acessíveis
- Cheque permissões de escrita em `public/`
- Valide JSON output

---

## 📞 Contato e Suporte

### Repositório
https://github.com/etecvav26-3C-07/Portfolio-TCC

### Issues
Reportar bugs via GitHub Issues

### Documentação
Esta documentação + README.md + arquivos de pesquisa

---

## 📝 Licença

Projeto educacional para TCC - Etec Vasco Antonio Venchiarutti  
Conteúdo pode ser usado para fins educacionais com devida atribuição.

---

## 🎓 Contexto Educacional

Este projeto foi desenvolvido como Trabalho de Conclusão de Curso (TCC) para o curso Técnico em Desenvolvimento de Sistemas da Etec Vasco Antonio Venchiarutti, turma de 2026. O objetivo é criar um recurso educacional que facilite o aprendizado de computação gráfica e renderização 3D para estudantes e entusiastas.

O projeto demonstra a aplicação prática de conceitos de:
- Desenvolvimento web moderno
- Computação gráfica
- Design de interfaces
- Documentação técnica
- Trabalho em equipe
- Pesquisa e síntese de informações

---

## 🏆 Conclusão

O Render Index é um projeto educacional completo que combina:
- Documentação técnica estruturada
- Demonstrações interativas 3D
- Sistema de notícias automatizado
- Design responsivo e moderno
- Arquitetura de componentes escalável

Esta documentação serve como guia completo para qualquer IA ou desenvolvedor que deseje entender, contribuir ou estender este projeto. O código é bem estruturado, seguindo melhores práticas de desenvolvimento web moderno, e está pronto para evolução contínua.