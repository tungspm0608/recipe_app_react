import { useEffect, useState } from 'react';
import './App.css';
import Recipe from './Recipe'

const App = () => {

  const APP_ID = '581f38bd';
  const APP_KEY = 'bce694a1c01cf2770d9d529fb1f90247';

  const [recipes,setRecipes] = useState([]);
  const [search , setSearch] = useState("")
  const [query , setQuery] = useState('chicken')


  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`)
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }

  useEffect(() => {
    getRecipes();
  },[query])

  const updateSearch = e => {
    setSearch(e.target.value)
  }

  const getSearch = (e) => {
    console.log('get');
    e.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input onChange={updateSearch} className='search-bar' type='text' value={search}/>
        <button className='search-button' type='submit'>Search</button>
      </form>
      <div className="recipes">
        {recipes.map(recipe => (
          <Recipe ingredients={recipe.recipe.ingredients} key={recipe.recipe.label} title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
        ))}  
      </div>  
    </div>
  )
}

export default App;
