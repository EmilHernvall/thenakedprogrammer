import { Ingredient } from "./ingredient";

export class IngredientQuantity {
    constructor(public id: number, public ingredient: Ingredient, public quantity: number) {
    }
}

export class Recipe {
    public id: number;
    public name: string;
    public summary: string;
    public instructions: string;
    public ingredients: IngredientQuantity[];

    constructor(id: number, name: string, summary: string, instructions: string, ingredients: IngredientQuantity[]) {
        this.id = id;
        this.name = name;
        this.summary = summary;
        this.instructions = instructions;
        this.ingredients = ingredients;
    }
}