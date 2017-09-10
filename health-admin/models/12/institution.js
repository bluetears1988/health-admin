import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	oid: Number,
	o_nm: String,
	address: String,
	score: String,
	distance: String,
	img:String,
	bprice:String,
	type:Number,
	telephone:Number,
	pkgnum:Number,
	msgnum:Number,
	cards: [{
		id: Number, 
		img:String,
		nm:String,
		zprice:String,
		price:String
	}],
	locateide: Number,
	msgs:[{
		account: String, 
		score:String,
		comment:String,
		date:String
	}]

})

export default mongoose.model('institution', Schema)