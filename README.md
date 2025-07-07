# Instalação do projeto
Esse projeto foi desenvolvido com docker, os passos aqui descritos devem ser seguidos de maneira sequencial

## Clonar repositório
É possível clonar com SSH ou HTTP

Clonar com HTTP:
```
git clone https://github.com/lucasemanuel/frontend.git
```
Ou
Clonar com SSH:
```
git clone git@github.com:lucasemanuel/frontend.git
```

## Configurando variáveis de ambiente
Para configurar as variáveis deve-se copiar o arquivo `.env.example` e renomar para `.env`

## Subir container com docker
Para criar e subir o container é necessário executar o seguinte comando

```
docker compose up --build
```

## Considerações
Agora o frontend já está sendo executada na porta `5173`.
