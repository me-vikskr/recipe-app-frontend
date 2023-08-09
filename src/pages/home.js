import React, { useEffect, useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useCookies } from "react-cookie";

export const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookies, ] = useCookies(["access_token"]);
  
  const userID = useGetUserId();

  useEffect(()=>{
    const fetchRecipes = async () => {
      try{
        const response = await axios.get("https://recipe-app-lcpu.onrender.com/recipes");
        setRecipes(response.data);
      }
      catch(err){
        console.error(err);
      }
    };

    const fetchSavedRecipe = async () => {
      try{
        const response = await axios.get(`https://recipe-app-lcpu.onrender.com/recipes/savedRecipes/ids/${userID}`);
        setSavedRecipes(response.data.savedRecipes);
      }
      catch(err){
        console.error(err);
      }
    };

    fetchRecipes();

    if(cookies.access_token) fetchSavedRecipe();
  }, []);
  
  const saveRecipe = async (recipeID) => {
    try{
      const response = await axios.put("https://recipe-app-lcpu.onrender.com/recipes", {
        recipeID, 
        userID
      },
      {headers: { authorization: cookies.access_token }});
      setSavedRecipes(response.data.savedRecipes);
    }
    catch(err){
      console.error(err);
    }
  };

  const isRecipeSaved = (id) => savedRecipes.includes(id);

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <div>
              
              <h2>{recipe.name}</h2>

              <button 
                onClick={()=> saveRecipe(recipe._id)}
                disabled = {isRecipeSaved(recipe._id)}
              >
                {isRecipeSaved(recipe._id) ? "Saved" : "Save"}
              </button>

            </div>

            <div className="instructions">
              <p>{recipe.instructions}</p>
            </div>

            <img src={recipe.imageUrl} alt={recipe.name} />
            
            <p>Cooking Time: {recipe.cookingTime} (in minutes)</p>
          
          </li>
        ))}
      </ul>
    </div>
  );
}