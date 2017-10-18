import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const medicalMenSchema = mongoose.Schema({
		name:String,
		idcard:String,
		phone:String,
		checkDate:String
	});

const Schema = mongoose.Schema({
	user: String,
	status:Number,
	city:String,
	card:String,
	num: Number,
	ctype:String,
	oneprice:String,
	totalprice:String,
	org:{name:String,address:String,phone:String},
	reportMethod:Number,
	payMethod:Number,
	remarks:String,
	bookPhone:String,
	bookDate:String,
	medicalMen:Array,
	authorized:{
		type:Boolean,
		default:true
	},
	img: String,

	// userid: Number,
	// cardid: Number,
	// cardtype:Number,
	// orderid: Number,
	// nm: String,
	// organid:Number,
	// organaddress:String,
	// reserver_tele:Number,
	
	// reportCollectMode:Number,
	// o_nm: String,
	// type: Number,
	// zprice: String,
	// cardnum: Number,
	// img: String,
	// totalprice:String,
})

export default mongoose.model('order', Schema)