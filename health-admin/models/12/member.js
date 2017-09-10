import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	mid:Number,
	userid: Number,
	nm: String,
	score: String,
	telephone: Number,
})

export default mongoose.model('member', Schema)