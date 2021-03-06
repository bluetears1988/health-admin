import proxy from '../proxy'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			model: proxy.institution, 
		})

		this.init()
	}

	/**
	 * 初始化
	 */
	init() {
		this.routes()
	}

	/**
	 * 注册路由
	 */
	routes() {
		this.app.get('/api/institution', this.getAll.bind(this))
		// this.app.get('/api/feature/:id', this.get.bind(this))
		this.app.post('/api/institution', this.post.bind(this))
		this.app.put('/api/institution/:id', this.put.bind(this))
		this.app.delete('/api/institution/:id', this.delete.bind(this))
		// this.app.post('/api/cart/clear', this.clear.bind(this))
	}

	/**
	 * @apiDefine Header
	 * @apiHeader {String} Authorization jsonwebtoken
	 */
	
	/**
	 * @apiDefine Success
	 * @apiSuccess {Object} meta 状态描述
	 * @apiSuccess {Number} meta.code 标识码，0表示成功，1表示失败
	 * @apiSuccess {String} meta.message 标识信息
	 * @apiSuccess {Object} data 数据内容
	 */
	
	/**
	 * @api {get} /cart 列出所有资源
	 * @apiDescription 列出所有资源
	 * @apiName getAll
	 * @apiGroup cart
	 * 
	 * @apiParam {String} [page=1] 指定第几页
	 * @apiParam {String} [limit=10] 指定每页的记录数
	 * @apiParam {Boolean} [is_show] 指定is_show过滤
	 *
	 * @apiPermission none
	 * @apiSampleRequest /cart
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": [{
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }]
	 *     }
	 */
	getAll(req, res, next) {
		// const query = {
		// 	city: req.query.city
		// }

		let query = {}
		let sort = {}
		let location = false;

		if(Object.keys(req.query).length > 0){
			for(let key in req.query){
				if(key.indexOf("location") !== -1){
					location = true;
					query[key] = {$near:req.query[key].split(',')};
					// this.model.geoNear(req.query[key].split(','), function(err,results, stats) {
     // 					console.trace(results)});
					// sort[key] = 1;
				}else{
					if(key.indexOf("sort") !== -1){
						sort[key.split('.')[1]] = req.query[key]
					}else{
						query[key] = req.query[key]
					}
				}
			}
		}

		const params = {
			query  : query, 
			fields : {}, 
			options: {'sort':sort}  
		}

		const options = {
			path    : 'institutions', 
			select  : {}, 
		}

		if(location){
			this.model.sortBygeoNear(params, options, res);
			// res.tools.setJson(0, '调用成功', docs);
			// let lat = parseFloat(params.query['location']['$near'][0]);
			// let lon = parseFloat(params.query['location']['$near'][1]);
			// let points = [];
			// points.push(lat);
			// points.push(lon);

			// this.model.geoNear(points, {distanceMultiplier: 111},function(err, docs) {
			// 	if(err){
			// 		console.error(err);
			// 	}else{
			// 		console.trace('docs:',docs);
			// 		res.tools.setJson(0, '调用成功', docs)
			// 	}	
			// });
		}else{
			this.model.findAndPopulateAsync(params, options)
			.then(docs => res.tools.setJson(0, '调用成功', docs))
			.catch(err => next(err))
		}

		
	}
	
	/**
	 * @api {get} /cart/:id 获取某个指定资源的信息
	 * @apiDescription 获取某个指定资源的信息
	 * @apiName get
	 * @apiGroup cart
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /cart/:id
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "调用成功"
	 *       },
	 *       "data": {
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	get(req, res, next) {
		const query = {
			_id : req.params.id, 
			user: req.user._id, 
		}

		const params = {
			query  : query, 
			fields : {}, 
			options: {}, 
		}

		const options = {
			path    : 'goods', 
			select  : {}, 
		}

		this.model.findOneAndPopulateAsync(params, options)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '调用成功', doc)
		})
		.catch(err => next(err))
	}

	/**
	 * @api {post} /cart 新建一个资源
	 * @apiDescription 新建一个资源
	 * @apiName post
	 * @apiGroup cart
	 *
	 * @apiParam {String} title 标题
	 * @apiParam {String} remark 描述
	 * @apiParam {Number} sort 排序
	 * @apiParam {Boolean} is_show 是否显示
	 * @apiParam {Array} images 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /cart
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "新增成功"
	 *       },
	 *       "data": {
	 *       	"_id": "_id"
	 *       }
	 *     }
	 */
	post(req, res, next) {
		// debugger;
		// var t = req.pkgname;
		// console.trace("error:", req.body);

		const body = {
			name  : req.body.name, 
			introduce  : req.body.introduce,
			type  : req.body.type,
			address  : req.body.address,
			telephone  : req.body.telephone,
			bprice  : req.body.bprice,
			city  : req.body.city,
			img: req.body.img,
			location: req.body.location.split(','),
			cards: req.body.cards
		}

		this.model.post(body)
		.then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
		.catch(err => next(err))
		// res.send("ok");
		// res.tools.setJson(1, '资源不存在或已删除')
		// const query = {
		// 	goods : req.body.goods, 
		// 	user : req.user._id, 
		// }

		// const body = {
		// 	goods : req.body.goods, 
		// 	total: Number(req.body.total) || 1, 
		// 	user : req.user._id, 
		// }

		// const p1 = proxy.goods.findByIdAsync(query.goods)
		// const p2 = this.model.findOneAsync(query)

		// Promise.all([p1, p2])
		// .then(doc => {
		// 	const goods = doc[0]
		// 	const cart  = doc[1]

		// 	if (!goods) return res.tools.setJson(1, '资源不存在或已删除')

		// 	if (!cart) {
		// 		body.amount = goods.price
		// 		body.totalAmount = goods.price * body.total
		// 		return this.model.post(body)
		// 	}

		// 	cart.total = cart.total + body.total
		// 	cart.amount = goods.price
		// 	cart.totalAmount = goods.price * cart.total
		// 	return cart.save()
		// })
		// .then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
		// .catch(err => next(err))
	}

	/**
	 * @api {put} /cart/:id 更新某个指定资源的信息
	 * @apiDescription 更新某个指定资源的信息
	 * @apiName put
	 * @apiGroup cart
	 *
	 * @apiParam {String} id 资源ID
	 * @apiParam {String} [title] 标题
	 * @apiParam {String} [remark] 描述
	 * @apiParam {Number} [sort] 排序
	 * @apiParam {Boolean} [is_show] 是否显示
	 * @apiParam {Array} [images] 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /cart/:id
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "更新成功"
	 *       },
	 *       "data": {
	 *       	"_id": "_id",
	 *       	"images": [{
	 *       		"_id": "_id",
	 *       		"name": "name",
	 *       		"path": "path",
	 *       		"create_at": "create_at"
	 *       	}],
	 *       	"is_show": "is_show",
	 *       	"remark": "remark",
	 *       	"sort": "sort",
	 *       	"title": "title",
	 *       	"create_at": "create_at",
	 *       	"update_at": "update_at"
	 *       }
	 *     }
	 */
	put(req, res, next) {
		const query = {
			_id : req.params.id, 
		}

		const body = {
			name  : req.body.name, 
			introduce  : req.body.introduce,
			type  : req.body.type,
			address  : req.body.address,
			telephone  : req.body.telephone,
			bprice  : req.body.bprice,
			city  : req.body.city,
			img: req.body.img,
			location: req.body.location.split(','),
			cards: req.body.cards
		}

		this.model.findOneAsync(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			// doc.total = Math.abs(body.total)
			// doc.totalAmount = Math.abs(doc.amount * doc.total)
			doc.name = body.name, 
			doc.introduce = body.introduce,
			doc.type = body.type,
			doc.address = body.address,
			doc.telephone = body.telephone,
			doc.bprice = body.bprice,
			doc.city = body.city,
			doc.img = body.img,
			doc.img = body.img,
			doc.location = body.location;
			return doc.save()
		})
		.then(doc => res.tools.setJson(0, '更新成功', doc))
		.catch(err => next(err))
	}

	/**
	 * @api {delete} /cart/:id 删除某个指定资源
	 * @apiDescription 删除某个指定资源
	 * @apiName delete
	 * @apiGroup cart
	 *
	 * @apiParam {String} id 资源ID
	 * @apiSampleRequest /cart/:id
	 * 
	 * @apiPermission none
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "删除成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	delete(req, res, next) {
		const query = {
			_id : req.params.id, 
		}
		
		this.model.delete(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '删除成功')
		})
		.catch(err => next(err))
	}

	/**
	 * @api {clear} /cart/clear 清空某个指定资源
	 * @apiDescription 清空某个指定资源
	 * @apiName clear
	 * @apiGroup cart
	 *
	 * @apiSampleRequest /cart/clear
	 * 
	 * @apiPermission none
	 * 
	 * @apiUse Header
	 * @apiUse Success
	 *
	 * @apiSuccessExample Success-Response:
	 *     HTTP/1.1 200 OK
	 *     {
	 *       "meta": {
	 *       	"code": 0,
	 *       	"message": "删除成功"
	 *       },
	 *       "data": null
	 *     }
	 */
	clear(req, res, next) {
		const query = {
			user: req.user._id
		}

		this.model.removeAsync(query)
		.then(doc => res.tools.setJson(0, '删除成功'))
		.catch(err => next(err))
	}
}

export default Ctrl