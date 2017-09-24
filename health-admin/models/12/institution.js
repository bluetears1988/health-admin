import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	id: Number,
	name: String,
	cityId: Number,
	type:Number,
	address: String,
	telephone:Number,
	bprice:String,
	img:String,
	score: String,
	distance: String,
	img:String,
	introduce:String,
	pkgnum:Number,
	cards: [{
		id: Number,
		name: String,
		img: String,
		zprice: String,
		price: String
	}],
	msgnum:Number,
	msgs:[{
		account: String, 
		score:String,
		comment:String,
		date:String
	}]
})

export default mongoose.model('institution', Schema)