import { ProductDetails } from './productDetails';
import { Checkout } from './checkout';
import { Login } from './login';

export class Application {
    product = ProductDetails
    checkout = Checkout
    login = Login
}

export const App: Application = new Application()