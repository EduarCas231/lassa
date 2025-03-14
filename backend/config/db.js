// db.js
const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'labsa.cf0s6og80ecx.us-east-2.rds.amazonaws.com', // Host de la base de datos
  user: 'ticsadmin', // Usuario de la base de datos
  password: 'TicsAdmin1705', // Contraseña del usuario
  database: 'lassa', // Nombre de la base de datos
  port: 3306, // Puerto de MySQL
});

// Conectar a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;