

<p align="center"><strong>Etec Vasco Antonio Venchiarutti</strong><br>   
Técnico em Desenvolvimento de Sistemas <br>
Jun 2026  
</p>  
    
# LINGUAGEM DE MODELAGEM UML:  
## DIAGRAMA DE CASO DE USO E DIAGRAMA DE CLASSES  
 
  
<p align="right">  
Fernando dos Santos Braz<br>  
Gustavo Henrique da Silva Alves<br>  
Gustavo Müller Santos  
</p>


# UML

## Conceito

<p align="justify">A UML (Unified Modeling Language), ou Linguagem de Modelagem Unificada, é uma linguagem visual utilizada para modelar sistemas de software. Ela permite representar graficamente diferentes aspectos de um sistema antes de sua implementação, facilitando o entendimento entre desenvolvedores, analistas, clientes e demais envolvidos no projeto.</p>

<p align="justify">Embora seja chamada de linguagem, a UML não é uma linguagem de programação. Ela serve apenas para documentar, analisar e planejar sistemas.</p>

## Objetivo

<p align="justify">Os principais objetivos da UML são:</p>

- Facilitar a comunicação entre todos os participantes do projeto;
- Planejar a estrutura de um sistema antes da programação;
- Documentar o funcionamento do software;
- Reduzir erros durante o desenvolvimento;
- Auxiliar na manutenção e evolução dos sistemas.

## História

<p align="justify">A UML surgiu durante a década de 1990, quando três importantes especialistas em engenharia de software — Grady Booch, James Rumbaugh e Ivar Jacobson — unificaram seus métodos de modelagem.</p>

<p align="justify">Em 1997, a UML foi oficialmente adotada pela Object Management Group (OMG), tornando-se um padrão internacional para modelagem de sistemas orientados a objetos.</p>

<p align="justify">Desde então, ela continua sendo utilizada em projetos de software no mundo todo.</p>

## Onde é utilizada

A UML é utilizada em diversos tipos de projetos, como:

- Sistemas bancários;
- Sistemas escolares;
- Sistemas hospitalares;
- Aplicativos para celulares;
- Jogos digitais;
- Sistemas empresariais;
- Comércio eletrônico;
- Sistemas governamentais.

---

# Diagrama de Caso de Uso

## Finalidade

<p align="justify">O Diagrama de Caso de Uso representa as funcionalidades oferecidas por um sistema e mostra como os usuários interagem com elas.</p>

<p align="justify">Seu principal objetivo é apresentar o sistema de maneira simples, permitindo compreender seus requisitos sem entrar em detalhes técnicos.</p>

## Principais elementos

Os principais elementos são:

- Atores;
- Casos de uso;
- Sistema;
- Relacionamentos.

## Atores

Os atores representam quem utiliza o sistema.

Podem ser pessoas, empresas ou até outros sistemas.

Exemplos:

- Cliente;
- Funcionário;
- Administrador;
- Professor;
- Aluno.

## Casos de Uso

Os casos de uso representam as funcionalidades do sistema.

Exemplos:

- Fazer login;
- Cadastrar usuário;
- Realizar pagamento;
- Emitir relatório;
- Consultar produtos.

## Relacionamentos

Os principais relacionamentos são:

- Associação: liga um ator a uma funcionalidade.
- Include («include»): quando um caso de uso sempre depende de outro.
- Extend («extend»): adiciona uma funcionalidade opcional.
- Generalização: representa herança entre atores ou casos de uso.

## Exemplo


<p align="justify">No exemplo a seguir é representado o diagrama do nosso projeto em relação as contribuições feitas por usuários.</p>
<p align="center">
Figura 1: Diagrama de Caso de Uso<br>  
<img src="diagrama_uso.png" width="400"><br>
Fonte: Elaborado pelos autores  
</p>


---

# Diagrama de Classes

## Finalidade

<p align="justify">O Diagrama de Classes representa a estrutura interna do sistema.</p>

<p align="justify">Ele mostra quais classes existirão, seus atributos, métodos e os relacionamentos entre elas.</p>

<p align="justify">É considerado um dos diagramas mais importantes da UML.</p>

## Classes

<p align="justify">As classes representam os objetos existentes no sistema.</p>

Exemplos:

- Cliente
- Produto
- Pedido
- Livro
- Funcionário

## Atributos

<p align="justify">Os atributos representam as características das classes.</p>

Exemplo da classe Livro:

- título
- autor
- ISBN
- quantidade

## Métodos

<p align="justify">Os métodos representam as ações que um objeto pode executar.</p>

Exemplos:

- emprestar()
- devolver()
- cadastrar()
- excluir()
- calcularTotal()

## Relacionamentos entre Classes

<p align="justify">Os principais relacionamentos são:</p>

- Associação;
- Agregação;
- Composição;
- Generalização (Herança);
- Dependência.

## Exemplo

<p align="justify">No exemplo a seguir é representado a estrutura do sistema do nosso projeto. </p>
<p align="center">
Figura 2: Diagrama de Classe<br>  
<img src="diagrama_classe.png" width="400"><br>
Fonte: Elaborado pelos autores  
</p>


---