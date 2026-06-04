# 🎨 Glossário de Computação Gráfica

> Um glossáriOno estilo do FMHY/Piracy Glossary, foca*o nos conceitos mais importantes da Computação Gráfica, Renderização, Modelagem 3D, Engines de Jogos, OpenGL, Vulkan, DirectX, Blender, Unreal Engine e Graphics Programming.

---

# ⭐ Conceitos Fundamentais

| Termo | Descrição |
|---------|---------|
| Rasterização | Processo que transforma objetos matemáticos (triângulos, linhas e polígonos) em pixels visíveis na tela. É a técnica usada pela maioria dos jogos modernos devido à sua velocidade. |
| Renderização | Processo completo de gerar uma imagem final a partir de uma cena 3D contendo objetos, materiais, luzes e câmeras. |
| Pipeline Gráfico | Sequência de etapas utilizadas pela GPU para transformar modelos 3D em pixels visíveis. Inclui Vertex Shader, Rasterização, Fragment Shader e Pós-processamento. |
| GPU | Unidade de Processamento Gráfico. Hardware especializado em executar milhões de cálculos paralelos necessários para renderização. |
| CPU | Processador principal do computador responsável pela lógica, física, IA e envio de comandos para a GPU. |
| Frame | Uma única imagem exibida na tela. Um jogo a 60 FPS gera 60 frames por segundo. |
| FPS | Frames por Segundo. Mede quantas imagens completas são renderizadas a cada segundo. |
| Latência | Tempo entre uma ação do usuário e sua visualização na tela. |
| Tempo de Frame | Tempo necessário para renderizar um único frame. Quanto menor, melhor. |

---

# ⭐ Espaços de Coordenadas

| Termo | Descrição |
|---------|---------|
| Model Space | Sistema de coordenadas local de um objeto. O modelo existe inicialmente nesse espaço. |
| World Space | Sistema de coordenadas global da cena onde todos os objetos são posicionados. |
| View Space | Espaço relativo à câmera. Após a transformação da câmera, tudo é calculado nesse sistema. |
| Clip Space | Espaço utilizado antes do recorte da geometria fora da câmera. |
| NDC | Normalized Device Coordinates. Sistema padronizado usado antes da conversão para pixels da tela. |
| Screen Space | Coordenadas finais em pixels na tela. |
| UV Space | Espaço bidimensional usado para mapear texturas em modelos 3D. |

---

# ⭐ Geometria

| Termo | Descrição |
|---------|---------|
| Vértice | Ponto individual que compõe um objeto 3D. |
| Aresta | Linha que conecta dois vértices. |
| Face | Superfície formada por três ou mais vértices. |
| Triângulo | Unidade fundamental da renderização moderna. Quase toda geometria é convertida para triângulos. |
| Polygon Mesh | Estrutura composta por vértices, arestas e faces formando um modelo 3D. |
| Primitive | Forma geométrica básica processada pela GPU (triângulo, linha ou ponto). |
| Wireframe | Visualização mostrando apenas as arestas do modelo. |
| Tessellation | Processo de subdividir uma malha para aumentar sua complexidade. |
| Point Cloud | Conjunto de pontos sem faces ou arestas conectando-os. |
| Voxel | Equivalente tridimensional de um pixel. |

---

# ⭐ Matrizes e Vetores

| Termo | Descrição |
|---------|---------|
| Vetor | Estrutura matemática usada para representar posição, direção ou velocidade. |
| Vetor Unitário | Vetor com comprimento exatamente igual a 1. |
| Vetor Normal | Vetor perpendicular a uma superfície. Fundamental para iluminação. |
| Matriz | Estrutura matemática usada para realizar transformações geométricas. |
| Matriz 4x4 | Tipo mais comum utilizado para mover, girar e escalar objetos 3D. |
| Quaternion | Representação matemática de rotações que evita problemas dos ângulos de Euler. |
| Homogeneous Coordinates | Sistema que adiciona uma quarta coordenada (W) para facilitar transformações. |

---

# ⭐ Transformações

| Termo | Descrição |
|---------|---------|
| Translation | Movimento de um objeto de uma posição para outra. |
| Rotation | Rotação de um objeto em torno de um eixo. |
| Scaling | Alteração do tamanho do objeto. |
| Transform Matrix | Matriz que combina posição, rotação e escala. |
| View Matrix | Matriz responsável por posicionar a câmera. |
| Projection Matrix | Matriz responsável por criar perspectiva. |

---

# ⭐ Texturas

| Termo | Descrição |
|---------|---------|
| Texture | Imagem aplicada sobre um modelo para adicionar detalhes visuais. |
| Texture Map | Arquivo contendo os dados da textura. |
| Texel | Pixel individual de uma textura. |
| UV Mapping | Processo de associar partes de uma textura à superfície de um modelo. |
| UV Unwrapping | Processo de "abrir" um modelo 3D em 2D para texturização. |
| Texture Sampling | Leitura de texels pela GPU durante a renderização. |
| Texture Filtering | Técnicas que suavizam a aparência das texturas. |
| Texture Cache | Memória rápida da GPU para armazenar texels frequentemente utilizados. |
| Procedural Texture | Textura gerada matematicamente sem imagem pré-existente. |
| Volume Texture | Textura tridimensional contendo dados em volume. |

---

# ⭐ Filtros de Textura

| Termo | Descrição |
|---------|---------|
| Nearest Neighbor | Usa apenas o texel mais próximo. Produz aparência pixelada. |
| Bilinear Filtering | Interpola quatro texels vizinhos para suavizar a imagem. |
| Trilinear Filtering | Interpola entre diferentes níveis de mipmaps. |
| Anisotropic Filtering | Mantém nitidez em superfícies vistas em ângulos inclinados. |
| Mipmap | Conjunto de versões reduzidas da mesma textura para evitar serrilhados. |

---

# ⭐ Iluminação

| Termo | Descrição |
|---------|---------|
| Lighting | Simulação do comportamento da luz em uma cena. |
| Ambient Light | Luz ambiente uniforme presente em toda a cena. |
| Diffuse Lighting | Luz refletida igualmente em todas as direções. |
| Specular Lighting | Reflexo brilhante dependente da posição do observador. |
| Global Illumination | Simulação das múltiplas reflexões de luz entre objetos. |
| Indirect Lighting | Luz que chega após refletir em outras superfícies. |
| Light Probe | Objeto usado para capturar informações de iluminação. |
| Shadow Mapping | Técnica para gerar sombras usando mapas de profundidade. |
| Shadow Map | Textura contendo profundidades vistas pela luz. |
| Shadow Volume | Técnica alternativa para criação de sombras. |
| HDR | Técnica que permite representar intensidades luminosas muito superiores às imagens tradicionais. |

---

# ⭐ Materiais e PBR

| Termo | Descrição |
|---------|---------|
| Material | Conjunto de propriedades que define como uma superfície reage à luz. |
| PBR | Physically Based Rendering. Modelo moderno baseado em propriedades físicas reais dos materiais. |
| Albedo | Cor base do material sem influência da iluminação. |
| Roughness | Define o quão rugosa ou lisa uma superfície é. |
| Metallic | Determina se um material se comporta como metal ou não. |
| Normal Map | Textura que simula pequenos detalhes sem aumentar geometria. |
| Bump Map | Mapa de altura usado para criar ilusões de relevo. |
| Displacement Map | Move fisicamente os vértices para criar relevo real. |
| Ambient Occlusion (AO) | Aproxima regiões onde a luz ambiente é bloqueada. |
| BRDF | Modelo matemático que descreve como uma superfície reflete luz. |
| Fresnel | Fenômeno em que reflexos aumentam quando observados em ângulos rasantes. |

---

# ⭐ Shaders

| Termo | Descrição |
|---------|---------|
| Shader | Programa executado diretamente na GPU. |
| Vertex Shader | Processa vértices individualmente. |
| Fragment Shader | Calcula a cor final dos pixels. |
| Geometry Shader | Pode criar ou modificar geometria durante a renderização. |
| Compute Shader | Shader voltado para computação geral na GPU. |
| Tessellation Shader | Controla subdivisões automáticas da malha. |
| Shader Language | Linguagem usada para escrever shaders, como GLSL ou HLSL. |

---

# ⭐ Técnicas de Renderização

| Termo | Descrição |
|---------|---------|
| Forward Rendering | Método tradicional onde iluminação é calculada durante a renderização dos objetos. |
| Deferred Rendering | Renderização em múltiplas etapas, permitindo centenas de luzes eficientes. |
| Ray Casting | Técnica que lança raios sem simular reflexões complexas. |
| Ray Tracing | Simulação física dos caminhos da luz usando raios. |
| Path Tracing | Forma avançada de Ray Tracing usada em renderização realista. |
| Cone Tracing | Variante que utiliza cones para aproximar múltiplos raios. |
| Beam Tracing | Variante que utiliza feixes ao invés de raios individuais. |
| Offline Rendering | Renderização sem restrição de tempo. |
| Real-Time Rendering | Renderização em tempo real para jogos e aplicações interativas. |

---

# ⭐ Otimizações

| Termo | Descrição |
|---------|---------|
| Culling | Remoção de objetos que não precisam ser renderizados. |
| Frustum Culling | Remove objetos fora da visão da câmera. |
| Backface Culling | Remove faces voltadas para longe da câmera. |
| Occlusion Culling | Remove objetos escondidos atrás de outros. |
| LOD | Uso de versões simplificadas de objetos distantes. |
| Instancing | Renderização de múltiplas cópias usando a mesma geometria. |
| Batch Rendering | Agrupamento de múltiplos objetos em poucas chamadas para GPU. |
| Draw Call | Comando enviado pela CPU para renderizar algo. |
| State Change | Alteração de configurações da GPU que pode gerar perda de desempenho. |
| Baking | Pré-cálculo de informações pesadas para uso posterior. |

---

# ⭐ Buffers

| Termo | Descrição |
|---------|---------|
| Framebuffer | Memória onde a imagem renderizada é armazenada. |
| Color Buffer | Armazena as cores dos pixels. |
| Depth Buffer | Armazena profundidades para determinar o que está visível. |
| Z Buffer | Implementação mais comum do Depth Buffer. |
| Stencil Buffer | Buffer auxiliar usado para máscaras e efeitos especiais. |
| Vertex Buffer | Armazena dados dos vértices. |
| Index Buffer | Armazena conexões entre vértices. |
| Command Buffer | Lista de comandos enviada à GPU. |
| G-Buffer | Conjunto de buffers utilizado em Deferred Rendering. |

---

# ⭐ APIs Gráficas

| Termo | Descrição |
|---------|---------|
| OpenGL | API gráfica multiplataforma extremamente popular. |
| Vulkan | API moderna de baixo nível focada em desempenho. |
| Direct3D | API gráfica da Microsoft usada no Windows e Xbox. |
| Metal | API gráfica da Apple. |
| WebGL | Versão do OpenGL executada em navegadores. |
| WebGPU | Nova API gráfica para navegadores baseada em conceitos modernos. |

---

# ⭐ Pós-processamento

| Termo | Descrição |
|---------|---------|
| Post Processing | Efeitos aplicados após a renderização principal. |
| Bloom | Simula brilho intenso espalhando luz. |
| Tone Mapping | Conversão de HDR para telas comuns. |
| Motion Blur | Simula borrão causado por movimento. |
| Depth of Field | Simula foco de câmera real. |
| FXAA | Técnica rápida de anti-aliasing em pós-processamento. |
| SSAO | Aproxima oclusão ambiente usando apenas informações da tela. |
| Color Grading | Ajuste artístico das cores finais da imagem. |

---

# ⭐ Anti-Aliasing

| Termo | Descrição |
|---------|---------|
| Aliasing | Serrilhados causados pela representação discreta dos pixels. |
| Anti-Aliasing | Técnicas para suavizar bordas serrilhadas. |
| MSAA | Anti-aliasing baseado em múltiplas amostras por pixel. |
| FXAA | Método rápido baseado em pós-processamento. |
| TAA | Usa informações de frames anteriores para suavizar a imagem. |
| SSAA | Renderiza em resolução maior e reduz posteriormente. |

---

# ⭐ Arquivos e Formatos

| Termo | Descrição |
|---------|---------|
| OBJ | Formato simples de modelos 3D. |
| FBX | Formato avançado com animações e esqueletos. |
| glTF | Formato moderno otimizado para aplicações em tempo real. |
| STL | Formato muito utilizado em impressão 3D. |
| PNG | Imagem sem perdas. |
| JPEG | Imagem comprimida com perdas. |
| EXR | Formato HDR utilizado em renderização profissional. |

---

# ⭐ Termos Modernos

| Termo | Descrição |
|---------|---------|
| VR | Virtual Reality. Ambiente completamente virtual. |
| AR | Augmented Reality. Conteúdo virtual sobreposto ao mundo real. |
| XR | Termo geral para VR, AR e tecnologias relacionadas. |
| Mesh Shader | Nova geração de shaders para substituir partes do pipeline tradicional. |
| Nanite | Tecnologia da Unreal Engine para renderizar bilhões de polígonos dinamicamente. |
| Lumen | Sistema de iluminação global em tempo real da Unreal Engine 5. |
| MegaTexture | Técnica para uso de texturas gigantes carregadas sob demanda. |
| Sparse Texture | Textura parcialmente carregada na memória para economizar VRAM. |
| Unified Memory | Arquitetura onde CPU e GPU compartilham a mesma memória. |

---