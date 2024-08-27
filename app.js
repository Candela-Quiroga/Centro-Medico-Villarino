const express = require('express'); //variable donde se llama a la libreria
const app = express(); //variable donde guardamos, donde se va a trabajar
const port = 3000; // esta variable es el puerto donde va a correr la aplicación

const rutasSaludar = require('./routes/usuario'); //Para acceder a las rutas

//middleware
app.use(express.urlencoded({
    extended: true, //es obligatorio para q funcione
}));//esto permite es decir q todas las codificaciones que pasen a traves de los metodos pot y put vengan también como un json. Todos los elementos q pasen van a llegar como json
app.use(express.json()); //siempre el usuario va a devolver json cuando algo pase. Esto permite que cuando queramos devolverle info al usuario siempre lo transforme a tipo json y el usuario lo reciba de mejor manera

//templates
app.use('/public', express.static('public'));
app.set('view engine', 'ejs'); //con esto le decimos que todos los elementos que tenemos los trabajamos sobre engine ejs, entonces permite tener las view y todos los modelos que queramos.

//rutas
app.use('/', rutasSaludar);

app.listen(port, () => { //escucha el puerto
    console.log(`El servidor corre en el puerto ${port}`);
});

