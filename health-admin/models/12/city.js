import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	grade: Number,
	code: String,
	pcode: String,
	location:{type:[Number],index: '2d'},
	// location:{
	// 	Longitude:String,
	// 	Latitude:String,
	// },
	// card: [{
	// 	type: ObjectId, 
	// 	ref : 'card',
	// }],
	// institution: [{
	// 	type: ObjectId, 
	// 	ref : 'institution',
	// }],
})

export default mongoose.model('city', Schema)