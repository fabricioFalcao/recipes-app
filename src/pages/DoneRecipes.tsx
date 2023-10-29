import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { DoneRecipesLSType } from '../Type/type';
import ShareButton from '../components/ShareButton';
import Tags from '../components/Tags';
import TypeFilter from '../components/filters/TypeFilter';
import useLocalStorage from '../hooks/useLocalStorage';

function DoneRecipes() {
  const [filter, setFilter] = useState('all');
  const [doneRecipes] = useLocalStorage<DoneRecipesLSType[]>('doneRecipes', []);
  const navigate = useNavigate();

  const filteredRecipes = doneRecipes.filter((recipe) => {
    switch (filter) {
      case 'meal':
        return recipe.type === 'meal';
      case 'drink':
        return recipe.type === 'drink';
      default:
        return true;
    }
  });

  return (
    <div>
      <TypeFilter setFilter={ setFilter } />
      {
        filteredRecipes.map((recipe, index) => (
          <div key={ recipe.id }>
            <button
              onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
            >
              <img
                data-testid={ `${index}-horizontal-image` }
                src={ recipe.image }
                alt="foto da receita"
                height={ 400 }
              />
            </button>
            <p data-testid={ `${index}-horizontal-top-text` }>
              {recipe.type === 'drink'
                ? `${recipe.alcoholicOrNot} - ${recipe.category}`
                : `${recipe.nationality} - ${recipe.category}`}
            </p>
            <button
              onClick={ () => navigate(`/${recipe.type}s/${recipe.id}`) }
              data-testid={ `${index}-horizontal-name` }
            >
              {recipe.name}
            </button>
            <p
              data-testid={ `${index}-horizontal-done-date` }
            >
              {recipe.doneDate.toString()}
            </p>
            <ShareButton
              id={ recipe.id }
              keyStr={ `${recipe.type}s` }
              testid={ `${index}-horizontal-share-btn` }
            />
            <Tags index={ index } tagList={ recipe.tags } />
          </div>
        ))
      }
    </div>
  );
}

export default DoneRecipes;
