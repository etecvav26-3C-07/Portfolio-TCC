---
title: Guia para iniciantes
sidebar_label: Guia
description: Introdução aos principais conceitos e ferramentas da computação gráfica.
outline: deep
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
- **Rasterização** prepara a imagem para o dispositivo final.
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

- **Winget**: gerenciador de pacotes oficial da Microsoft.
- **Chocolatey**: gerenciador de pacotes popular para ferramentas de desenvolvimento.

Esses instaladores ajudam a instalar programas de forma limpa, sem precisar baixar arquivos manualmente.

### Como instalar programas no Windows com Winget

Abra o PowerShell ou o Prompt de Comando como administrador e execute:

```powershell
winget install --id Microsoft.VisualStudioCode -e
winget install --id Git.Git -e
winget install --id BlenderFoundation.Blender -e
```

### Como instalar programas no Windows com Chocolatey

Abra o PowerShell como administrador e execute:

```powershell
Set-ExecutionPolicy Bypass -Scope Process -Force
[System.Net.ServicePointManager]::SecurityProtocol = [System.Net.SecurityProtocolType]::Tls12
iex ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))

choco install -y vscode git blender
```

## Usando um instalador de pacotes para projetos web

Instaladores de pacotes são essenciais para baixar bibliotecas, dependências e ferramentas de desenvolvimento.

### Instalar o Node.js e npm

No Windows, baixe o instalador em:

```text
https://nodejs.org/
```

Depois de instalar, verifique as versões:

```bash
node --version
npm --version
```

### Instalar pnpm

Com npm instalado, execute:

```bash
npm install -g pnpm
```

### Usar npm para instalar dependências

No diretório do projeto:

```bash
npm install
```

### Usar pnpm para instalar dependências

No diretório do projeto:

```bash
pnpm install
```

### Instalar pacotes específicos com npm ou pnpm

```bash
npm install three vitepress
pnpm add three vitepress
```

Essas ferramentas facilitam a instalação de dependências para projetos web, bibliotecas 3D e documentação.

## Próximos passos

Depois de estudar este guia, explore outras páginas do site para aprofundar suas habilidades:

- **Conceitos**: teoria de computação gráfica.
- **Blender**: modelagem e animação prática.
- **OpenGL** e **Vulkan**: APIs de renderização.
- **Material Educativo**: tutoriais e cursos.
