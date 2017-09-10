import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	account: String,
	date: String,
	organid: Number,
	score: String,
	comment: String,
})

export default mongoose.model('comment', Schema)