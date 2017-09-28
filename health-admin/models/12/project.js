
import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	content: String,
	aim: String
	// card: [{
	// 	type: ObjectId, 
	// 	ref : 'card',
	// }],
	// institution: [{
	// 	type: ObjectId, 
	// 	ref : 'institution',
	// }],
})

export default mongoose.model('project', Schema)