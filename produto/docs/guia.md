
---

<script setup>
import CanvasPanel from "./.vitepress/components/CanvasPanel.vue";
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
import sketchModelagem from "./.vitepress/components/animations/canvas_modelagem.js";
import sketchTransformacoes from "./.vitepress/components/animations/canvas_transformacoes.js";
import sketchCamera from "./.vitepress/components/animations/canvas_camera.js";
import sketchIluminacao from "./.vitepress/components/animations/canvas_iluminacao.js";
import sketchRasterizacao from "./.vitepress/components/animations/canvas_rasterizacao.js";
import sketchRaytracing from "./.vitepress/components/animations/canvas_raytracing.js";
import sketchShaders from "./.vitepress/components/animations/canvas_shaders.js";
import sketchTextura from "./.vitepress/components/animations/canvas_texturas.js";
import sketchPbr from "./.vitepress/components/animations/canvas_pbr.js";
import sketchRender from "./.vitepress/components/animations/canvas_render.js";
</script>

# Guia para iniciantes

## Computação Gráfica

> Computação Gráfica é o conjunto de técnicas usadas para criar, manipular e exibir imagens por computador. Ela combina matemática, geometria, luz e processamento de imagem para gerar visuais em 2D e 3D.

A seguir, você encontra os conceitos fundamentais organizados de forma híbrida: cada tópico combina um **modelo tridimensional interativo (Three.js)** para exploração espacial e um **diagrama didático vetorial (Canvas 2D)** com notação matemática e decomposição de etapas estilo 3Blue1Brown.

## Animações por conceito

### Modelagem

Modelagem é a etapa de construção das formas. Aqui você transforma pontos e polígonos em estruturas tridimensionais. Compare o modelo espacial navegável abaixo com o diagrama do ciclo de montagem geométrica.

<ThreePanel topic="modelagem" title="Modelo 3D Interativo" subtitle="Arraste com o ponteiro para orbitar. Clique no botão de malha para alternar o modo wireframe." />

<CanvasPanel :sketch="sketchModelagem" title="Diagrama Didático 2D: Construção Geométrica" subtitle="Ciclo em 3 etapas: Vértices (X, Y, Z) → Arestas topológicas → Faces poligonais." />

### Transformações

Transformações mudam a posição, a rotação e a escala dos objetos dentro da cena. O modelo 3D mostra a evolução no espaço tridimensional, enquanto o diagrama didático 2D detalha a aplicação dos operadores lineares.

<ThreePanel topic="transformacoes" title="Transformações 3D no Espaço" subtitle="Cubo tridimensional animado sob eixos cartesianos com translação, rotação e escala contínuas." />

<CanvasPanel :sketch="sketchTransformacoes" title="Diagrama Didático 2D: Álgebra Linear" subtitle="Composição de operadores lineares no plano: Translação T, Rotação R(θ) e Escala S." />

### Câmera

A câmera determina o olhar do observador. Ela controla o enquadramento, a profundidade e a perspectiva. O painel 3D permite observar o frustum externamente, e o diagrama 2D expõe os planos geométricos que delimitam o volume visível.

<ThreePanel topic="camera" title="Câmera Virtual e Frustum 3D" subtitle="Pirâmide de visão perspectiva em arame apontando para o objeto focal no espaço 3D." />

<CanvasPanel :sketch="sketchCamera" title="Diagrama Didático 2D: Geometria Projetiva" subtitle="Planos de corte Near e Far, abertura angular FOV e linhas projetivas de perspectiva." />

### Iluminação

A iluminação dá vida à cena. A luz define a cor, o brilho e as sombras do objeto. No painel 3D você observa o realce especular e sombreamento contínuo em tempo real; no diagrama 2D, acompanha a álgebra vetorial envolvida.

<ThreePanel topic="luz" title="Interação de Luz e Sombreamento 3D" subtitle="Fonte pontual em órbita gerando realce especular e gradiente difuso em tempo real." />

<CanvasPanel :sketch="sketchIluminacao" title="Diagrama Didático 2D: Modelo Phong / Lambert" subtitle="Vetores matemáticos de iluminação: normal de superfície N, luz incidente L, reflexão R e visão V." />

### Rasterização

Rasterização é o processo de projetar primitivas geométricas contínuas em fragmentos e pixels na tela do monitor. Compare a varredura da scanline na grade tridimensional com a lógica de discretização no diagrama 2D.

<ThreePanel topic="rasterizacao" title="Rasterização de Hardware 3D" subtitle="Varredura de scanline sobre triângulo contínuo e discretização em fragmentos de pixel na GPU." />

<CanvasPanel :sketch="sketchRasterizacao" title="Diagrama Didático 2D: Rasterização de Primitivas" subtitle="Discretização de primitivas: teste de centro de fragmento dentro de triângulos na grade de pixels." />

### Ray Tracing

Ray Tracing simula o caminho óptico real da luz. Em vez de projetar polígonos na tela, raios partem da câmera, colidem com a geometria e rebatem gerando reflexões, refrações e sombras fisicamente precisas.

<ThreePanel topic="raytracing" title="Óptica de Ray Tracing 3D" subtitle="Esferas reflexivas com emissor direcional disparando raios virtuais com rebatimento físico no chão." />

<CanvasPanel :sketch="sketchRaytracing" title="Diagrama Didático 2D: Traçado de Raios e BVH" subtitle="Raios primários da câmera, intersecção com caixas delimitadoras BVH AABB e raios de sombra." />

### Shaders

Shaders são pequenos códigos em linguagens como GLSL, HLSL ou WGSL executados massivamente em paralelo na placa de vídeo para dar forma, movimento e texturas à cena.

<ThreePanel topic="shaders" title="Shader 3D em Tempo Real" subtitle="Torus knot com deformação senoidal de vértices e coloração dinâmica calculada na GPU." />

<CanvasPanel :sketch="sketchShaders" title="Diagrama Didático 2D: Pipeline Programável" subtitle="Trânsito de dados pelos estágios de execução: Vertex Shader → Rasterizador → Fragment Shader." />

### Mapeamento de Texturas (UV)

Texturização aplica mapas de imagem sobre modelos tridimensionais utilizando o sistema de coordenadas normalizado UV (eixos horizontais e verticais da imagem).

<ThreePanel topic="textura" title="Mapeamento UV 3D na Superfície" subtitle="Cubo 3D com textura procedural em coordenadas UV e plano de desdobramento planificado ao lado." />

<CanvasPanel :sketch="sketchTextura" title="Diagrama Didático 2D: Espaço de Textura UV" subtitle="Amostragem bilinear projetando coordenadas normalizadas [0, 1] diretamente sobre as faces." />

### Materiais PBR

PBR (Physically Based Rendering) unifica como superfícies respondem à iluminação, permitindo que o mesmo material pareça consistente sob qualquer condição de luz.

<ThreePanel topic="pbr" title="Matriz 3D de Esferas PBR" subtitle="Matriz 3x3 comparando rugosidade (roughness) e metalicidade (metalness) sob luz em movimento." />

<CanvasPanel :sketch="sketchPbr" title="Diagrama Didático 2D: Teoria Microfacetária PBR" subtitle="Reflexão física da luz: espalhamento difuso em superfícies rugosas vs reflexão especular em metais." />

### Renderização

Renderização é a geração final da imagem visível. Ela integra geometria, luz, material e câmera para produzir o resultado final exibido.

<ThreePanel topic="render" title="Cena 3D Renderizada Completa" subtitle="Composição integrada: geometria, iluminação multi-fonte, materiais PBR e enquadramento de câmera." />

<CanvasPanel :sketch="sketchRender" title="Diagrama Didático 2D: Síntese de Imagem" subtitle="Convergência de geometria, materiais, iluminação e câmera até a geração do buffer de exibição." />

## Como usar este guia

1. Leia cada conceito antes de observar a animação.
2. Compare os painéis para entender a sequência de criação de uma cena.
3. Use as descrições para relacionar cada etapa ao processo real de computação gráfica.

## Fluxo de trabalho em computação gráfica

- **Modelagem** cria a geometria base.
- **Transformações** posicionam e animam os objetos.
- **Câmera** define o ponto de vista e a proporção do quadro.
- **Iluminação** traz realismo e profundidade.
- **Texturização & Shaders** dão identidade visual e propriedades aos materiais.
- **Rasterização / Ray Tracing** calcula a visibilidade dos objetos na tela.
- **Renderização** entrega a imagem final pronta para visualização.

## Index e lista Awesome

Uma boa página de referência organiza recursos importantes em um índice e em listas "awesome". Nesta documentação, os links são agrupados por tema e por importância para facilitar a navegação.

- **Índice**: lista de tópicos e páginas principais.
- **Awesome**: seleção de conteúdos recomendados, como tutoriais, ferramentas e exemplos.

## Indicadores visuais e categorização

Os ícones padronizados ajudam a distinguir o tipo de conteúdo e a facilitar a leitura técnica:

- ✅ Destaque ou recurso recomendado.
- ⚙️ Ferramentas, bibliotecas e configurações técnicas.
- ⚙️ Mega Link Dumps e índices aprofundados.

## Instalação limpa de softwares no Windows

Para um ambiente de desenvolvimento organizado no Windows, prefira instaladores de pacotes que garantem atualizações e removem dependências automaticamente.

### Instaladores principais

- **Winget**: gerenciador de pacotes oficial da Microsoft — / [Docs](https://docs.microsoft.com/windows/package-manager/winget/) / [GitHub](https://github.com/microsoft/winget-cli) / [Community](https://github.com/microsoft/winget-pkgs) / [YouTube](https://www.youtube.com/results?search_query=winget) / [Twitter](https://twitter.com/Microsoft)
- **Chocolatey**: gerenciador de pacotes popular para ferramentas de desenvolvimento — / [Docs](https://docs.chocolatey.org/) / [GitHub](https://github.com/chocolatey/choco) / [Community](https://community.chocolatey.org/) / [YouTube](https://www.youtube.com/results?search_query=chocolatey) / [Twitter](https://twitter.com/chocolateynuget)

Esses instaladores ajudam a instalar programas de forma limpa, sem precisar buscar arquivos de instalação manualmente.

### Usando Winget

Winget é o gerenciador de pacotes nativo do Windows. Abre o PowerShell ou CMD e execute:

```bash
# Procurar um programa
winget search nodejs

# Instalar um programa
winget install OpenJS.NodeJS

# Listar programas instalados
winget list

# Atualizar um programa
winget upgrade OpenJS.NodeJS

# Desinstalar um programa
winget uninstall OpenJS.NodeJS
```

### Usando Chocolatey

Chocolatey oferece um repositório amplo de programas. Instale o Chocolatey primeiro (como administrador):

```bash
# No PowerShell (como administrador)
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
```

Depois, use Chocolatey para instalar programas:

```bash
# Procurar um programa
choco search nodejs

# Instalar um programa
choco install nodejs

# Listar programas instalados
choco list

# Atualizar um programa
choco upgrade nodejs

# Desinstalar um programa
choco uninstall nodejs
```

### Exemplos de instalação de ferramentas comuns

```bash
# Node.js e npm
winget install OpenJS.NodeJS
# ou
choco install nodejs

# Git
winget install Git.Git
# ou
choco install git

# Visual Studio Code
winget install Microsoft.VisualStudioCode
# ou
choco install vscode

# Blender
winget install BlenderFoundation.Blender
# ou
choco install blender

# FFmpeg (para edição de vídeo)
choco install ffmpeg
```

## Usando um instalador de pacotes

Instaladores de pacotes são essenciais para instalar bibliotecas e ferramentas de forma rápida e consistente no seu projeto.

### npm (Node Package Manager)

npm é o gerenciador padrão do Node.js. Vem incluído ao instalar Node.js.

```bash
# Iniciar um novo projeto
npm init -y

# Instalar uma dependência de desenvolvimento
npm install --save-dev vitepress

# Instalar uma dependência de produção
npm install three

# Instalar uma versão específica
npm install three@r128

# Listar pacotes instalados
npm list

# Atualizar um pacote
npm update three

# Remover um pacote
npm uninstall three
```

### Arquivo `package.json`

Seu projeto tem um `package.json` que lista todas as dependências:

```json
{
  "name": "meu-projeto",
  "version": "1.0.0",
  "description": "Projeto com VitePress e Three.js",
  "type": "module",
  "scripts": {
    "dev": "vitepress dev docs",
    "build": "vitepress build docs",
    "preview": "vitepress preview docs"
  },
  "dependencies": {
    "three": "^r128"
  },
  "devDependencies": {
    "vitepress": "^1.0.0"
  }
}
```

Para instalar todos os pacotes listados:

```bash
npm install
```

### pnpm (Performant npm)

pnpm é uma alternativa otimizada ao npm com uso eficiente de espaço e cache.

```bash
# Instalar pnpm globalmente
npm install -g pnpm

# Iniciar um novo projeto
pnpm init

# Instalar uma dependência
pnpm add three

# Instalar uma dependência de desenvolvimento
pnpm add -D vitepress

# Instalar todas as dependências
pnpm install

# Listar pacotes
pnpm list

# Atualizar um pacote
pnpm update three

# Remover um pacote
pnpm remove three
```

### Arquivo `pnpm-workspace.yaml`

Para projetos monorepo, use `pnpm-workspace.yaml`:

```yaml
packages:
  - 'docs'
  - 'packages/*'
```

### Comparação: npm vs pnpm

| Comando | npm | pnpm |
|---------|-----|------|
| Instalar dependência | `npm install three` | `pnpm add three` |
| Instalar dev | `npm install --save-dev vitepress` | `pnpm add -D vitepress` |
| Instalar tudo | `npm install` | `pnpm install` |
| Atualizar pacote | `npm update three` | `pnpm update three` |
| Remover pacote | `npm uninstall three` | `pnpm remove three` |

Essas ferramentas facilitam a instalação de dependências para projetos web, bibliotecas 3D e documentação.

## Roteiro prático de setup

### 1. Instalar Node.js e npm/pnpm

```bash
# Windows - com Winget
winget install OpenJS.NodeJS

# Verificar versão
node --version
npm --version

# Instalar pnpm (opcional)
npm install -g pnpm
```

### 2. Clonar o repositório

```bash
git clone https://github.com/etecvav26-3C-07/Portfolio-TCC.git
cd Portfolio-TCC/produto
```

### 3. Instalar dependências do projeto

```bash
# Com npm
npm install

# Ou com pnpm
pnpm install
```

### 4. Iniciar o servidor de desenvolvimento

```bash
# Com npm
npm run docs:dev

# Ou com pnpm
pnpm docs:dev
```

### 5. Acessar no navegador

Abra `http://localhost:5173` no seu navegador.

### 6. Compilar para produção

```bash
# Com npm
npm run build

# Ou com pnpm
pnpm build
```


## Próximos passos

Depois de estudar este guia, explore outras páginas do site para aprofundar suas habilidades:

- **Conceitos**: teoria de computação gráfica.
- **Blender**: modelagem e animação prática.
- **OpenGL** e **Vulkan**: APIs de renderização.
- **Material Educativo**: tutoriais e cursos.
