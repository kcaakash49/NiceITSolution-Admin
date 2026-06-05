import type { CategorySchema } from "@kcaakash/validators"


export interface CategoryType extends CategorySchema {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    products?: any

}


export interface CategoriesType {
    id: string;
    name:string;
    image?:string;
}