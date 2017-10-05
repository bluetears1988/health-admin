import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	city: String,
	// grade: Number,
	pkgNum: Number,
	pkgs:[[{
		type: ObjectId, 
		ref : 'institution',
	},{
		type: ObjectId, 
		ref : 'card',
	}]],
	// card: [{
	// 	type: ObjectId, 
	// 	ref : 'card',
	// }],
	// institution: [{
	// 	type: ObjectId, 
	// 	ref : 'institution',
	// }],
})

export default mongoose.model('classify', Schema)