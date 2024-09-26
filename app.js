const express = require('express'); //variable donde se llama a la libreria
const session = require('express-session');
const app = express(); //variable donde guardamos, donde se va a trabajar
const port = 3000; // esta variable es el puerto donde va a correr la aplicación

const rutasUsuarios = require('./routes/manejoUsuariosRoute'); //Para acceder a abml de usuarios 
const rutasLogin = require('./routes/loginRoute'); //para acceder a login
const rutasPanel = require('./routes/panel'); //para middleware
const rutasTurnos = require('./routes/turnosRoute'); //importo las rutas para los turnos
const rutasPacientes = require('./routes/pacienteRoute');
const rutasMedicos = require('./routes/medicos');

//middleware
app.use(session({
    "secret": 'hola', //se va a configurar una cookie en el navegador para q no se metan en el programa
    "resave": false,
    "saveUninitialized": true,
    "cookie": {
        secure:false
    }
}));

app.use(express.urlencoded({
    extended: true, //es obligatorio para q funcione
}));//esto permite es decir q todas las codificaciones que pasen a traves de los metodos post y put vengan también como un json. Todos los elementos q pasen van a llegar como json
app.use(express.json()); //siempre el usuario va a devolver json cuando algo pase. Esto permite que cuando queramos devolverle info al usuario siempre lo transforme a tipo json y el usuario lo reciba de mejor manera
//fin middleware

//templates
app.use('/public', express.static('public'));
app.set('view engine', 'ejs'); //con esto le decimos que todos los elementos que tenemos los trabajamos sobre engine ejs, entonces permite tener las view y todos los modelos que queramos.

//rutas
app.use('/login', rutasLogin);
app.use('/usuarios', rutasUsuarios);
app.use('/panel', rutasPanel); 
app.use('/', rutasTurnos);
app.use('/', rutasPacientes);
app.use('/', rutasMedicos);

//puerto que escucha el server
app.listen(port, () => { 
    console.log(`El servidor corre en el puerto ${port}`);
});
