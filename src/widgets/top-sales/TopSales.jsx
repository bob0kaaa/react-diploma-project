import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadTopSales } from '../../app/store/reducers/topSales';
import Preloader from '../../shared/ui/Preloader';
import ErrorBlock from '../../shared/ui/ErrorBlock';

export default function TopSales() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.topSales);

    useEffect(() => {
        dispatch(loadTopSales());
    }, [dispatch]);

    if (loading) return <Preloader />;
    if (error) return <ErrorBlock message={error} onRetry={() => dispatch(loadTopSales())} />;
    if (items.length === 0) return null;

    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                {items.map((item) => (
                    <div key={item.id} className="col-4">
                        <div className="card">
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
        </section>
    );
}
