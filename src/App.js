import { React, useEffect, useState } from "react";
import axios from "axios";
import Recipe from "./Recipe";
import "./App.css";

function App() {
  const [recipes, setRecipes] = useState([]);
  const [food, setFood] = useState("");
  const [query, setQuery] = useState("");

  const APP_ID = "4231e9a9";
  const APP_KEY = "0ed7d31de3afb8527456a1892c05f66f";

  async function getRecipe() {
    const response = await axios.get(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`
    );
    setRecipes(response.data.hits);
  }

  useEffect(() => {
    getRecipe();
  }, [query]);

  return (
    <div className="App">
      <h2>Recipe Finder</h2>
      <form
        className="search-form"
        onSubmit={(e) => {
          e.preventDefault();
          setQuery(food);
          setFood("");
        }}
      >
        <input
          className="search-bar"
          type="text"
          value={food}
          onChange={(e) => setFood(e.target.value)}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe) => (
          <Recipe
            key={recipe.recipe.label}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image}
            ingredients={recipe.recipe.ingredients}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
