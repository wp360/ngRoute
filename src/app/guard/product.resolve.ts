import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Product } from '../product/product.component';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductResolve implements Resolve<Product> {
    constructor(private router: Router) {

    }
    // 这里的ActivatedRouteSnapshot可以直接获取路由里面的参数，因此接下来就可以直接获取参数值
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Product | Observable<Product> | Promise<Product> {
        let productId:number = route.params["id"];
        if(productId == 1){
            return new Product(1,"iPhone7");
        }else{
            this.router.navigate(['/home']);
            return undefined;
        }

    }
}