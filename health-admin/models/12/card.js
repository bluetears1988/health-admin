import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	id: Number,
	name: String,
	cityID:Array,
	bprice: String,
	zprice: String,
	gender: Number,
	peopleID: Number,
	feature: Array,
	checkNum: Number,
	checkUp:Array,
	institutionNum: Number,
	institutions: [{
		type: ObjectId, 
		ref : 'institution',
	}],
	images: Array,
	sales: Number,
	count: Number,
	collectNum: Number,
	// price: String,
	// code: String,
	// location: [{
	// 	type: ObjectId, 
	// 	ref : 'city',
	// }],
})

export default mongoose.model('card', Schema)