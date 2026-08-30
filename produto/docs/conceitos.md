---
title: Conceitos de Computação Gráfica
sidebar_label: Conceitos
description: Conceitos fundamentais de computação gráfica e renderização, com visualizações 3D.
---

<script setup>
import ConceptCarousel from "./.vitepress/components/ConceptCarousel.vue";

const concepts = [
  {
    id: "modelagem",
    topic: "modelagem",
    title: "Modelagem",
    text: "A modelagem constrói a forma a partir de vértices, arestas e faces. O que você vê como um objeto 3D começa como uma malha: pontos no espaço ligados em polígonos. A visualização destaca essa estrutura — o sólido e o wireframe ao mesmo tempo."
  },
  {
    id: "transformacoes",
    topic: "transformacoes",
    title: "Transformações",
    text: "Depois de existir, o objeto precisa ser colocado na cena. Translação move, rotação orienta e escala muda o tamanho. Essas três operações, combinadas em matrizes, são o vocabulário básico de qualquer pipeline gráfico."
  },
  {
    id: "camera",
    topic: "camera",
    title: "Câmera",
    text: "A câmera não é o objeto da cena: é o ponto de vista. Posição, direção e campo de visão definem o que entra no quadro e como a perspectiva comprime a profundidade. O cone representa o frustum — o volume que a câmera realmente “enxerga”."
  },
  {
    id: "luz",
    topic: "luz",
    title: "Iluminação",
    text: "Sem luz, a malha é só geometria. Uma fonte pontual percorre a cena para mostrar como o brilho e a sombra mudam com a posição da luz. Materiais reagem a isso: rugosidade, metalicidade e cor determinam o aspecto da superfície."
  },
  {
    id: "rasterizacao",
    topic: "rasterizacao",
    title: "Rasterização",
    text: "A GPU projeta triângulos no plano da tela e preenche os pixels cobertos por cada face. A grade lembra esse passo: o contínuo 3D vira uma imagem discreta. É o caminho rápido usado na maioria dos jogos e interfaces em tempo real."
  },
  {
    id: "render",
    topic: "render",
    title: "Renderização",
    text: "Renderizar é juntar geometria, transformações, câmera, materiais e luz numa imagem final. O sombreamento contínuo desta cena é o resultado visível desse processo — o quadro que chega ao monitor."
  }
];
</script>

# Conceitos de Computação Gráfica

Seis ideias que se repetem em modelagem, jogos, filmes e APIs como OpenGL ou Vulkan. Use as setas, os pontos, o teclado (`←` `→`) ou o gesto de arrastar para folhear. Cada slide traz um texto curto e uma animação Three.js do mesmo conceito.

<ConceptCarousel :concepts="concepts" />
