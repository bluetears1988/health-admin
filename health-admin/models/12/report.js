import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	idcard: String,
	status:{type:String,default:'已录入'},
	name: String,
	date: {type:Date, default:Date.now},
	card: String,
	org: String,
})

export default mongoose.model('report', Schema)