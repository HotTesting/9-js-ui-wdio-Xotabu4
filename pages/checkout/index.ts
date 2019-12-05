import { BasePage } from '../base';
import { ShoppingCart } from './components/shoppingCart';


export class CheckoutPage extends BasePage {
    shoppingCart: ShoppingCart = new ShoppingCart()
    
    private get noItemsLabel() { return $('.cart.wrapper em') }

    open() {
        super.open('/checkout')
    }

    isNoItemsInCart() {
        if(this.noItemsLabel.isDisplayed()) {
            return this.noItemsLabel.getText()
                .includes('There are no items in your cart.')
        } else {
            return false
        }
    }

    isItemsInCart() {
        return !this.isNoItemsInCart()
    }
}

export const Checkout = new CheckoutPage()