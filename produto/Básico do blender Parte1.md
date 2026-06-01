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
- 
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
- Usando **Revert**, o Blender volta exatamente para o estado do último salvamento
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
