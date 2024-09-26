class WebController{

        //Mostrar homepage
        mostrarHome(req,res){
            res.render('web/home', {title: 'Centro Médico - Inicio' });
        }
    
        //Mostrar pagina nosotros
        mostrarNosotros(req,res){
            res.render('web/nosotros', {title: 'Sobre Nosotros'});
        }
    
        //Mostrar pagina profesionales
        mostrarProfesionales(req,res){
            res.render('web/profesionales', {title: 'Nuestros profesionales'});
        }
    
        //Mostrar pagina coberturas
        mostrarCoberturas(req,res){
            res.render('web/coberturas', {title: 'Coberturas Médicas'});
        }

        //Mostrar pagina contacto
        mostrarContacto(req,res){
            res.render('web/contacto', {title: 'Contacto'});
        }


}

module.exports = WebController;