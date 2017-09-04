## 新建组件
`ng g component home`

`ng g component product`

`ng g component code404`

## 启动项目
>`ng serve --port 4201  //其中， --port 4201是防止端口占用，默认可以不加。`

## 在路由时传递数据
```javascript
1. 在查询参数中传递数据
>`/product?id=1&name=2  =>  ActivedRoute.queryParams[id]`
2. 在路由路径中传递数据
>`{path:/product/:id}   => /product/1  =>  ActivedRoute.params[id]`
3. 在路由配置中传递数据
>`{path:/product,component: ProductComponent, data:[{isProd:true}]}  =>  ActivedRoute.data[0][isProd]`

参数快照 snapshot
`this.productId = this.routeInfo.snapshot.params["id"];`

参数订阅 subscribe
`this.routeInfo.params.subscribe((params: Params) => this.productId = params["id"]);`

重定向 redirectTo
`{path: '', redirectTo: 'home', pathMatch: 'full' },`
相关内容也可参考《Angular 权威教程》 7.5.3 配置路由
书籍豆瓣介绍：http://www.ituring.com.cn/book/1874
```