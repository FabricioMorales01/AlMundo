/**
 * Hotel.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    id: { type: 'string', unique: true, required: true },
    name: { type: 'string', required: true },
    price: { type: 'number', defaultsTo: 0 },
    stars: { type: 'number', defaultsTo: 0 },
    image: { type: 'string', defaultsTo: ''},
    amenities: { type: 'json', defaultsTo: [] }
  }

};

