import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	idcard: String,
	name: String,
	nickName: String,
	score: {type:Number,default:100},
	telephone: Number,
	sexy:String,
	user:String
})

export default mongoose.model('member', Schema)