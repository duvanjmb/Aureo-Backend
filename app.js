import express, { Router } from 'express'; 
import cors from 'cors'
import session from 'express-session';
import bcrypt from 'bcrypt';
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
import login from './login.js';
import register from './register.js';
import validateSession from './validate-session.js'; 
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoute.js';

const app = express();


app.use(express.json());

//conect backend with frontend
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}
));

//Maintain the session of the user
app.use(session({
    secret: 'tu_clave_secreta_aureo', 
    resave: false,                 
    saveUninitialized: false,       
    cookie: {
        secure: false,                
        maxAge: 1000 * 60 * 60 * 24   
    }
}
));



// Login endpoint with MySQL query
app.get('/login', login);




app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.get('/validate-session',validateSession);



//Register endpoint with MySQL query
app.post('/register', register)



app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
}); 

