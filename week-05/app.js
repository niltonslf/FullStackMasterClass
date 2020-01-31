const mysql = require('mysql')
const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'admin',
  password: 'mysql',
  database: 'cadastro'
})

connection.connect(err => {
  if (err) {
    console.log('Erro ao conectar ao mysql', err)
  } else {
    console.log('Conectado ao mysql')

    connection.query('SELECT * FROM pessoas', (err, results) => {
      console.log(results)
    })
    connection.end()
  }
})
