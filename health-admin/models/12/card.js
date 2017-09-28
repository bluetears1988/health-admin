import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	// cityID:Array,
	bprice: String,
	price: String,
	gender: Number,
	people: String,
	feature: [{
		name:String,
		img:String
	}],
	projectNum: Number,
	project:[{
		name:String,
	}],
	institutionNum: Number,
	// institutions: [{
	// 	type: ObjectId, 
	// 	ref : 'institution',
	// }],
	institutions: [{
		id: Number,
		name: String,
		img: String,
		real_price: String,
		Longitude:String,
		Latitude:String,
	}],
	images: Array,
	sales: Number,
	count: Number,
	collectNum: Number,
	related_cities:[{
		name:String,
		code:String,
	}]
	// price: String,
	// code: String,
	// location: [{
	// 	type: ObjectId, 
	// 	ref : 'city',
	// }],
})

export default mongoose.model('card', Schema)