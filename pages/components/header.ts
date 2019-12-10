export class Header {
    getQuantity(): number {
        let quantity = $('#header #cart .quantity').getText()
        return parseInt(quantity)
    }
}