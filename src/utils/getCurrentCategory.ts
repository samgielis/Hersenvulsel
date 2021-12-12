import { Category } from "../types/Category";

const allCategories: Category[] = ["natuur", "entertainment", "faitsdivers", "wetenschap", "mensen", "geschiedenis"];
export function getCurrentCategory(): Category | "default" {
    const currentLocation = window.location.href;
    for (let category of allCategories) {
        if (currentLocation.indexOf(`/${category}/`) > -1) {
            return category;
        }
    }
    return "default";
}
