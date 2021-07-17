# Introducao a API Rest
Esta API foi desenvolvida no Curso de Formação Node.JS, onde foi estudado e utilizado dependencias como:
- Axios
- JWT


# Documentação Abaixo
## Endpoints
### GET /games
Este endpoint é reponsável por retornar a listagem de todos os games cadastrados no banco de dados.
#### Parametros
Nenhum
#### Respostas
##### OK! 200
Caso esta resposta aconteça você vai receber a listagem de todos os games.
Exemplo de resposta:
```
[
    {
        "id": 23,
        "title": "call of duty MW",
        "year": 2019,
        "price": 60
    },
    {
        "id": 65,
        "title": "Sea of thieves",
        "year": 2018,
        "price": 40
    },
    {
        "id": 2,
        "title": "Minecraft",
        "year": 2012,
        "price": 20
    }
]
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: Token inválido, Token expirado.

Exemplo de resposta:
```
{
    "err": "Token inválido!"
}
```


### POST /auth
Este endpoint é reponsável por fazer o processo de login.
#### Parametros
email: E-mail do usuário cadastrado no sistema.

password: Senha do usuário cadastrado no sistema, com aquele determinado e-mail.

Exemplo:
```
{
    "email": "arthur@hotmail.com",
    "password": "arthur"
}
```

#### Respostas
##### OK! 200
Caso esta resposta aconteça você vai receber o token JWT para conseguir acessar endpoints protegidos na API.
Exemplo de resposta:
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJhcnRodXJAaG90bWFpbC5jb20iLCJpYXQiOjE2MjY0ODc0MzMsImV4cCI6MTYyNjY2MDIzM30.npcUtdnCi8EfdeTW89YwifKokLfH8KXPud5GUJ0_wAc"
}
```
##### Falha na autenticação! 401
Caso essa resposta aconteça, isso significa que aconteceu alguma falha durante o processo de autenticação da requisição. Motivos: senha ou e-mail incorretos.

Exemplo de resposta:
```
{
    "err": "Credenciais inválidas!"
}
```
