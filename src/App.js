import React, {useEffect, useState} from 'react';
import './App.css';
import Recipe  from'./Recipe';

const App = () => {
  const APP_ID = '99355cb1';
  const APP_KEYS = '3cc876003d1a0c75ba5c557119441db1';

  const [recipes, setRecipes] = useState([]);

  //create state for the search operation
  const [search, setSearch] = useState("");
  //The finished text before the searching takes place
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEYS}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const getSearch = e => {
    //prevent page from refreshing
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }

  return (
    <div className="App">
      <form onSubmit={getSearch} className="search-form">
        <input className="search-bar" type="text" value={search} onChange={updateSearch} />
        <button className="search-button" type="submit">
          Search</button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe
          key={recipe.recipe.label}
          title={recipe.recipe.label}
          calories={recipe.recipe.calories}
          image={recipe.recipe.image}
          ingredients={recipe.recipe.ingredients}/>
      ))}
        </div>
    </div>
  )
}

export default App;
