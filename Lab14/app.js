const mariadb = require('mariadb');
const express = require('express');
const session = require('express-session');
const path = require('path');

const pool = mariadb.createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'appix', // Cambia esto al nombre de tu base de datos MariaDB
    connectionLimit: 5
});

const app = express();

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
    // Render login template
    response.sendFile(path.join(__dirname + '/login.html'));
});

// http://localhost:3000/auth
app.post('/auth', async function(request, response) {
    // Capture the input fields
    let username = request.body.username;
    let password = request.body.password;
    // Ensure the input fields exist and are not empty
    if (username && password) {
        try {
            // Get a connection from the pool
            const conn = await pool.getConnection();
            // Execute SQL query that'll select the account from the database based on the specified username and password
            const result = await conn.query('SELECT * FROM Usuario WHERE NomUsuario = ? AND ContraUsuario = ?', [username, password]);
            // Release the connection back to the pool
            conn.release();
            // If the account exists
            if (result.length > 0) {
                // Authenticate the user
                request.session.loggedin = true;
                request.session.username = username;
                // Redirect to home page
                response.redirect('/home');
            } else {
                response.send('Usuario y/o Contraseña Incorrecta');
            }
        } catch (error) {
            console.error('Error:', error);
            response.send('Error de base de datos');
        }
    } else {
        response.send('Por favor ingresa Usuario y Contraseña!');
    }
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
    // If the user is loggedin
    if (request.session.loggedin) {
        // Output username
        response.send('Te has logueado satisfactoriamente:, ' + request.session.username + '!');
    } else {
        // Not logged in
        response.send('¡Inicia sesión para ver esta página!');
    }
});

app.listen(3000);
