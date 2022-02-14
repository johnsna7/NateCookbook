import axios from "axios";
export default axios.create({
  baseURL:
    "https://sandbox-nate-dev-challenge-developer-edition.cs79.force.com/services/apexrest/cookbook",
  headers: {
    "Content-type": "application/json",
  },
});
