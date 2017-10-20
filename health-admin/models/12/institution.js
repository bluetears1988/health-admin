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
	score: {type:String,default:'5.0'},
	// location:{
	// 	Longitude:{type:Double,default:0},
	// 	Latitude:{type:Double,default:0},
	// },
	// distance: String,
	// location:{type:String,default:'0.0,0.0'},
	location:{type:[Number],index: '2d'},
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
	num:{type:Number,default:0}
	// msgs:[{
	// 	account: String, 
	// 	score:String,
	// 	comment:String,
	// 	date:String
	// }]
})

export default mongoose.model('institution', Schema)