// middleware/sessionData.js
module.exports = (req, res, next) => {
    if (req.session) {
        res.locals.nombreUsuario = req.session.nombreUsuario;
        res.locals.emailUsuario = req.session.emailUsuario;
        res.locals.categoria = req.session.categoria; 
    }
    next();
};
