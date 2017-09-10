import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	rid: Number,
	nm: String,
	date: String,
})

export default mongoose.model('report', Schema)