# Configuração Inicial

primeiro tenha o typescript e o nodemon instalado globalmente na sua maquina

    npm install i -g typescript nodemon

em sequencia faça o install das dependencias do projeto

    npm install

logo em sequencia faça a inicializacao da tabela do SQL

    npx prisma init --datasource-provider sqlite

após isso adicione a porta no .env

    PORT=8080

e por fim rode

    npm run dev
