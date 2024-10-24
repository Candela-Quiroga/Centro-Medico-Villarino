//app.js
const express = require('express'); //variable donde se llama a la libreria
const session = require('express-session'); //importa el middleware para manejo de sesiones
const app = express(); //variable donde guardamos
const port = 3000; //puerto donde corre la app

//importo middleware para guardar los datos de inicio de sesión
const sessionData = require('./middleware/sessionData');


const rutasUsuarios = require('./routes/manejoUsuariosRoute'); //Para acceder a ABML de usuarios 
const rutasLogin = require('./routes/loginRoute'); //para acceder a login
const rutasTurnos = require('./routes/turnosRoute'); //importo las rutas para los turnos
const rutasPacientes = require('./routes/pacienteRoute');
const rutasMedicos = require('./routes/medicosRoute');
const rutasWeb = require('./routes/webRoute'); //importo rutas para home, nosotros, etc.
const rutasHistoriaClinica = require('./routes/historiaClinicaRoute');
const rutasHorarios = require('./routes/horariosRoute');
const rutasPanelSecretaria = require('./routes/panelSecretariasRoute');
const rutasPanelAdmin = require('./routes/panelAdminRoute');


//middleware
app.use(session({
    "secret": 'secret', //se va a configurar una cookie en el navegador para q no se metan en el programa
    "resave": true,
    "saveUninitialized": true,
    "cookie": {
        secure:false
    }
}));

// Middleware para manejar los datos de sesión
app.use(sessionData);

app.use(express.urlencoded({
    extended: true, //es obligatorio para q funcione
}));// Todos los elementos q pasen van a llegar como json
app.use(express.json()); //siempre el usuario va a devolver json cuando algo pase. Esto permite que cuando queramos devolverle info al usuario siempre lo transforme a tipo json y el usuario lo reciba de mejor manera
//fin middleware

//templates
app.use('/public', express.static('public'));

app.set('views', './views');
app.set('view engine', 'ejs'); //con esto le decimos que todos los elementos que tenemos los trabajamos sobre engine ejs, entonces permite tener las view y todos los modelos que queramos.

//rutas app.use dice la primera barra es de donde va a arrancar la ruta y los otros son los archivos q voy a incluir q van a partir de esto
app.use('/', rutasLogin);
app.use('/', rutasUsuarios);
app.use('/', rutasTurnos);
app.use('/', rutasPacientes);
app.use('/', rutasMedicos);
app.use('/', rutasWeb);
app.use('/', rutasHistoriaClinica);
app.use('/', rutasHorarios);
app.use('/', rutasPanelSecretaria);
app.use('/', rutasPanelAdmin);


//muestra el puerto que escucha el server
app.listen(port, () => { 
    console.log(`El servidor corre en el puerto ${port}`);
});
