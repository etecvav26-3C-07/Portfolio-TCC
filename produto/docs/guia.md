
---

<script setup>
import ThreePanel from "./.vitepress/components/ThreePanel.vue";
</script>

# Guia para iniciantes

## Computação Gráfica

> Computação Gráfica é o conjunto de técnicas usadas para criar, manipular e exibir imagens por computador. Ela combina matemática, geometria, luz e processamento de imagem para gerar visuais em 2D e 3D.

A seguir, você encontra seis conceitos fundamentais acompanhados por animações que ajudam a entender cada etapa de uma cena gráfica.

## Animações por conceito

### Modelagem
<ThreePanel topic="modelagem" title="Modelagem" subtitle="Criação de objetos 3D como formas, personagens e cenários." />

Modelagem é a etapa de construção das formas. Aqui você transforma pontos e polígonos em estruturas tridimensionais. O painel mostra um objeto simples que representa como uma malha pode ser formada a partir de geometria.

### Transformações
<ThreePanel topic="transformacoes" title="Transformações" subtitle="Movimentação, rotação e escala dos objetos." />

Transformações mudam a posição, a rotação e a escala dos objetos dentro da cena. Este painel utiliza movimento contínuo para mostrar como um objeto se comporta em um espaço 3D.

### Câmera
<ThreePanel topic="camera" title="Câmera" subtitle="Define o ponto de vista e a proporção da cena." />

A câmera determina o olhar do observador. Ela controla o enquadramento, a profundidade e a perspectiva. A animação representa a posição e o campo de visão utilizados para visualizar a cena.

### Iluminação
<ThreePanel topic="luz" title="Iluminação" subtitle="Simula luz, sombras e sua interação com materiais." />

A iluminação dá vida à cena. A luz define a cor, o brilho e as sombras do objeto. A animação mostra como a luz e o material do objeto interagem para criar volumes e contrastes.

### Rasterização
<ThreePanel topic="rasterizacao" title="Rasterização" subtitle="Conversão de primitivas em pixels na tela." />

Rasterização é o processo de projetar triângulos e superfícies em pixels. Ela transforma a informação geométrica em uma imagem que pode ser exibida no monitor.

### Ray Tracing
<ThreePanel topic="raytracing" title="Ray Tracing" subtitle="Disparo de raios de luz virtuais com cálculo de rebatimentos e reflexões físicas." />

Ray Tracing simula o caminho óptico real da luz. Em vez de projetar polígonos na tela, raios partem da câmera, colidem com a geometria e rebatem gerando reflexões, refrações e sombras precisas.

### Shaders
<ThreePanel topic="shaders" title="Shaders" subtitle="Programação direta nos núcleos da GPU: transformações de vértices e cálculo de cores por pixel." />

Shaders são pequenos códigos em linguagens como GLSL, HLSL ou WGSL executados massivamente em paralelo na placa de vídeo para dar forma, movimento e texturas à cena.

### Mapeamento de Texturas (UV)
<ThreePanel topic="textura" title="Texturas e Coordenadas UV" subtitle="Amostragem de imagens 2D projetadas sobre superfícies poligonais 3D." />

Texturização aplica mapas de imagem sobre modelos tridimensionais utilizando o sistema de coordenadas normalizado UV (eixos horizontais e verticais da imagem).

### Materiais PBR
<ThreePanel topic="pbr" title="Materiais PBR" subtitle="Simulação óptica fisicamente correta variando Rugosidade e Metalicidade." />

PBR (Physically Based Rendering) unifica como superfícies respondem à iluminação, permitindo que o mesmo material pareça consistente sob qualquer condição de luz.

### Renderização
<ThreePanel topic="render" title="Renderização" subtitle="Geração da imagem final a partir da cena." />

Renderização é a geração final da imagem visível. Ela integra geometria, luz, material e câmera para produzir o resultado final.

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

## Emojis de categorização

Os emojis ajudam a distinguir o tipo de conteúdo e a facilitar a leitura:

- :star: destaque ou recurso recomendado.
- :goat: melhores práticas ou projetos de referência.
- :link: links externos e referências adicionais.

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
