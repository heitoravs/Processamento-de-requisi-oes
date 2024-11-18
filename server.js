const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;


let empresas = [];

app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.send(`
      <html lang="pt-br">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Cadastro de Empresas</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f4f4f9;
                  margin: 0;
                  padding: 20px;
              }
              h1 {
                  text-align: center;
                  color: #333;
              }
              form {
                  background: #fff;
                  padding: 20px;
                  border-radius: 8px;
                  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  max-width: 600px;
                  margin: auto;
              }
              label {
                  font-size: 14px;
                  margin: 8px 0;
                  display: block;
              }
              input {
                  width: 100%;
                  padding: 10px;
                  margin: 8px 0;
                  border: 1px solid #ccc;
                  border-radius: 4px;
                  box-sizing: border-box;
                  font-size: 14px;
              }
              button {
                  background-color: #4CAF50;
                  color: white;
                  border: none;
                  padding: 12px 20px;
                  text-align: center;
                  text-decoration: none;
                  display: inline-block;
                  font-size: 16px;
                  margin: 10px 0;
                  cursor: pointer;
                  border-radius: 4px;
              }
              button:hover {
                  background-color: #45a049;
              }
              .error {
                  color: red;
                  font-size: 14px;
                  margin-bottom: 20px;
              }
              ul {
                  padding: 0;
                  list-style-type: none;
              }
              li {
                  font-size: 16px;
              }
          </style>
      </head>
      <body>
          <h1>Cadastro de Empresas</h1>
          
          <form action="/cadastro" method="POST">
              <label for="cnpj">CNPJ:</label>
              <input type="text" id="cnpj" name="cnpj" placeholder="Ex: 12.345.678/0001-99" required>

              <label for="razao_social">Razão Social:</label>
              <input type="text" id="razao_social" name="razao_social" placeholder="Ex: Moraes & Irmãos Ltda" required>

              <label for="nome_fantasia">Nome Fantasia:</label>
              <input type="text" id="nome_fantasia" name="nome_fantasia" placeholder="Ex: Loja do 1,99" required>

              <label for="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" placeholder="Rua Exemplo, 123" required>

              <label for="cidade">Cidade:</label>
              <input type="text" id="cidade" name="cidade" placeholder="Cidade Exemplo" required>

              <label for="uf">UF:</label>
              <input type="text" id="uf" name="uf" placeholder="Ex: SP" required>

              <label for="cep">CEP:</label>
              <input type="text" id="cep" name="cep" placeholder="Ex: 12345-678" required>

              <label for="email">Email:</label>
              <input type="email" id="email" name="email" placeholder="Ex: empresa@exemplo.com" required>

              <label for="telefone">Telefone:</label>
              <input type="text" id="telefone" name="telefone" placeholder="Ex: (11) 98765-4321" required>

              <button type="submit">Cadastrar</button>
          </form>

          <h2>Empresas Cadastradas:</h2>
          <ul>
              ${empresas.map(empresa => `<li>${empresa.razao_social} - ${empresa.cnpj}</li>`).join('')}
          </ul>
      </body>
      </html>
  `);
});



app.post('/cadastro', (req, res) => {
    const { cnpj, razao_social, nome_fantasia, endereco, cidade, uf, cep, email, telefone } = req.body;


    let erros = [];

    if (!cnpj) erros.push("CNPJ é obrigatório.");
    if (!razao_social) erros.push("Razão Social é obrigatória.");
    if (!nome_fantasia) erros.push("Nome Fantasia é obrigatório.");
    if (!endereco) erros.push("Endereço é obrigatório.");
    if (!cidade) erros.push("Cidade é obrigatória.");
    if (!uf) erros.push("UF é obrigatório.");
    if (!cep) erros.push("CEP é obrigatório.");
    if (!email) erros.push("Email é obrigatório.");
    if (!telefone) erros.push("Telefone é obrigatório.");

  
    if (erros.length > 0) {
        return res.status(400).send(`
            <h1>Erro no Cadastro</h1>
            <p>${erros.join("<br>")}</p>
            <a href="/">Voltar ao formulário</a>
        `);
    }

    empresas.push({
        cnpj,
        razao_social,
        nome_fantasia,
        endereco,
        cidade,
        uf,
        cep,
        email,
        telefone
    });


    res.redirect('/');
});


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
