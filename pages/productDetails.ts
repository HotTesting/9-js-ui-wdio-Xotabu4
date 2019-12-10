import { BasePage } from './base';
import { ProductDetailsModel } from '../models/productDetails';

export class ProductDetailsPage extends BasePage {
    public getProductPrice(): number {
        return parseFloat($('#box-product')
            .getAttribute('data-price'))
    }

    public getProductName(): string {
        return $('h1.title').getText()
    }

    getProductDetails(): ProductDetailsModel {
        const productDetails = new ProductDetailsModel()

        productDetails.name = this.getProductName()
        productDetails.price = this.getProductPrice()

        return productDetails
    }

    addToCart() {
        const currentItemsInCart = this.header.getQuantity()
        $('button[name="add_cart_product"]').click()
        browser.waitUntil(() => {
            return this.header.getQuantity() > currentItemsInCart
        }, null, `Expected items in cart to be changed. 
        Current items: ${this.header.getQuantity()} items before ${currentItemsInCart}`)
    }
}

export const ProductDetails = new ProductDetailsPage()
