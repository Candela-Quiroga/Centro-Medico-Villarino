//middleware autenticacion.js

module.exports = (rolesPermitidos) => {
    return (req, res, next) => {
        if (req.session && req.session.idUsuario) {
            const categoriaUsuario = req.session.categoria; 
            
            if (rolesPermitidos.includes(categoriaUsuario)) {
                return next(); 
            } else {
                return res.status(403).send('Acceso denegado. No tienes los permisos necesarios.'); 
            }
        } else {
            res.redirect('/login'); 
        }
    };

};