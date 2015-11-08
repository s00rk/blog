var mongoose	= require('mongoose'),
	Schema		= mongoose.Schema;

var Publicacion = new Schema({
	titulo: String,
	cuerpo: String,
	visitas: Number,
	fecha: { type: Date, default: Date.now },
});