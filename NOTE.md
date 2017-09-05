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

## 子路由
`ng g component productDesc`
`ng g component sellerInfo`
```javascript
子路由和路由一样的配置方法，都是声明好路由的入口，路由的路径，路由的出口，不一样的是自路由是嵌套在副路由里面的并且由children表明这是子路由且可以无限循环嵌套。
路由入口：需要注意的是在子路由的入口处不能再用/来跟路径名，/会告诉angular去找跟组件，就会找到跟组件对应的模块，子路由需要用./
根路由入口：
`<a [routerLink]="['/']">主页</a>`
`<a [routerLink]="['/product']" [queryParams]="{id:1}">商品详情</a>`
`<a [routerLink]="['/home',2]">主页</a>`

子路由入口：（子路由是./）
`<a [routerLink]="['./']">商品描述</a>`
`<a [routerLink]="['./seller',99]">商品描述</a>`

路由出口：
`<router-outlet></router-outlet>`

路由路径：
const routes:Routes=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'product',component:ProductComponent,children:[
    {path:'',component:ProductdescComponent} ,
    {path:'seller/:id',component:SellerComponent}
  ]},
  {path:'home/:id',component:HomeComponent},//整个路径被划分成两段变量，一段是路径，一段时参数
  {path:'**',component:Code404Component}
];
```
## 辅助路由
`ng g component chat`
```javascript
分三步：
1.在主路由的插座也就是出口处定义一个辅助路由插座：也就是定义个辅助路由的出口：辅助路由的出口定义和主路由一样，只是辅助路由比主路由多了一个name属性：用来指定辅助路由显示那几个组件
<router-outlet></router-outlet>
<router-outlet name="aux"></router-outlet>

2.配置辅助路由路径：必须加一个outlet属性，指定该路由显示在名字叫什么的辅助路由出口（插座）上；
{path:'chat',component:XhatComponent,outlet:'aux'},

3.配置入口参数：辅助路由的参数将是一个对象，这个对象里面有一个属性outlets，这个属性的值也是一个对象，该对象里面传一个name属性指定要显示的辅助路由的名字，值是该辅助路由需要显示的组件路径；比如下面：名字叫aux的辅助路由将显示路径为chat的组件
需要注意的是当不希望辅助路由显示的时候可以吧name设置为null。
`<a [routerLink]="[{outlets:{aux:'chat'}}]">开始聊天</a>
<a [routerLink]="[{outlets:{aux:null}}]">结束聊天</a>`

当希望跳转辅助路由的同时主路由跳转到指定的组件的时候：可以在入口文件加一个属性：primary,属性的值是需要跳转的主组件的路由路径例如下面点击聊天的同时不管目前在哪个组件下主路由都会跳转回home路径下的组件
`<a [routerLink]="[{outlets:{primary:home, aux:'chat'}}]">开始聊天</a>`
```
## 路由守卫
### 相关内容也可参考《Angular 权威教程》 7.11.3 ProtectedComponent 组件和路由守卫