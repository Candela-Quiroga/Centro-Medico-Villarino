class WebController{

        //Mostrar homepage
        mostrarHome(req,res){
            res.render('home', {title: 'Centro Médico - Inicio' });
        }
    
        //Mostrar pagina nosotros
        mostrarNosotros(req,res){
            res.render('nosotros', {title: 'Sobre Nosotros'});
        }
    
        //Mostrar pagina profesionales
        mostrarProfesionales(req,res){
            res.render('profesionales', {title: 'Nuestros profesionales'});
        }
    
        //Mostrar pagina coberturas
        mostrarCoberturas(req,res){
            res.render('coberturas', {title: 'Coberturas Médicas'});
        }

        //Mostrar pagina contacto
        mostrarContacto(req,res){
            res.render('contacto', {title: 'Contacto'});
        }


}

module.exports = WebController;