import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	userid: Number,
	cardid: Number,
	cardtype:Number,
	orderid: Number,
	nm: String,
	organid:Number,
	organaddress:String,
	reserver_tele:Number,
	authorize:{
		type:Boolean,
		default:true
	},
	reportCollectMode:Number,
	o_nm: String,
	type: Number,
	zprice: String,
	cardnum: Number,
	img: String,
	totalprice:String,
	status:Number,
	count: Number,
	orderdate:String,
	medicalMen:[{
		nm:String,
		idcard:Number,
		telephone:Number,
		sexy:Number,
		date:String,
	}]
	
})

export default mongoose.model('order', Schema)