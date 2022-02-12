import http from "../http-common";

class CookbookDataService {

    healthCheck() {
        return http.get("/healthCheck");
    }

    clearDatabase() {
        return http.delete("/clearDatabase");
    }

    createRecipe() {
        return http.post("/createRecipe", data);
    }

    addIngredient() {
        return http.post("/addIngredient", data);
    }

    searchRecipes() {
        return http.get(`/searchRecipes?searchTerm=${searchTerm}`);
    }

    searchIngredients() {
        return http.get(`/searchIngredients?searchTerm=${searchTerm}`);
    }
}

export default new CookbookDataService();