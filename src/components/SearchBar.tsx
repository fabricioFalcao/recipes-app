import React from 'react';
import { useLocation } from 'react-router-dom';

function SearchBar() {
  const route = useLocation();
  const [searchType, setSearchType] = React.useState('');
  const [searchInput, setSearchInput] = React.useState('');
  const INGREDIENT = 'ingredient';
  const NAME = 'name';
  const FIRST_LETTER = 'first-letter';

  // ao selecionar um radio, o valor do estado de searchType deve ser atualizado
  const handleRadio = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchType(event.target.value);
  };

  // ao clicar no botão de buscar, deve-se fazer uma requisição para a API
  const handleSearch = async () => {
    const validSearchInput = searchInput.length > 0;
    const dbUrl = route.pathname.includes('drinks') ? 'thecocktaildb' : 'themealdb';

    // se a busca for por primeira letra e o input tiver mais de 1 caractere, deve-se exibir um window.alert
    if (searchType === 'first-letter' && searchInput.length !== 1) {
      window.alert('Your search must have only 1 (one) character');
    }

    let ENDPOINT = '';
    /* se o input for válido, deve-se escolher o ENDPOINT para fazer a requisição para a API
    baseado no parametro que foi obtido dinamicamente via radio -> handleRadio -> searchType */

    if (validSearchInput) {
      if (searchType === INGREDIENT) {
        ENDPOINT = `https://www.${dbUrl}.com/api/json/v1/1/filter.php?i=${searchInput}`;
      } else if (searchType === NAME) {
        ENDPOINT = `https://www.${dbUrl}.com/api/json/v1/1/search.php?s=${searchInput}`;
      } else if (searchType === FIRST_LETTER) {
        ENDPOINT = `https://www.${dbUrl}.com/api/json/v1/1/search.php?f=${searchInput}`;
      }
    }

    try {
      const response = await fetch(ENDPOINT);
      if (!response.ok) throw new Error(response.statusText);
      const data = await response.json();
      console.log(data.meals);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <input
          type="text"
          id="search"
          data-testid="search-input"
          placeholder="Search..."
          value={ searchInput }
          onChange={ (e) => setSearchInput(e.target.value) }
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleSearch }
        >
          Search
        </button>
      </div>
      <div>
        <label>
          <input
            type="radio"
            id="ingredient-search-radio"
            data-testid="ingredient-search-radio"
            value="ingredient"
            // se for selecionado, searchType deve ser atualizado para 'ingredient'
            checked={ searchType === INGREDIENT }
            onChange={ handleRadio }
          />
          Ingredient
        </label>
        <label>
          <input
            type="radio"
            id="name-search-radio"
            data-testid="name-search-radio"
            value="name"
            // se for selecionado, searchType deve ser atualizado para 'name'
            checked={ searchType === NAME }
            onChange={ handleRadio }
          />
          Name
        </label>
        <label>
          <input
            type="radio"
            id="first-letter-search-radio"
            data-testid="first-letter-search-radio"
            value="first-letter"
            // se for selecionado, searchType deve ser atualizado para 'first-letter'
            checked={ searchType === FIRST_LETTER }
            onChange={ handleRadio }
          />
          First letter
        </label>
      </div>
    </div>
  );
}

export default SearchBar;
