import {useState} from 'react';
import {NavLink, useNavigate} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ROUTES} from '../../shared/config/routes';

export default function Header() {
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();
    const cartCount = useSelector((state) => state.cart.items.length);

    const handleSearchClick = () => {
        if (!searchOpen) {
            setSearchOpen(true);
            return;
        }
        if (searchValue.trim()) {
            navigate(`${ROUTES.CATALOG}?q=${encodeURIComponent(searchValue.trim())}`);
            setSearchOpen(false);
            setSearchValue('');
        } else {
            setSearchOpen(false);
        }
    };

    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink className="navbar-brand" to={ROUTES.HOME}>
                            <img src="/img/header-logo.png" alt="Bosa Noga"/>
                        </NavLink>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink
                                        className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}
                                        to={ROUTES.HOME}
                                        end
                                    >
                                        Главная
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}
                                        to={ROUTES.CATALOG}
                                    >
                                        Каталог
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}
                                        to={ROUTES.ABOUT}
                                    >
                                        О магазине
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink
                                        className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}
                                        to={ROUTES.CONTACTS}
                                    >
                                        Контакты
                                    </NavLink>
                                </li>
                            </ul>
                            <div>
                                <div className="header-controls-pics">
                                    <div
                                        className="header-controls-pic header-controls-search"
                                        onClick={handleSearchClick}
                                    />
                                    <div
                                        className="header-controls-pic header-controls-cart"
                                        style={{cursor: 'pointer'}}
                                        onClick={() => navigate(ROUTES.CART)}
                                    >
                                        {cartCount > 0 && (
                                            <div className="header-controls-cart-full">{cartCount}</div>
                                        )}
                                        <div className="header-controls-cart-menu"/>
                                    </div>
                                </div>
                                <form
                                    className={`header-controls-search-form form-inline${searchOpen ? '' : ' invisible'}`}
                                    onSubmit={(e) => {
                                        e.preventDefault();
                                        handleSearchClick();
                                    }}
                                >
                                    <input
                                        className="form-control"
                                        placeholder="Поиск"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </form>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
}
