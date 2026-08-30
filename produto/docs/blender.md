---
title: Blender
sidebar_label: Blender
description: Introdução ao Blender para modelagem, animação e renderização.
---

# Básico do Blender parte 1
Aqui será abordado em maior parte a interface do Blender, serão mencionadas coisas óbvias (tipo como salvar) e coisas que na primeira leitura pode ser meio vago

# Topbar do Blender
A **Topbar** é a barra superior do Blender. Ela reúne os principais menus de gerenciamento do programa, arquivos, renderização, janelas e ajuda.
É o equivalente à barra de menus de programas como Word, Photoshop ou Visual Studio.

# Blender Menu
Este menu contém informações gerais sobre o Blender e alguns atalhos importantes.

## Tela de Abertura
Abre novamente a tela inicial exibida quando o Blender é iniciado.

## Sobre o Blender
Mostra informações técnicas da instalação:
- **Version:** versão instalada.
-  **Date:** data de compilação.
- **Hash:** identificação única da versão (útil para suporte técnico).
- **Branch:** ramo do código-fonte utilizado.
- **Windowing Environment:** sistema gráfico utilizado no Linux (Wayland ou X11).

## Instalar Template de Aplicação
 Permite instalar modelos de trabalho personalizados.

### O que é um Template?
Um Template altera completamente a configuração inicial do Blender.
**Exemplos:**
- Template para modelagem arquitetônica.
- Template para animação. 
- Template para design industrial.
Quando você cria um novo arquivo usando esse template, várias configurações já vêm prontas.

# Menu File (Arquivo)
É um dos menus mais importantes do Blender.
Responsável por:
- Criar projetos
- Abrir arquivos
- Salvar
- Importar
- Exportar
- Recuperar trabalhos perdidos   

## New (Ctrl + N)Cria um novo projeto.
Ao criar um novo arquivo, o Blender limpa a cena atual e carrega um modelo padrão.
**Exemplos:**
- General
- 2D Animation
- Sculpting
- VFX
- Video Editing

## Open (Ctrl + O)
Abre um arquivo `.blend`.

### Open Recent
Mostra os arquivos abertos recentemente. **Detalhe importante**
Ao passar o mouse sobre um arquivo, o Blender exibe:
- Miniatura do projeto
- Informações do arquivo
- Caminho onde ele está salvo
Isso ajuda a identificar rapidamente qual projeto deseja abrir.

## Revert
Recarrega a última versão salva.

### Exemplo
Você:
- Salvou um projeto.
- Moveu objetos.
- Apagou materiais.
- Cometeu vários erros.
- Usando **Revert**, o Blender volta exatamente para o estado do último salvamento.

## Recover (Recuperação)
Uma das funções mais importantes para evitar perda de trabalho.

### Last Session
Recupera o projeto da última sessão.
Útil quando o Blender foi fechado sem querer.

### Auto Save
Recupera arquivos de salvamento automático.
O Blender cria cópias temporárias periodicamente. Se houver uma queda de energia ou travamento, você pode restaurar boa parte do trabalho.

# Salvar Arquivos
## Save (Ctrl + S)
Salva o projeto atual.

## Save As (Shift + Ctrl + S)
Salva com outro nome ou em outra pasta.

## Save Copy
Cria uma cópia sem alterar o arquivo atualmente aberto.

### Exemplo
Você trabalha em:```Casa.blend``` 

Usa Save Copy:```Casa_Backup.blend```

Mas continua editando o arquivo original.

## Save Incremental (Ctrl + Alt + S)
Uma função extremamente útil para projetos grandes.
Cria automaticamente versões numeradas.

### Exemplo
```
Projeto_01.blend 
Projeto_02.blend
Projeto_03.blend
```
Isso permite voltar para versões anteriores caso algo dê errado.

# Link e Append
Essas duas opções são muito úteis se você usa vários arquivos, além de serem algo um pouco complexo de entender no início.

## Link
Importa dados de outro arquivo mantendo uma conexão com ele.

### Como funciona
Imagine:```Personagem.blend```contendo um personagem completo.

Você usa Link em:```Cena.blend```

E o personagem aparece na cena.
Mas:
- Não pode ser editado diretamente.
- Continua pertencendo ao arquivo original.
Se o arquivo original for atualizado, a cena também será atualizada.

## Append
Também importa dados de outro arquivo.
Mas cria uma cópia independente.

### Diferença do append
Após usar Append:
- O objeto pertence ao arquivo atual.
- Pode ser editado livremente.
- Não depende mais do arquivo original.

# Import e Export
## Import
Permite trazer modelos de outros programas.

### Formatos comuns
- FBX
- OBJ
- STL
- Alembic
- glTF

### Exemplo
Importar um modelo criado no AutoCAD ou Maya.

## Export
Faz o contrário.Transforma projetos Blender em formatos utilizados por outros softwares ou engines.

### Exemplo
Exportar para:
- Unity
- Unreal Engine
- Impressão 3D
- Outros programas 3D

# External Data
Uma das áreas mais confusas para iniciantes.
Ela controla arquivos externos usados pelo projeto.

### Exemplos
- Texturas
- Imagens
- HDRIs
- Sons
- Bibliotecas

## Pack Resources
"Empacotar recursos".
O Blender coloca todos os arquivos externos dentro do próprio `.blend`.

### Vantagem
Você pode mover o arquivo para outro computador sem perder texturas.

## Unpack Resources
Faz o processo inverso.
Extrai novamente os recursos para arquivos externos.

## Automatically Pack Resources
Todo arquivo novo usado pelo projeto será automaticamente incorporado ao `.blend`.
Muito útil para evitar erros de textura perdida.

# Caminhos Relativos e Absolutos

## Make Paths Relative
Transforma caminhos em relativos.

### Exemplo
```Texturas\Madeira.jpg```
Funciona bem quando o projeto inteiro é movido para outro computador.

## Make Paths Absolute
Transforma em caminho completo.

### Exemplo
```C:\Projetos\Casa\Texturas\Madeira.jpg```
Mais preciso, porém menos portátil.

## Report Missing Files
Verifica se existem arquivos faltando.

### Exemplo
Você apagou uma textura sem perceber.
O Blender procura referências quebradas e avisa.

## Find Missing Files
Procura automaticamente os arquivos perdidos.

### Exemplo
Você moveu uma pasta de texturas.
Em vez de relinkar tudo manualmente, o Blender procura os arquivos e reconecta as referências.
Essa função economiza muito tempo em projetos grandes.

# Clean Up
Ferramentas para limpeza do projeto.

## Purge Unused Data
Remove dados que não estão sendo utilizados.

### Exemplos
- Materiais órfãos
- Malhas não usadas
- Imagens sem referência

### Observação 
Não pode ser desfeito.

## Manage Unused Data
Mostra todos os dados não utilizados antes da remoção.
É uma forma mais segura de analisar o projeto.

# Defaults
Gerencia as configurações padrão do Blender.

## Save Startup File
Salva o estado atual como padrão.

### Exemplo
Você sempre usa:
- Layout específico
- Luz personalizada
- Coleções organizadas
Pode salvar tudo isso para aparecer sempre ao abrir novos projetos.

## Load Factory Settings
Restaura as configurações originais de fábrica.
Útil quando algo foi configurado incorretamente.

# Menu Edit
Ferramentas gerais de edição.

## Undo / Redo
- Undo = desfazer.
- Redo = refazer.

## Menu Search
Pesquisa menus pelo nome.

### Exemplo
Digite:```Subdivision``` e o Blender mostra onde encontrar essa função.

## Operator Search
Pesquisa qualquer operação do Blender. 
É como uma barra de comandos. Muito útil para usuários avançados.

## Batch Rename
Permite renomear vários objetos simultaneamente.

### Exemplo
Antes:
```
Cube 
Cube.001 
Cube.002 
Cube.003
```
Depois:
```
Pilar_01
Pilar_02
Pilar_03
Pilar_04
```
## Lock Object Modes

Evita trocas acidentais de modo.

### Exemplo

Você está animando um esqueleto em Pose Mode.
Sem querer clica em outro objeto.
Normalmente o Blender sairia do modo atual.
Com essa opção ativada isso não acontece.

# Menu Render

Controla a renderização.

## Render Image (F12)

Renderiza apenas o quadro atual.

## Render Animation (Ctrl + F12)

Renderiza todos os quadros da animação.

## Render Audio

Exporta apenas o áudio da cena.
Muito usado em animações e edição de vídeo.

## View Render (F11)

Abre o último render realizado.

## View Animation (Ctrl + F11)

Reproduz a animação renderizada em um player externo.

## Lock Interface

Durante renderizações pesadas, bloqueia a interface para liberar mais memória para o renderizador.Em projetos grandes pode melhorar a estabilidade.

# Menu Window

Gerencia janelas e áreas de trabalho.

## New Window

Cria uma nova janela com o mesmo conteúdo da atual.

## New Main Window

Cria uma janela independente.
Ela pode mostrar:
- Outra cena
- Outro workspace
- Outro contexto
Muito útil em monitores múltiplos.

## Toggle Window Fullscreen

Alterna para tela cheia.

## Next Workspace / Previous Workspace

Navega rapidamente entre os workspaces.

## Show Status Bar

Mostra ou oculta a barra inferior de informações.

## Save Screenshot

Captura toda a janela do Blender.

## Save Screenshot (Editor)

Captura apenas um editor específico.

### Exemplo

- Apenas o Viewport.
- Apenas o Shader Editor.
- Apenas o UV Editor.
# Workspaces

Os Workspaces são conjuntos de janelas organizadas para tarefas específicas.

### Exemplos

- Layout
- Modeling
- Sculpting
- UV Editing
- Shading
- Animation
- Rendering
- Compositing
- Cada Workspace reorganiza automaticamente os editores para facilitar aquela atividade.

# Scenes & View Layers

Localizados no canto superior direito.
## Scene

Permite alternar entre diferentes cenas dentro do mesmo arquivo.

### Exemplo

- Cena da casa.
- Cena da garagem.
- Cena do jardim.
- Tudo dentro de um único `.blend`.
## View Layer

Controla quais objetos serão exibidos e renderizados.

### Exemplo prático

Você pode ter:
- Layer para render final.
- Layer para testes.
- Layer apenas para sombras.
- Layer apenas para efeitos especiais.
Isso é extremamente importante em projetos profissionais de animação e VFX.

# Status Bar

A **Status Bar (Barra de Status)** é a barra localizada na parte inferior da janela do Blender. Sua função é fornecer informações rápidas e contextuais sobre o que está acontecendo no programa, incluindo atalhos, mensagens do sistema, progresso de tarefas e estatísticas da cena.

Ela ajuda o usuário a acompanhar o estado atual do projeto sem precisar abrir menus adicionais.

---

# Localização e Visibilidade

A Status Bar fica na parte inferior da interface principal do Blender.

Ela pode ser ocultada de duas maneiras:

- Desativando **Show Status Bar** no menu **Window**.
- Arrastando sua borda superior para baixo até escondê-la.

Essa opção pode ser útil para aumentar a área de trabalho em monitores menores.

---

# Estrutura da Status Bar

A barra é dividida em três regiões principais:

## Lado Esquerdo

Exibe:

- Atalhos de mouse.
- Atalhos do teclado.
- Informações da ferramenta ativa.

## Centro

Exibe:

- Mensagens informativas.
- Avisos.
- Progresso de tarefas em execução.

## Lado Direito

Exibe:

- Estatísticas da cena.
- Informações de memória.
- Duração da animação.
- Atualizações de extensões.
- Versão do Blender.

---

# 1. Informações de Atalhos

O lado esquerdo da Status Bar apresenta informações relacionadas à ferramenta atualmente selecionada.

Essas informações incluem:

- Botões do mouse utilizados.
- Teclas de atalho.
- Comandos rápidos da ferramenta ativa.

### Exemplo

Ao selecionar a ferramenta de mover (**Move Tool**), a barra pode exibir atalhos específicos para movimentação de objetos.

---

## Exibição com Alt

Em editores que possuem **Toolbar (Barra de Ferramentas)**, pressionar:

### Windows e Linux

```text
Alt
```

### macOS

```text
Option
```

Mostra atalhos adicionais para troca rápida de ferramentas.

Isso permite visualizar rapidamente os comandos disponíveis sem precisar abrir menus.

---

## Preferência Alt Click Tool Prompt

Essa funcionalidade pode ser desativada em:

```text
Preferences → Keymap → Alt Click Tool Prompt
```

Quando desativada, o Blender deixa de mostrar os atalhos ao pressionar **Alt**.

---

# 2. Mensagens de Status

A região central da barra apresenta informações temporárias sobre o sistema.

Essas mensagens ajudam o usuário a acompanhar operações e eventos.

---

## Tarefas em Execução

Quando o Blender executa uma tarefa demorada, a Status Bar exibe uma barra de progresso.

### Exemplos

- Renderização
- Bake de texturas
- Simulações físicas
- Processamento de dados

### Informações exibidas

A barra mostra:

- Percentual concluído.
- Progresso visual.
- Estimativa de tempo restante.

Ao passar o cursor sobre a barra, o Blender exibe uma previsão do tempo necessário para concluir a tarefa.

---

## Cancelamento

Tarefas em execução podem ser interrompidas através do botão de cancelamento.

Isso é útil quando:

- O render está demorando demais.
- Foi usada uma configuração incorreta.
- O usuário deseja interromper o processamento.

---

## Mensagens Informativas

A barra também exibe notificações rápidas.

### Exemplos

- Arquivo salvo com sucesso.
- Configuração aplicada.
- Operação concluída.
- Avisos do sistema.

Essas mensagens desaparecem automaticamente após alguns segundos.

---

## Visualização Completa

Ao clicar na mensagem, ela pode ser aberta no **Info Editor**, permitindo visualizar mais detalhes sobre a operação realizada.

---

# 3. Informações de Recursos

O lado direito da Status Bar apresenta informações técnicas e estatísticas sobre o projeto.

O usuário pode personalizar quais informações aparecem:

- Clicando com o botão direito na Status Bar.
- Ajustando as preferências do Blender.

---

# Estatísticas da Cena (Scene Statistics)

Mostra dados sobre a cena atualmente ativa.

---

## Collection

Exibe o nome da coleção ativa.

### Exemplo

```text
Collection: Ambiente
```

Coleções são grupos utilizados para organizar objetos.

---

## Active Object

Mostra o objeto atualmente selecionado.

### Exemplo

```text
Active Object: Cube
```

Isso permite identificar rapidamente qual objeto está sendo editado.

---

## Geometry

Mostra informações geométricas da cena.

Dependendo do modo utilizado, podem ser ser exibidos:

- Número de vértices.
- Número de arestas.
- Número de faces.
- Número de triângulos.
- Número de ossos (Armatures).

Esses dados são úteis para avaliar a complexidade do modelo.

---

## Objects

Exibe:

- Quantidade de objetos selecionados.
- Quantidade total de objetos da cena.

### Exemplo

```text
Objects: 5 / 128
```

Significa:

- 5 objetos selecionados.
- 128 objetos na cena.

---

# Duração da Cena (Scene Duration)

Apresenta informações sobre a animação.

Exibe:

- Quadro atual.
- Número total de quadros.
- Tempo total da animação.

### Exemplo

```text
Frame: 120 / 250
```

Esses valores ajudam no controle de animações e simulações.

---

## Formato do Tempo

O formato utilizado depende da configuração:

```text
Timecode Style
```

Ele pode exibir:

- Quadros.
- Segundos.
- Minutos.
- Horas.

---

# Memória do Sistema (System Memory)

Mostra uma estimativa da quantidade de memória RAM utilizada pelo Blender.

### Exemplo

```text
Memory: 3.2 GB
```

Essa informação é importante para:

- Evitar travamentos.
- Monitorar projetos pesados.
- Avaliar desempenho.

Quanto maior o projeto, maior tende a ser o consumo de memória.

---

# Atualizações de Extensões

Exibe o número de extensões ou complementos que possuem atualizações disponíveis.

### Exemplo

```text
Updates: 4
```

Isso ajuda a manter os add-ons atualizados.

---

# Versão do Blender

Mostra a versão atualmente instalada e em execução.

### Exemplo

```text
Blender 5.2 LTS
```

Essa informação é importante para:

- Compatibilidade de projetos.
- Suporte técnico.
- Verificação de recursos disponíveis.


# Areas

As **Areas (Áreas)** são as divisões retangulares que compõem a interface do Blender. Cada área contém um **Editor**, responsável por uma função específica, como visualização 3D, edição de materiais, animação ou gerenciamento de objetos.

As áreas são a base da organização da interface e permitem personalizar completamente o ambiente de trabalho.

---

# O que são Áreas?

A janela do Blender é dividida em vários retângulos chamados **Áreas**.

Cada área abriga um editor específico, por exemplo:

- 3D Viewport
- Outliner
- Properties
- Timeline
- Shader Editor
- Geometry Nodes Editor
- UV Editor

Os limites das áreas são identificados por seus cantos arredondados, que também servem como pontos de controle para reorganizar a interface.

---

# Relação entre Áreas, Editores e Workspaces

A organização da interface segue uma hierarquia:

```text
Workspace
 ├── Área
 │    └── Editor
 ├── Área
 │    └── Editor
 └── Área
      └── Editor
```

## Workspace

Conjunto de áreas voltado para uma tarefa específica.

## Área

Espaço reservado dentro da interface.

## Editor

Ferramenta exibida dentro da área.

### Exemplo

No workspace **Layout**:

- Área superior esquerda → 3D Viewport
- Área superior direita → Outliner
- Área inferior direita → Properties
- Área inferior esquerda → Timeline

---

# Atalhos Dependem da Área Ativa

Embora alguns atalhos sejam globais, muitos funcionam apenas em determinados editores.

### Exemplo

Suponha que dois objetos estejam selecionados no Outliner.

Para juntá-los:

```text
Ctrl + J
```

Esse atalho funciona apenas no **3D Viewport**.

Se o cursor estiver sobre o **Outliner**, o comando não será executado.

Por isso, a posição do mouse influencia diretamente quais atalhos estarão disponíveis.

---

# Personalização das Bordas

A espessura das bordas entre áreas pode ser alterada nas Preferências.

### Configuração

```text
Preferences → Interface → Border Width
```

Isso facilita a seleção e o redimensionamento das áreas.

---

# Corner Handles

Os cantos das áreas podem permanecer sempre visíveis.

Essa opção é especialmente útil em:

- Tablets
- Notebooks touchscreen
- Monitores sensíveis ao toque

Facilitando operações de divisão e reorganização.

---

# Redimensionamento de Áreas

As áreas podem ser redimensionadas livremente.

## Como fazer

1. Posicione o cursor sobre a borda entre duas áreas.
2. O cursor mudará para uma seta dupla.
3. Clique e arraste.

---

## Ajuste com Precisão

Segurando:

```text
Ctrl
```

o Blender encaixa automaticamente os tamanhos em posições mais convenientes.

Isso facilita a criação de layouts organizados.

---

# Docking (Gerenciamento de Áreas)

O termo **Docking** refere-se às ferramentas que permitem:

- Dividir áreas
- Unir áreas
- Trocar posições
- Reorganizar a interface

---

## Iniciando o Docking

Ao mover o cursor para um dos cantos de uma área, ele se transforma em:

```text
+
```

*(crosshair)*

A partir daí, basta manter o botão esquerdo pressionado e arrastar.

---

## Cancelamento

Antes de soltar o mouse, é possível cancelar a operação usando:

```text
Esc
```

ou

```text
Botão Direito
```

---

# Juntando Áreas (Join)

Permite unir duas áreas em uma única.

## Como fazer

1. Clique em um canto.
2. Arraste em direção à segunda área.
3. Solte o mouse.

As áreas envolvidas ficam destacadas durante a operação.

### Vantagens

Útil para:

- Criar áreas maiores.
- Dar mais espaço ao 3D Viewport.
- Simplificar a interface.

---

# Dividindo Áreas (Split)

Permite criar uma nova área.

---

## Divisão Vertical

Arraste para:

```text
Esquerda ou Direita
```

Resultado:

```text
|     |
|     |
```

---

## Divisão Horizontal

Arraste para:

```text
Cima ou Baixo
```

Resultado:

```text
---------
---------
```

---

# Divisão e União Simultânea

O Blender permite:

- Dividir uma área.
- Juntar outra área.

Tudo em uma única operação de arrastar.

---

# Substituir uma Área

Se uma área for arrastada para o centro de outra:

O Blender substitui o conteúdo da área de destino.

Isso permite reorganizar rapidamente a interface.

---

# Opções de Área

Ao clicar com:

```text
Botão Direito na borda
```

abre-se o menu de opções da área.

---

## Vertical Split

Divide verticalmente.

---

## Horizontal Split

Divide horizontalmente.

### Durante a operação

```text
Tab
```

alterna entre os modos vertical e horizontal.

---

## Join Up / Down / Left / Right

Une áreas em uma direção específica.

### Exemplos

- Join Up
- Join Down
- Join Left
- Join Right

---

## Swap Areas

Troca a posição de duas áreas vizinhas.

Muito útil quando a organização da interface não está ideal.

---

# Troca de Conteúdo Entre Áreas

O Blender permite trocar o conteúdo de duas áreas sem alterar seus tamanhos.

## Procedimento

Segure:

```text
Ctrl
```

Clique em um dos cantos da área.

Arraste até a área desejada.

Solte o mouse.

### Resultado

```text
Viewport ↔ Outliner
```

Os dois editores trocam de lugar.

Não precisam estar lado a lado.

Apenas precisam estar na mesma janela.

---

# Maximize Area

### Atalho

```text
Ctrl + Espaço
```

### Menu

```text
View → Area → Toggle Maximize Area
```

---

## Função

Expande a área selecionada para ocupar praticamente toda a janela.

Mantém visíveis:

- Topbar
- Status Bar

---

## Benefícios

Excelente para:

- Modelagem
- Escultura
- Edição de materiais
- Programação

Quando é necessário mais espaço.

---

## No 3D Viewport

Ao maximizar, o Blender oculta temporariamente:

- Gizmos de navegação
- Sobreposições de texto
- Estatísticas

Isso aumenta a área útil de trabalho.

---

## Restaurar

Pressione novamente:

```text
Ctrl + Espaço
```

ou clique em:

```text
Back to Previous
```

na Topbar.

---

# Restore Area

### Atalho

```text
Ctrl + Espaço
```

Retorna a área maximizada ao tamanho original.

Restaura completamente o layout anterior.

---

# Focus Mode

### Atalho

```text
Ctrl + Alt + Espaço
```

### Menu

```text
View → Area → Focus Mode
```

---

## Função

Ocupa toda a janela disponível com o editor ativo.

Diferente do **Maximize Area**, ele esconde:

- Topbar
- Status Bar
- Barras laterais
- Cabeçalhos
- Regiões secundárias

---

## Vantagem

Oferece o máximo espaço possível para o editor.

Ideal para:

- Escultura detalhada
- Pintura de texturas
- Modelagem complexa
- Análise de renderizações

---

## Retornar ao Normal

Use novamente:

```text
Ctrl + Alt + Espaço
```

ou clique no ícone de restauração exibido ao passar o mouse sobre a área.

---

# Duplicate Area into New Window

### Menu

```text
View → Area → Duplicate Area into New Window
```

---

## Função

Cria uma nova janela flutuante contendo uma cópia da área atual.

A nova janela permanece conectada à mesma sessão do Blender.

---

## Aplicações

Muito útil para:

- Trabalhar com dois monitores.
- Manter o Outliner aberto em uma tela.
- Visualizar o Render Result em outra tela.
- Deixar o Shader Editor separado.
- Monitorar animações enquanto modela.


# Regions

As **Regions (Regiões)** são subdivisões internas de cada editor do Blender. Enquanto as **Áreas (Areas)** definem o espaço ocupado por um editor na interface, as **Regiões** organizam os elementos internos desse editor, como menus, ferramentas, painéis e controles.

Cada editor possui pelo menos uma região principal e pode conter várias regiões adicionais dependendo de sua função.

---

# O que são Regiões?

Todo editor do Blender é dividido em regiões.

Essas regiões servem para organizar:

- Menus
- Ferramentas
- Painéis
- Configurações
- Informações
- Widgets de controle

### Exemplo no 3D Viewport

- Cabeçalho (Header)
- Região Principal (Main Region)
- Barra de Ferramentas (Toolbar)
- Barra Lateral (Sidebar)
- Painel **Adjust Last Operation**

---

# Estrutura Geral das Regiões

```text
Editor
│
├── Header
├── Tool Settings
├── Toolbar
├── Main Region
├── Sidebar
├── Footer
└── Painéis Temporários
```

Cada editor possui uma combinação diferente dessas regiões.

---

# 1. Região Principal (Main Region)

É a região mais importante do editor.

### Características

- Sempre existe.
- Nunca pode ser removida.
- Ocupa a maior parte do espaço disponível.

## Função

A região principal contém o conteúdo central do editor.

### No 3D Viewport

Mostra:

- Objetos 3D
- Luzes
- Câmeras
- Malhas

### No Shader Editor

Mostra:

- Nós (Nodes)
- Conexões entre materiais

### No Timeline

Mostra:

- Quadros da animação
- Keyframes

---

# 2. Cabeçalho (Header)

O **Header** é uma faixa horizontal localizada na parte superior ou inferior do editor.

Todos os editores possuem um cabeçalho.

## Funções

Contém:

- Menus
- Ferramentas
- Botões de acesso rápido
- Configurações do editor

O conteúdo muda conforme:

- Tipo de editor
- Objeto selecionado
- Modo ativo

---

## Menu de Contexto do Header

Clique com:

```text
Botão Direito (RMB)
```

sobre o cabeçalho.

---

### Show Header

Mostra ou oculta o cabeçalho.

Quando ocultado, uma pequena seta aparece para restaurá-lo.

---

### Show Tool Settings

Mostra ou oculta a região **Tool Settings**.

---

### Show Menus

Mostra ou oculta os menus do cabeçalho.

---

### Flip to Bottom / Top

Move o cabeçalho entre:

- Parte superior
- Parte inferior

do editor.

---

### Vertical / Horizontal Split

Permite dividir áreas diretamente a partir do cabeçalho.

### Atalho

```text
Tab
```

alterna entre:

- Divisão vertical
- Divisão horizontal

---

### Maximize Area / Focus Mode

Acessa os modos de ampliação da área.

---

### Duplicate Area into New Window

Cria uma nova janela contendo uma cópia do editor.

---

### Close Area

Fecha a área atual e expande uma área vizinha para ocupar seu espaço.

---

# 3. Toolbar (Barra de Ferramentas)

Localizada normalmente no lado esquerdo do editor.

Contém ferramentas interativas.

---

## Exemplos de Ferramentas

### No 3D Viewport

- Move
- Rotate
- Scale
- Extrude
- Annotate

### Atalho

```text
T
```

Mostra ou oculta a Toolbar.

---

# 4. Tool Settings

É uma faixa horizontal semelhante ao Header.

Pode ficar:

- Na parte superior
- Na parte inferior

do editor.

---

## Função

Mostra configurações específicas da ferramenta atualmente selecionada.

### Exemplo

Se a ferramenta ativa for **Extrude**, essa região exibirá opções relacionadas à extrusão.

---

## Personalização

Pode ser:

- Ocultada
- Movida

através do menu de contexto do Header.

---

# 5. Adjust Last Operation

É um painel temporário exibido após executar uma operação.

## Função

Permite modificar parâmetros da última ação realizada.

### Exemplo

Após adicionar um cubo:

```text
Shift + A → Mesh → Cube
```

O painel permite alterar:

- Tamanho
- Localização
- Rotação

sem precisar recriar o objeto.

---

## Vantagem

Facilita ajustes rápidos imediatamente após uma operação.

---

# 6. Sidebar (Barra Lateral)

A Sidebar fica normalmente no lado direito do editor.

---

## Conteúdo

Contém painéis com:

- Configurações do objeto
- Ferramentas adicionais
- Informações do editor
- Configurações da cena

### Atalho

```text
N
```

Mostra ou oculta a Sidebar.

---

## Utilização

É uma das regiões mais usadas durante:

- Modelagem
- Animação
- Escultura
- Renderização

---

# 7. Footer (Rodapé)

Alguns editores possuem um rodapé.

Ele aparece na parte superior ou inferior do editor.

---

## Função

Exibe informações relacionadas ao editor atual.

### Em editores de animação

O Footer contém controles de:

- Reprodução
- Keyframes
- Auto Keying
- Navegação temporal

---

## Recursos Disponíveis

### Controle de Reprodução

- Play
- Pause
- Stop

### Inserção de Keyframes

- Criação automática
- Gerenciamento de conjuntos de keyframes

### Navegação

- Avanço de quadros
- Retrocesso
- Controle da Timeline

### Ajuste de Intervalos

Permite definir:

- Início da animação
- Final da animação
- Faixas de pré-visualização

---

# Organização das Regiões

As regiões podem ser:

- Roladas
- Redimensionadas
- Ocultadas
- Escaladas

---

# Rolagem (Scrolling)

Regiões podem ser percorridas usando:

### Botão do Meio (MMB)

Clique e arraste.

### Roda do Mouse

Quando o editor não possui zoom próprio.

---

## Barras de Rolagem Avançadas

Algumas regiões possuem barras especiais com controles extras.

Esses controles permitem:

- Ampliar visualização
- Reduzir visualização
- Ajustar detalhes exibidos

### Atalho

```text
Ctrl + MMB
```

Permite ajustar rapidamente:

- Escala horizontal
- Escala vertical

---

# Redimensionamento

As regiões podem ser redimensionadas da mesma forma que as áreas.

Basta arrastar suas bordas.

---

# Ocultar Regiões

Para ocultar uma região:

1. Arraste sua borda até o mínimo.
2. A região desaparecerá.

---

## Restaurar

Uma pequena seta aparecerá.

Clique nela para exibir novamente a região.

---

# Escala das Regiões

Algumas regiões permitem alterar o tamanho dos elementos internos.

### Exemplo

Toolbar.

---

## Métodos

### Mouse

```text
Ctrl + MMB
```

Arrastar dentro da região.

### Teclado Numérico

```text
Numpad +
```

Aumenta a escala.

```text
Numpad -
```

Diminui a escala.

### Reset

```text
Home
```

Retorna à escala padrão.

---

# Asset Shelf

A **Asset Shelf (Prateleira de Ativos)** é uma região utilizada para acessar ativos armazenados.

### Exemplos

- Materiais
- Brushes
- Objetos
- Poses

---

## Pesquisa de Assets

### Atalho

```text
Ctrl + F
```

Permite pesquisar ativos pelo nome.

---

## Catálogos como Abas

Os catálogos podem ser exibidos em formato de abas.

Cada aba mostra:

- Seus próprios ativos.
- Os ativos das subcategorias.

Isso facilita a organização de bibliotecas grandes.

---

## Opções de Exibição

A Asset Shelf permite:

### Alterar tamanho dos itens

Aumentar ou reduzir miniaturas.

### Mostrar nomes

Exibir o nome dos ativos diretamente na prateleira.

### Ajustar altura

Permite exibir várias linhas de ativos.

Basta arrastar sua borda superior.

---

## Filtro por Ferramenta Ativa

### Opção

```text
By Active Tool
```

Mostra apenas os ativos compatíveis com a ferramenta atualmente selecionada.

### Exemplo

Ao usar um pincel de escultura, apenas brushes relevantes serão exibidos.

# Tabs e Panels

As **Tabs (Abas)** e **Panels (Painéis)** são elementos fundamentais da interface do Blender. Elas organizam ferramentas, propriedades e configurações de forma estruturada, permitindo acessar grandes quantidades de opções sem sobrecarregar a tela.

Enquanto as **Tabs** dividem conteúdos em categorias, os **Panels** agrupam configurações relacionadas dentro dessas categorias.

---

# Tabs (Abas)

As Tabs são utilizadas para alternar entre diferentes conjuntos de informações dentro de uma mesma região da interface.

Somente uma aba pode estar visível por vez.

---

## Função das Tabs

As abas servem para organizar conteúdos que ocupam o mesmo espaço.

### Exemplo no Editor de Propriedades

- Render Properties
- Output Properties
- View Layer Properties
- Scene Properties
- World Properties
- Object Properties
- Material Properties

Cada uma possui configurações específicas e aparece apenas quando selecionada.

---

# Tipos de Cabeçalho de Tabs

## Horizontal

Encontrado principalmente na Topbar e em algumas áreas da interface.

### Exemplo

```text
[ Layout ] [ Modeling ] [ Sculpting ] [ Animation ]
```

---

## Vertical

Muito comum no Editor de Propriedades.

### Exemplo

```text
Modeling
Animation
Render
Compositing
UV Editing
```

Cada item representa uma categoria diferente de propriedades.

---

# Alternando Entre Tabs

O Blender oferece diversos métodos para trocar de aba.

---

## Ctrl + Roda do Mouse

Permite alternar entre abas verticais.

Funciona quando o cursor está sobre a área das abas.

---

## Ctrl + Tab

Avança para a próxima aba.

---

## Ctrl + Shift + Tab

Retorna para a aba anterior.

---

## Arrastar com o Mouse

Mantendo o botão esquerdo pressionado sobre os ícones das abas, é possível deslizar rapidamente entre elas.

---

## Numpad .

Leva a visualização até a aba ativa quando ela estiver fora da área visível.

---

## Observação

Esses atalhos não funcionam para as abas dos **Workspaces**.

Os Workspaces possuem controles próprios.

---

# Panels (Painéis)

Os Panels são a menor unidade organizacional da interface do Blender.

Eles agrupam propriedades relacionadas em blocos organizados.

---

# Estrutura de um Painel

Cada painel possui:

- Cabeçalho
- Título
- Conteúdo interno

Alguns painéis também possuem:

- Subpainéis
- Menus
- Botões
- Campos de configuração

---

# Subpainéis

Um painel pode conter outros painéis menores.

Esses são chamados de **Subpanels**.

### Exemplo

```text
Transform
 ├── Location
 ├── Rotation
 └── Scale
```

Isso melhora a organização de configurações complexas.

---

# Expandir e Recolher Painéis

Os painéis podem ser abertos ou fechados.

---

## Painel Expandido

Identificado por:

```text
▼
```

Mostra todo o conteúdo.

---

## Painel Recolhido

Identificado por:

```text
►
```

Mostra apenas o cabeçalho.

---

## Clique Simples

Clique no cabeçalho para:

- Expandir
- Recolher

o painel.

---

## Tecla A

Quando o cursor está sobre um painel:

```text
A
```

Expande ou recolhe o painel.

---

## Ctrl + Clique em Painel Fechado

```text
Ctrl + LMB
```

Expande o painel selecionado e fecha todos os demais.

Muito útil em regiões com muitos painéis.

---

## Ctrl + Clique em Painel Aberto

```text
Ctrl + LMB
```

Expande ou recolhe todos os seus subpainéis.

---

## Arrastar Sobre Cabeçalhos

Arrastando o mouse sobre vários cabeçalhos enquanto mantém o botão pressionado, é possível abrir ou fechar vários painéis simultaneamente.

---

# Reorganização de Painéis

Os painéis podem mudar de posição dentro da região.

---

## Como mover

Utilize o manipulador:

```text
:::
```

localizado à direita do cabeçalho.

Clique e arraste para reposicionar.

---

## Vantagens

Permite organizar os painéis mais utilizados em locais de fácil acesso.

---

# Painéis Fixados (Pinning)

Algumas regiões permitem manter um painel visível independentemente da aba selecionada.

Esse recurso é chamado de **Pinning**.

---

## Funcionamento

Um painel fixado permanece aberto mesmo quando o usuário troca de aba.

### Exemplo

Um usuário pode:

1. Fixar propriedades da câmera.
2. Selecionar outros objetos.
3. Continuar visualizando as configurações da câmera.

---

# Como Fixar

## Método 1

Clique no ícone de alfinete presente no cabeçalho.

---

## Método 2

Botão direito no cabeçalho:

```text
Pin
```

---

## Método 3

```text
Shift + LMB
```

sobre o painel.

---

## Limitação

Nem todos os painéis suportam fixação.

### Exemplos

**Disponível**

- Sidebar

**Não disponível**

- Properties Editor

---

# Presets

Diversos painéis possuem um sistema de **Presets**.

Os presets permitem salvar configurações para reutilização futura.

---

## O que são Presets?

São conjuntos de valores armazenados pelo Blender.

Permitem aplicar configurações com apenas um clique.

---

## Exemplo de Uso

Um artista pode criar presets para:

- Iluminação
- Renderização
- Pincéis
- Simulações
- Materiais

---

# Componentes do Menu Presets

## Lista de Presets

Exibe todos os presets disponíveis.

Ao selecionar um:

- As configurações são carregadas automaticamente.

---

## Nome do Preset

Campo utilizado para definir o nome de um novo preset.

### Exemplo

```text
Render_Alta_Qualidade
```

---

## Adicionar (+)

Cria um novo preset utilizando as configurações atuais.

O preset passa a ficar disponível na lista.

---

## Remover (-)

Exclui o preset selecionado.

---

# Armazenamento dos Presets

Os presets são salvos como arquivos Python.

### Localização

```text
Configuração do Blender
 └── Presets
```

---

# Vantagens dos Presets

Usuários avançados podem:

- Editar presets manualmente.
- Compartilhar presets.
- Copiar presets entre computadores.
- Criar bibliotecas personalizadas.

Isso permite padronizar fluxos de trabalho e reutilizar configurações em diferentes projetos.

## Recursos essenciais

- [Blender Manual](https://docs.blender.org/manual/en/latest/)
- [Blender Stack Exchange](https://blender.stackexchange.com/)
- [Blender Artists](https://blenderartists.org/)
- [YouTube: Blender Guru](https://www.youtube.com/@BlenderGuru)
- [YouTube: CG Cookie](https://www.youtube.com/@cgcookie)
