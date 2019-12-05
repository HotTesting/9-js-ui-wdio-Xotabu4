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
        $('button[name="add_cart_product"]').click()
        browser.pause(3000);
    }
}

export const ProductDetails = new ProductDetailsPage()