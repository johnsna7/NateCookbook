import http from "../http-common";

class CookbookDataService {

    healthCheck() {
        return http.get("/healthCheck");
    }

    clearDatabase() {
        return http.delete("/clearDatabase");
    }
    createRecipe(data) {
        return http.post("/createRecipe", data);
    }

    addIngredient(data) {
        return http.post("/addIngredient", data);
    }

    searchRecipes(searchTerm) {
        return http.get(`/searchRecipes?searchTerm=${searchTerm}`);
    }

    searchIngredients(searchTerm) {
        return http.get(`/searchIngredients?searchTerm=${searchTerm}`);
    }

}

export default new CookbookDataService();