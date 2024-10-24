//vamos a trabajar con la librería Multer para poder cargar img 
const multer = require("multer");
const path = require("path");



//Configuración del storage (donde se van a guardar las img)
const storage = multer.diskStorage({
    destination: "./public/uploads", //todos los archivos que subimos van a ir a esa carpeta
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname)) //lo concatenamos con la fecha de este momento para evitar la repetición de nombres. Sería nombre del archivo + fecha actual + extensión del archivo
    }//para evitar que se sobreescriban archivos con el mismo nombre cambiamos el nombre del archivo
})


//Configuración del Multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: (1024 * 1024) * 3 * 3, //tamaño máximo permitido: 9mb
    },
    fileFilter: (req, file, callback) => {
        const mimeTypesPermitidos = ['image/jpg', 'image/png', 'image/jpeg'];
        //Consultamos si el mimetype de la imagen que el usuario nos envía se encuentra dentro del array de los permitidos
        if(mimeTypesPermitidos.includes(file.mimetype)){
            callback(null, true); //el archivo se subió correctamente
        }else{
            callback("Solo se pueden subir archivos de tipo imagen");
        }
    }
});

module.exports = upload;