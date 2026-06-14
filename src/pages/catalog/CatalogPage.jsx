import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { setSearch } from '../../app/store/reducers/catalog';
import CatalogSection from '../../widgets/catalog-section/CatalogSection';

export default function CatalogPage() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        const q = searchParams.get('q') || '';
        setInputValue(q);
        dispatch(setSearch(q));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(setSearch(inputValue.trim()));
    };

    const searchForm = (
        <form className="catalog-search-form form-inline" onSubmit={handleSubmit}>
            <input
                className="form-control"
                placeholder="Поиск"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="btn btn-outline-primary btn-search-custom" type="submit">
                Найти
            </button>
        </form>
    );

    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <CatalogSection searchSlot={searchForm} />
                </div>
            </div>
        </main>
    );
}
