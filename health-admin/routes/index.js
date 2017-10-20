import common from '../controllers/common'
import qiniu from '../controllers/qiniu'
import banner from '../controllers/banner'
import classify from '../controllers/classify'
import goods from '../controllers/goods'
import card from '../controllers/card'
import address from '../controllers/address'
import order from '../controllers/order'
import help from '../controllers/help'
import city from '../controllers/city'
import member from '../controllers/member'
import project from '../controllers/project'
import feature from '../controllers/feature'
import institution from '../controllers/institution'
import report from '../controllers/report'

export default function(app) {
	new common(app)
	new qiniu(app)
	new banner(app)
	new classify(app)
	new report(app)
	new member(app)
	new goods(app)
	new card(app)
	new address(app)
	new order(app)
	new help(app)
	new city(app)
	new project(app)
	new feature(app)
	new institution(app)
}