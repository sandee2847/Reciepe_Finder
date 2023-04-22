import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [recipes, setRecipes] = useState([]);

  function handleSearchQueryChange(event) {
    setSearchQuery(event.target.value);
  }

  function handleSearchQuerySubmit(event) {
    event.preventDefault();

    fetch(`https://api.edamam.com/search?q=${searchQuery}&app_id=9ac29371&app_key=c672a2fca6e9a24e21e3e7fc1c134ebd`)
      .then((response) => response.json())
      .then((data) => setRecipes(data.hits))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <h1>Recipe Finder</h1>
        <form onSubmit={handleSearchQuerySubmit}>
          <label>
            Search for recipes:
            <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
          </label>
          <button type="submit">Search</button>
        </form>
      </div>
      {recipes.map((recipe) => (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', padding: 20 }} key={recipe.recipe.uri}>
          <h2>{recipe.recipe.label}</h2>
          <img src={recipe.recipe.image} alt={recipe.recipe.label} />
          <p>{recipe.recipe.ingredients.map((ingredient) => ingredient.text).join(", ")}</p>
          <a href={recipe.recipe.url}>View Recipe</a>
        </div>
      ))}
    </div>
  );
}

export default App;
