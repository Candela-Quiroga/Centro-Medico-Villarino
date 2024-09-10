const express = require('express'); //variable donde se llama a la libreria
const session = require('express-session');
const app = express(); //variable donde guardamos, donde se va a trabajar
const port = 3000; // esta variable es el puerto donde va a correr la aplicación

const rutasUsuarios = require('./routes/usuario'); //Para acceder a las rutas (archivos en la carpeta)
const rutasLogin = require('./routes/usuario');
const rutasPanel = require('./routes/panel'); //para middleware
const rutasTurnos = require('./routes/turnosRoute'); //importo las rutas para los turnos
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

// 'extended: true' permite que el cuerpo del formulario contenga objetos anidados
//app.use(bodyParser.urlencoded({ extended: true })); LO COMENTO XQ es lo mismo q la linea 21

//templates
app.use('/public', express.static('public'));
app.set('view engine', 'ejs'); //con esto le decimos que todos los elementos que tenemos los trabajamos sobre engine ejs, entonces permite tener las view y todos los modelos que queramos.

//rutas
app.use('/', rutasUsuarios);
app.use('/', rutasLogin);
app.use('/', rutasPanel); 
app.use('/', rutasTurnos);
app.use('/', rutasMedicos);

app.listen(port, () => { //escucha el puerto
    console.log(`El servidor corre en el puerto ${port}`);
});
