/**
 * HotelController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
var GeneralUtil = require('../util/general')
var HotelDbDisk = require('../db/HotelDbDisk');

//si no se tiene data insertada se la inserta
//metodo creado para la obtener datos de prueba
GeneralUtil.initData();

module.exports = {
    //filtra los hoteles por su nombre
    //param: name {string}: nombre de hotel usado para filtrar
    //param: stars {number}: número de estrellas
    //param: page {number}: página de consulta    
    //param: order {string}: nombre del campo a ordenar
    //param: isDesc {boolean}: bandera para definir dirección de ordenamiento
    filter: function(req, res){
        //manejador de base de datos
        var HotelDb = HotelDbDisk();

        //parametros de búsqueda
        var name = req.param('name') || '';
        var stars = req.param('stars');
        var order = req.param('order') || 'name';
        var orderFlag = req.param('isDesc') ? -1 : 1;
        
        //arma query
        var vRegExp = new RegExp(GeneralUtil.clearRegExp(name), 'i');
        var query = {name: {$regex: vRegExp}};
        if(stars && stars != 0){
            query.stars = Number(stars)
        }

        //parametros de paginación
        var page = req.param('page') || 0;
        var options = {};
        options.query = query;
        options.limit = 20;        
        options.skip = page * (options.limit + 1);
        options.sort = {};
        options.sort[order] = orderFlag;
       

        HotelDb.findUsingPage(options, function(err, hotels){
            //el estado de la respuesta dependerá de la existencia de error (variable err)
            res.json(GeneralUtil.getResponse(hotels, !err, (err || {}).message));
        });
    },

    //Crea un hotel
    //param: id {string}: id de hotel
    //param: name {string}: nombre de hotel
    //param: stars {number}: cantidad de estrellas
    //param: image {string}: imagen   
    //param: price {string}: precio
    //param: amenities {string}: comodidadesamenities
    create: function(req, res){
        Hotel.create(req.allParams(), function(err, hotel){
            //el estado de la respuesta dependerá de la existencia de error (variable err)
            res.json(GeneralUtil.getResponse(hotel, !err, (err || {}).message));
        });
    },

    //Actualiza un hotel
    //param: id {string}: id de hotel
    //param: name {string}: nombre de hotel
    //param: stars {number}: cantidad de estrellas
    //param: image {string}: imagen   
    //param: price {string}: precio
    //param: amenities {string}: comodidadesamenities
    update: function(req, res){
        Hotel.update({id: req.param("id")})
            .set(req.allParams())
            .exec(function(err, hotel){
                //el estado de la respuesta dependerá de la existencia de error (variable err)
                res.json(GeneralUtil.getResponse(hotel, !err, (err || {}).message));
            });
    },

    //Elimina un hotel
    //param: id {string}: id de hotel
    delete: function(req, res){
        
        Hotel.destroy({id: req.param("id")}, function(err, hotel){
            //el estado de la respuesta dependerá de la existencia de error (variable err)
            res.json(GeneralUtil.getResponse(hotel, !err, (err || {}).message));
        });
    },
    


};

