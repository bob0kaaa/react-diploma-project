import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    loadCategories,
    loadItems,
    loadMoreItems,
    setCategory,
    resetSearch,
} from '../../app/store/reducers/catalog';
import Preloader from '../../shared/ui/Preloader';
import ErrorBlock from '../../shared/ui/ErrorBlock';

export default function CatalogSection({ resetSearchOnMount = false, searchSlot = null }) {
    const dispatch = useDispatch();
    const {
        categories,
        categoriesLoading,
        categoriesError,
        items,
        itemsLoading,
        itemsMoreLoading,
        itemsError,
        hasMore,
        activeCategory,
    } = useSelector((state) => state.catalog);

    useEffect(() => {
        dispatch(loadCategories());
        if (resetSearchOnMount) {
            dispatch(resetSearch());
        } else {
            dispatch(loadItems());
        }
    }, [dispatch, resetSearchOnMount]);

    const handleCategory = (categoryId) => {
        dispatch(setCategory(categoryId));
    };

    const handleLoadMore = () => {
        dispatch(loadMoreItems());
    };

    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>

            {searchSlot}

            {categoriesLoading && <Preloader />}
            {categoriesError && (
                <ErrorBlock message={categoriesError} onRetry={() => dispatch(loadCategories())} />
            )}

            {!categoriesLoading && !categoriesError && (
                <ul className="catalog-categories nav justify-content-center">
                    <li className="nav-item">
                        <button
                            className={`nav-link${activeCategory === null ? ' active' : ''}`}
                            onClick={() => handleCategory(null)}
                        >
                            Все
                        </button>
                    </li>
                    {categories.map((cat) => (
                        <li key={cat.id} className="nav-item">
                            <button
                                className={`nav-link${activeCategory === cat.id ? ' active' : ''}`}
                                onClick={() => handleCategory(cat.id)}
                            >
                                {cat.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {itemsLoading && <Preloader />}
            {itemsError && (
                <ErrorBlock message={itemsError} onRetry={() => dispatch(loadItems())} />
            )}

            {!itemsLoading && !itemsError && items.length === 0 && (
                <p className="text-center">Ничего не найдено</p>
            )}

            {!itemsLoading && items.length > 0 && (
                <div className="row">
                    {items.map((item) => (
                        <div key={item.id} className="col-4">
                            <div className="card catalog-item-card">
                                <img
                                    src={item.images[0]}
                                    className="card-img-top img-fluid"
                                    alt={item.title}
                                />
                                <div className="card-body">
                                    <p className="card-text">{item.title}</p>
                                    <p className="card-text">{item.price.toLocaleString('ru-RU')} руб.</p>
                                    <Link
                                        to={`/catalog/${item.id}.html`}
                                        className="btn btn-outline-primary"
                                    >
                                        Заказать
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {itemsMoreLoading && <Preloader />}

            {!itemsLoading && hasMore && items.length > 0 && (
                <div className="text-center">
                    <button
                        className="btn btn-outline-primary"
                        onClick={handleLoadMore}
                        disabled={itemsMoreLoading}
                    >
                        Загрузить ещё
                    </button>
                </div>
            )}
        </section>
    );
}
