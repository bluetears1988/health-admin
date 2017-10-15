import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	// related_cities:[{
	// 	name: String,
	// 	Code: String,
	// }],
	city:String,
	related_cities: String,
	type:Number,
	address: String,
	telephone:String,
	bprice:String,
	img:String,
	score: String,
	location:{
		Longitude:String,
		Latitude:String,
	},
	// distance: String,
	introduce:String,
	pkgnum:Number,
	cards: [{
		name: String,
		img: String,
		price: String,
		real_price: String,
		sales:Number
	}],
	msgnum:Number,
	msgs: [{
		type: ObjectId, 
		ref : 'comment',
	}],
	// msgs:[{
	// 	account: String, 
	// 	score:String,
	// 	comment:String,
	// 	date:String
	// }]
})

export default mongoose.model('institution', Schema)