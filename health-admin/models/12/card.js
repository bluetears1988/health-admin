import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	id: Number,
	nm: String,
	collect: Boolean,
	collect_num: Number,
	sales: Number,
	count: Number,
	zprice: String,
	price: String,
	code: String,
	location: [{
		type: ObjectId, 
		ref : 'city',
	}],
	institution: [{
		type: ObjectId, 
		ref : 'institution',
	}],
})

export default mongoose.model('card', Schema)