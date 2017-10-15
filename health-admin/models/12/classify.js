import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	// id: Number,
	name: String,
	city: String,
	// grade: Number,
	pkgNum: Number,
	pkgs:[{
		orgName: String,
		cardName: String,
		price: String,
		real_price: String,
		sales:Number
	}],
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