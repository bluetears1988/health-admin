import RestBase from './RestBase'
import banner from '../models/banner'
import classify from '../models/12/classify'
import goods from '../models/goods'
import cart from '../models/cart'
import address from '../models/address'
import order from '../models/12/order'
import help from '../models/help'
import user from './user'
import upload from './upload'

import card from '../models/12/card'
import city from '../models/12/city'
import project from '../models/12/project'
import feature from '../models/12/feature'
import institution from '../models/12/institution'
import member from '../models/12/member'
import report from '../models/12/report'

export default {
	report  : new RestBase(report),
	member  : new RestBase(member), 
	card    : new RestBase(card), 
	city    : new RestBase(city), 
	project : new RestBase(project), 
	feature : new RestBase(feature), 
	institution : new RestBase(institution), 
	banner  : new RestBase(banner), 
	classify: new RestBase(classify), 
	goods   : new RestBase(goods), 
	cart    : new RestBase(cart), 
	address : new RestBase(address), 
	order   : new RestBase(order), 
	help    : new RestBase(help), 
	user    : user, 
	upload  : upload, 
}