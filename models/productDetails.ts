
export class ProductDetailsModel {
    name: string;
    price: number;

    toString() {
        return JSON.stringify(this, null, 2)
    }
}