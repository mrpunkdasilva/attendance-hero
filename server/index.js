const express = require('express')

const app  = require('./app');
const CONFIGS = require('./Configs/');


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(CONFIGS.SERVER_PORT, () => {
  console.log(`http://localhost:${CONFIGS.SERVER_PORT}/`);
  console.log('Servidor iniciado na porta 3000');
});
