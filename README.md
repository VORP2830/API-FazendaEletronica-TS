# API-FazendaEletronica-TS

Usuário:

- POST /usuario/register: adiciona um novo usuário ao sistema, esperando um objeto JSON com informações de login, senha, nome e email.
- POST /usuario/login: autentica um usuário no sistema, esperando um objeto JSON com informações de login e senha.
- POST /usuario/alterarsenha: altera a senha de um usuário autenticado no sistema, esperando um objeto JSON com a nova senha.
- GET /usuario/autenticado: verifica se um token de autenticação é válido e retorna informações sobre o usuário autenticado.

Animal:

- /animal/telaprincipal: rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho.
- /animal/campo: rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho.
- /animal/vendido: rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho.
- /animal/morto: rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho.
- /animal/pai: rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho.
- '/animal/:id': rota que espera apenas o token de autenticação no cabeçalho e um parâmetro :id passado como número na URL da requisição.
- POST /animal: rota que espera um objeto JSON com informações sobre o animal a ser adicionado.
- PUT /animal: rota que espera um objeto JSON com informações sobre o animal a ser atualizado.
- DELETE '/animal/:id': rota que não espera corpo na requisição, apenas o token de autenticação no cabeçalho e um parâmetro :id passado como número na URL da requisição.

Pagamento:

- GET '/pagamento': lista todos os pagamentos realizados pelo usuário logado.
- GET '/pagamento/:id': busca um pagamento pelo seu id.
- GET '/pagamento/total/tela': retorna o total de pagamentos realizados pelo usuário logado em um formato para exibição na tela.
- POST '/pagamento': adiciona um novo pagamento, esperando um objeto JSON com informações sobre o tipo de pagamento, descrição, data e valor do pagamento.
- PUT '/pagamento': atualiza um pagamento existente, esperando um objeto JSON com informações sobre o pagamento a ser atualizado.
- DELETE '/pagamento/:id': deleta um pagamento existente, esperando um parâmetro :id passado como número na URL da requisição.

Tipo pagamento:

- GET '/tipo/pagamento': lista todos os tipos de pagamento registrados.
- GET '/tipo/pagamento/:id': busca um tipo de pagamento pelo seu id.
- POST '/tipo/pagamento': adiciona um novo tipo de pagamento, esperando um objeto JSON com nome e descricao.
- PUT '/tipo/pagamento': atualiza um tipo de pagamento existente, esperando um objeto JSON com idTipoPagamento, nome e descricao

Status animal:

- GET '/tipo/animal': lista todos os status do animal

Finalidade animal:

- GET '/tipo/finalidade': lista todas as finalidades do animal

Tipo animal:

- GET '/tipo/animal': lista todos os tipo do animal



Usuario:
```
    idUsuario: number,
    senha: string,
    login: string,
    nome: string,
    email: string
```

Animal:

```
    idAnimal: number,
    idCriador: number,
    numero: number,
    idPai: number,
    charSexo: number,
    idFinalidade: number,
    apelido: string,
    nascimento: Date,
    idStatus: number,
    idTipoAnimal: number,
    dataVenda: Date
```

Pagamento:

```
    idPagamento: number,
    idCriador: number,
    idTipo: number,
    charTipo: string,
    descricao: string,
    dataPagamento: Date,
    valorPagamento: number
```

Tipo pagamento:

```
    idTipoPagamento: number,
    nome: string,
    descricao: string,
    idCriador: number

```

*É importante ressaltar que todas as rotas, exceto /usuario/register, exigem que o usuário esteja autenticado para serem acessadas. Para isso, o token de autenticação deve ser enviado no cabeçalho da requisição com a chave "token".*
