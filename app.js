const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3050

const app = express()

app.use(bodyParser.json())

//MYSQL
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'crimedev'
})

// Route
app.get('/', (req, res) => {
  res.send('Welcome to my CrimeDevAPI!');
});

//GET ALL
app.get('/delitos', (req, res) => {
  const sql = 'SELECT * FROM delitos';

  connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
      res.json(results);
      } else {
      res.send('Not result');
      }
  });
});

//GET ID
app.get('/delitos/:id', (req, res) => {
  const { id } = req.params;
  const sql = `SELECT * FROM delitos WHERE id_delito = ${id}`;
  connection.query(sql, (error, result) => {
    if (error) throw error;

    if (result.length > 0) {
      res.json(result);
    } else {
      res.send('Not result');
    }
  });
});

//POST
app.post('/delitos', (req, res) => {
  const sql = 'INSERT INTO delitos SET ?';

  const customerObj = {
    id_delito: req.body.id_delito,
    direccion:	req.body.direccion,
    tipo_delito:	req.body.tipo_delito,
    descripcion:	req.body.descripcion,
    coor_a:	req.body.coor_a,
    coor_b: req.body.coor_b
  };

  connection.query(sql, customerObj, error => {
    if (error) throw error;
    res.send('Delito created!');
  });
});

//UPDATE
app.put('/update/:id', (req, res) => {
  const { id } = req.params;
  const { name, city } = req.body;
  const sql = `UPDATE delitos SET name = '${name}', city='${city}' WHERE id =${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Customer updated!');
  });
});

//DELETE
app.delete('/delete/:id', (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM customers WHERE id= ${id}`;

  connection.query(sql, error => {
    if (error) throw error;
    res.send('Delete customer');
  });
});

// Check connect
connection.connect(error => {
  if (error) throw error;
  console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
