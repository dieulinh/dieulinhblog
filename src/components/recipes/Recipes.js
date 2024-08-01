import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectRecipes, fetchRecipes, isRecipesLoading, createRecipe} from '../../features/recipes/recipesSlice';

const Recipes = () => {
  const [title, setTitle] = useState('');
  const [instructions, setInstructions] = useState('');
  const [description, setDescription] = useState('');
  const recipes = useSelector(selectRecipes);
  const loading = useSelector(isRecipesLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInstructionChange = (e) => {
    setInstructions(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRecipe({ title, instructions, description }));
    // Handle form submission logic here
    // You can access the values of title, instruction, and description using the state variables
    // For example: console.log(title, instruction, description);
  };

  return (
    <div>
      <ul>
        {loading && <p>Loading...</p>}
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>{recipe.instructions}</p>
          </li>
        ))}
      </ul>
      <h2>Create Recipe</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="form-group">
          <label>
            Title
            <div>
              <input
                id="username"
                value={title}
                onChange={handleTitleChange}
              />
            </div>
          </label>
        </div>
        
        <div className="form-group">
          <label>
            Description
            <div>
              <input
                id="password" 
                value={description}
               
                onChange={handleDescriptionChange} />
            </div>
            
          </label>
        </div>
        <div className="form-group">
          <label>
            instruction
            <div className='flex-full'>
              <textarea id="instruction" className='flex-full' rows={'7'} value={instructions} onChange={handleInstructionChange} />
            </div>
          </label>
        </div>
        <button type="submit" className="btn primary" >
          Create
        </button>
     </form>
    </div>
  );
};

export default Recipes;