import { Outlet, useLocation } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const route = useLocation();
  const showSearchIcon = !route.pathname.includes('profile')
  && !route.pathname.includes('done-recipes')
  && !route.pathname.includes('favorite-recipes');

  const pageTitle = () => {
    if (route.pathname.includes('meals')) {
      return 'Meals';
    } if (route.pathname.includes('drinks')) {
      return 'Drinks';
    } if (route.pathname.includes('profile')) {
      return 'Profile';
    } if (route.pathname.includes('done-recipes')) {
      return 'Done Recipes';
    } if (route.pathname.includes('favorite-recipes')) {
      return 'Favorite Recipes';
    }
  };

  return (
    <>
      <header>
        <div>
          <img data-testid="profile-top-btn" src={ profileIcon } alt="Ícone de Perfil" />
        </div>
        <h1 data-testid="page-title">
          {pageTitle()}
        </h1>
        {
        showSearchIcon
        && (
          <button>
            <img
              data-testid="search-top-btn"
              src={ searchIcon }
              alt="Ícone de Pesquisa"
            />
          </button>
        )
        }
      </header>
      <Outlet />
    </>
  );
}

export default Header;
