import { QuantityType } from "./quantity";

export class Ingredient {
    constructor(public id: number, public name: string, public quantityType: QuantityType) {
    }
}