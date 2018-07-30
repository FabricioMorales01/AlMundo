//modulo necesario para permitir el llamado de NeDB directament de el Modelo Hoteles

function HotelDb(_hotel){
    this.hotel = _hotel || Hotel;
    this.db = Hotel._adapter.datastores[Hotel.datastore].dbs.hotel;
}


HotelDb.prototype.findUsingPage = function(options, cb){
    this.db
    .find(options.query || {})
    .sort(options.sort)
    .skip(options.skip)
    .limit(options.limit)    
    .exec(cb);
}

//solo se crea una instancia del elemento
HotelDb._hotelDb = null;
module.exports = function(hotel){   
    if(HotelDb._hotelDb  === null){
        HotelDb._hotelDb = new HotelDb(hotel);
    }
    return HotelDb._hotelDb ;
};