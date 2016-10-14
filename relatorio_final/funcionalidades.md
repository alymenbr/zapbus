# Funcionalidades

## Login via Facebook

A funcionalidade permite ao usuário logar na aplicação utilizando sua conta do Facebook. A única informação utilizada será o primeiro nome do usuário, para ilustrar os comentários criados na funcionalidade _Fórum de Discussão_.

Apenas usuários logados podem utilizar as outras funcionalidades da aplicação. É necessário logar apenas a primeira vez que a aplicação é aberta após ser instalada no dispositivo, sendo o primeiro nome do usuário guardado para as demais utilizações.


## Tela Principal

Primeira tela exibida após realizar login no aplicativo, ou ao abrir o aplicativo após o usuário haver logado anteriormente.

A tela é muito importante para separar funcionalidades que devem ser utilizadas enquanto o usuário estiver dentro do ônibus das outras funcionalidades que não dependem de sua localização.


## Visualizar Mensagens Próximas

Tela a ser utilizada preferencialmente quando o usuário estiver em trajeto dentro de ônibus. Exibe a lista das 5 mensagens mais próximas à localização atual, deixadas por outros passageiros. Permite também ao usuário interagir com as mensagens existentes ou criar uma nova mensagem utilizando sua localização atual.


## Criar Mensagem

Tela utilizada para criar uma nova mensagem utilizando a localização atual do usuário. Ao ser criada, uma mensagem já começa aprovada por seu criador, iniciando então com uma pontuação de 1 ponto.


## Detalhes da Mensagem

Funcionalidade que exibe todas as informações relacionadas a uma mensagem geolocalizada, como sua descrição, mapa de localização e pontuação. Permite também Aprovar ou Reprovar a mensagem, além de permitir acesso ao _Fórum de Discussão_ da mensagem.


## Mecanismo de Aprovação/Reprovação

O mecanismo de Aprovação/Reprovação permite que mensagens úteis continuem sendo exibidas para os passageiros, e também que mensagens inúteis deixem de ser exibidas de acordo com a avaliação dos próprios usuários do aplicativo. É primordial para o sucesso da aplicação permitir que os próprios usuários moderem as mensagens criadas no aplicativo, reduzindo assim enormemente os custos de manutenção do aplicativo. Cada mensagem pode ser aprovada/reprovada uma única vez por cada usuário.

Uma mensagem sempre é criada com a aprovação de seu criador, iniciando então com a pontuação de 1 ponto. Cada aprovação adicional aumenta a pontuação em 1 ponto; cada reprovação diminui a pontuação em 2 pontos.

Os pesos diferentes para a pontuação de Aprovação/Reprovação possuem o objetivo de garantir que apenas mensagens aprovadas por pelo menos 2/3 dos usuários opinantes permaneçam em exibição para outros usuários do aplicativo. A distribuição dos pesos será observada após a publicação do aplicativo e poderá ser ajustada de acordo com o perfil de utilização do aplicativo pelos usuários.


## Fórum de Discussão

Permite a troca de informações entre usuários do aplicativo, referenciando sempre como assunto alguma mensagem geolocalizada. Comentários criados no fórum de discussão de uma mensagem geolocalizada são exibidas para todos os usuários que acessarem o mesmo fórum de discussão.

Será utilizado o primeiro nome do usuário para identificar o autor das mensagens, não sendo exibida nenhuma outra forma de identificação para manter a privacidade dos usuários. As mensagens serão associadas também à sua data de postagem, sendo o fórum organizado com a exibição de comentários mais recentes primeiro.


## Minhas Contribuições

Funcionalidade que permite o acesso e discussão a mensagens previamente criadas ou aprovadas pelo usuário, mesmo que o mesmo não esteja próximo da localização da mensagem. O objetivo da funcionalidade é permitir que usuário possam continuar interagindo no fórum de discussão de uma mensagem mesmo após terminar seu trajeto no transporte público.
