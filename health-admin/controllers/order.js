import proxy from '../proxy'

class Ctrl{
	constructor(app) {
		Object.assign(this, {
			app, 
			model: proxy.order, 
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
		this.app.get('/api/order', this.getAll.bind(this))
		// this.app.get('/api/order/:id', this.get.bind(this))
		this.app.post('/api/order', this.post.bind(this))
		this.app.put('/api/order/:id', this.put.bind(this))
		this.app.delete('/api/order/:id', this.delete.bind(this))
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
	 * @api {get} /order 列出所有资源
	 * @apiDescription 列出所有资源
	 * @apiName getAll
	 * @apiGroup order
	 * 
	 * @apiParam {String} [page=1] 指定第几页
	 * @apiParam {String} [limit=10] 指定每页的记录数
	 * @apiParam {Boolean} [is_show] 指定is_show过滤
	 *
	 * @apiPermission none
	 * @apiSampleRequest /order
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
	// getAll(req, res, next) {
	// 	const status = req.query.type

	// 	const query = {
	// 		user  : req.user._id,
	// 		status: status,
	// 	}

	// 	status === 'all' && delete query.status

	// 	const opts = {
	// 		page : req.query.page, 
	// 		limit: req.query.limit, 
	// 	}

	// 	const params = {
	// 		query  : query, 
	// 		fields : {}, 
	// 		options: opts, 
	// 	}

	// 	const options = {
	// 		path    : 'user', 
	// 		select  : {}, 
	// 	}

	// 	Promise.all([
	// 		this.model.countAsync(query), 
	// 		this.model.findAndPopulateAsync(params, options), 
	// 	])
	// 	.then(docs => {
	// 		res.tools.setJson(0, '调用成功', {
	// 			items   : docs[1], 
	// 			paginate: res.paginate(Number(opts.page), Number(opts.limit), docs[0]), 
	// 		})
	// 	})
	// 	.catch(err => next(err))
	// }
	getAll(req, res, next) {
		let query = {}

		const status = req.query.status

		if(Object.keys(req.query).length > 0){
			for(let key in req.query){
				query[key] = req.query[key]
			}
		}

		status === 'all' && delete query.status
		
		const params = {
			query  : query, 
			fields : {}, 
			options: {}, 
		}

		const options = {
			path    : 'orders', 
			select  : {}, 
		}

		this.model.findAndPopulateAsync(params, options)
		.then(docs => res.tools.setJson(0, '调用成功', docs))
		.catch(err => next(err))
	}
	
	/**
	 * @api {get} /order/:id 获取某个指定资源的信息
	 * @apiDescription 获取某个指定资源的信息
	 * @apiName get
	 * @apiGroup order
	 *
	 * @apiParam {String} id 资源ID
	 *
	 * @apiPermission none
	 * @apiSampleRequest /order/:id
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
	// get(req, res, next) {
	// 	const query = {
	// 		_id : req.params.id, 
	// 		user: req.user._id, 
	// 	}

	// 	const params = {
	// 		query  : query, 
	// 		fields : {}, 
	// 		options: {}, 
	// 	}

	// 	const options = {
	// 		path    : 'user', 
	// 		select  : {}, 
	// 	}

	// 	this.model.findOneAndPopulateAsync(params, options)
	// 	.then(doc => {
	// 		if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
	// 		return res.tools.setJson(0, '调用成功', doc)
	// 	})
	// 	.catch(err => next(err))
	// }

	/**
	 * @api {post} /order 新建一个资源
	 * @apiDescription 新建一个资源
	 * @apiName post
	 * @apiGroup order
	 *
	 * @apiParam {String} title 标题
	 * @apiParam {String} remark 描述
	 * @apiParam {Number} sort 排序
	 * @apiParam {Boolean} is_show 是否显示
	 * @apiParam {Array} images 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /order
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
		const body = {
			user  : req.body.user,
			card  : req.body.card, 
			status  : req.body.status, 
			city  : req.body.city,
			num  : req.body.num, 
			payMethod  : req.body.payMethod,
			reportMethod  : req.body.reportMethod, 
			ctype  : req.body.ctype,
			oneprice  : req.body.oneprice, 
			totalprice  : req.body.totalprice,
			org  : req.body.org,
			remarks  : req.body.remarks,
			bookPhone  : req.body.bookPhone,
			bookDate  : req.body.bookDate,
			medicalMen  : req.body.medicalMen,
			authorized  : req.body.authorized,
			img  : req.body.img
		}

		this.model.post(body)
		.then(doc => res.tools.setJson(0, '新增成功', {_id: doc._id}))
		.catch(err => next(err))
	}

	/**
	 * @api {put} /order/:id 更新某个指定资源的信息
	 * @apiDescription 更新某个指定资源的信息
	 * @apiName put
	 * @apiGroup order
	 *
	 * @apiParam {String} id 资源ID
	 * @apiParam {String} [title] 标题
	 * @apiParam {String} [remark] 描述
	 * @apiParam {Number} [sort] 排序
	 * @apiParam {Boolean} [is_show] 是否显示
	 * @apiParam {Array} [images] 图片
	 *
	 * @apiPermission none
	 * @apiSampleRequest /order/:id
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
			// user: req.user._id, 
		}

		const body = {
			// user  : req.body.user,
			// card  : req.body.card, 
			// status  : req.body.status, 
			// city  : req.body.city,
			// num  : parseInt(req.body.num), 
			payMethod  : parseInt(req.body.payMethod),
			reportMethod  : parseInt(req.body.reportMethod), 
			// ctype  : req.body.ctype,
			// oneprice  : req.body.oneprice, 
			// totalprice  : req.body.totalprice,
			// org  : req.body.org,
			remarks  : req.body.remarks,
			// bookPhone  : req.body.bookPhone,
			// bookDate  : req.body.bookDate,
			medicalMen  : req.body.medicalMen,
			// authorized  : parseInt(req.body.authorized[0]),
			// img  : req.body.img
		}

		this.model.findOneAsync(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			doc.payMethod = body.payMethod,
			doc.reportMethod = body.reportMethod, 
			doc.remarks = body.remarks,
			doc.medicalMen = body.medicalMen;
			return doc.save()
		})
		.then(doc => res.tools.setJson(0, '更新成功', doc))
		.catch(err => next(err))
	}

	/**
	 * @api {delete} /order/:id 删除某个指定资源
	 * @apiDescription 删除某个指定资源
	 * @apiName delete
	 * @apiGroup order
	 *
	 * @apiParam {String} id 资源ID
	 * @apiSampleRequest /order/:id
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
			// user: req.user._id, 
		}
		
		this.model.delete(query)
		.then(doc => {
			if (!doc) return res.tools.setJson(1, '资源不存在或已删除')
			return res.tools.setJson(0, '删除成功')
		})
		.catch(err => next(err))
	}
}

export default Ctrl