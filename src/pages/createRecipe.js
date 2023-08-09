import React, { useState } from "react";
import axios from "axios";
import { useGetUserId } from "../hooks/useGetUserId";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export const CreateRecipe = () => {
  const userID = useGetUserId();

  const [cookies, ] = useCookies(["access_token"]);
  
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const {name, value} = event.target;

    setRecipe({...recipe, [name]: value});
  };

  const handleIngredientChange = (event, idx) => {
    const {value} = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const addIngredients = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try{
      await axios.post(
        "https://recipe-app-lcpu.onrender.com/recipes", 
        {...recipe},
        {
          headers: {authorization: cookies.access_token},
        }
      );
      alert("Recipe added");
      navigate("/");
    }
    catch(err){
      console.error(err);
    }
  }

  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input 
          type="text" 
          id="name" 
          name="name" 
          value={recipe.name}
          onChange = {handleChange} 
        />
        
        <label htmlFor="ingredients">Ingredients</label>
        {recipe.ingredients.map((ingredient, idx) => (
          <input 
            key={idx} 
            type="text" 
            name="ingredients" 
            value={ingredient} 
            onChange = {(event) => handleIngredientChange(event, idx)}
          />
        ))}
        <button type="button" onClick={addIngredients}>Add Ingredients</button>

        <label htmlFor="instructions">Instructions</label>
        <textarea 
          id="instructions" 
          name="instructions" 
          value={recipe.instructions}
          onChange = {handleChange}
        ></textarea>

        <label htmlFor="imageUrl">Image URL</label>
        <input 
          type="text" 
          id="imageUrl" 
          name="imageUrl" 
          value={recipe.imageUrl}
          onChange = {handleChange} 
        />

        <label htmlFor="cookingTime">Cooking Time (in minutes)</label>
        <input 
          type="number" 
          id="cookingTime" 
          name="cookingTime"
          value={recipe.cookingTime} 
          onChange = {handleChange} 
        />
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
}