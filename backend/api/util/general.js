/*
-mejorar ordenamiento verificar si está ordenando

*/

var data = require('./data.json');

module.exports = {
    //permite manejar una respuesta estandar al cliente
    getResponse: function(data, isSuccess, message){
        return {
            data: data,
            isSuccess: isSuccess,
            message: message || ''
        }
    },
    //limpia un string para ser usado como parte de una expresión regular
    clearRegExp: function(text){

        //solo permite un espacio consecutivo 
        text = text.trim().replace(/\s+/g, ' ');

        //escapa caracteres especiales 
        text = (text || '').replace(/\W/ig, function(char){return "\\"+char})

        return text;
    },

    //permite setear los datos de prueba si la base de datos está vacia
    initData: function(){
        console.log('initData')
        Hotel.find({}, function(err, hotels){
            if(err){
                console.log('Error al insertar data inicial: busqueda', err)
                return;
            }

            //se inserta si no existe resultados
            if(hotels.length == 0){
                Hotel.createEach(data, function(err, resdata){
                    console.log('NUEVOS REGISTROS: ', data.length);
                });
                
            }
        });
    }

}