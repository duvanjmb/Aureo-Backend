import express from 'express'; 
import cors from 'cors'
import session from 'express-session';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
import login from './login.js';
import register from './register.js';
import { obtainUsers, deleteUser } from './list-users.js';
import validateSession from './validate-session.js';


const app = express();


//conect backend with frontend
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5174'
}
));

//Maintain the session of the user
app.use(session({
    secret: 'tu_clave_secreta_aureo', // Cámbiala por algo seguro
    resave: false,                  // No resguarda la sesión si no hubo cambios
    saveUninitialized: false,       // No crea sesiones vacías (ahorra memoria)
    cookie: {
        secure: false,                // Ponlo en true solo si usas HTTPS
        maxAge: 1000 * 60 * 60 * 24   // La sesión dura 1 día
    }
}));



// Login endpoint with MySQL query
app.get('/login', login);




app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/validate-session',validateSession);

/*
if (!req.session.correo) {
        res.status(200).send('Sesión válida');  
        return; // Exit the function after sending the response
    }

*/



//Register endpoint with MySQL query
app.get('/register', register)


//List users endpoint with MySQL query
app.get('/list-users', obtainUsers)

//Delete user endpoint with MySQL query
app.delete('/list-users', deleteUser)


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 

