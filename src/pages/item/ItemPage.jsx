import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadItem, resetItem } from '../../app/store/reducers/item';
import { cartAdd } from '../../app/store/reducers/cart';
import Preloader from '../../shared/ui/Preloader';
import ErrorBlock from '../../shared/ui/ErrorBlock';
import { ROUTES } from '../../shared/config/routes';

export default function ItemPage() {
  'use no memo';
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { item, loading, error } = useSelector((state) => state.item);
  const [selectedSize, setSelectedSize] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    dispatch(loadItem(id));
    return () => dispatch(resetItem());
  }, [id, dispatch]);

  const availableSizes = item ? item.sizes.filter((s) => s.available) : [];

  const handleAddToCart = () => {
    dispatch(cartAdd({
      id: item.id,
      title: item.title,
      size: selectedSize,
      price: item.price,
      qty,
      image: item.images[0],
    }));
    navigate(ROUTES.CART);
  };

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          {loading && <Preloader />}

          {error && (
            <ErrorBlock message={error} onRetry={() => dispatch(loadItem(id))} />
          )}

          {!loading && !error && item && (
            <section className="catalog-item">
              <h2 className="text-center">{item.title}</h2>
              <div className="row">
                <div className="col-5">
                  <img src={item.images[0]} className="img-fluid" alt={item.title} />
                </div>
                <div className="col-7">
                  <table className="table table-bordered">
                    <tbody>
                      <tr><td>Артикул</td><td>{item.sku}</td></tr>
                      <tr><td>Производитель</td><td>{item.manufacturer}</td></tr>
                      <tr><td>Цвет</td><td>{item.color}</td></tr>
                      <tr><td>Материалы</td><td>{item.material}</td></tr>
                      <tr><td>Сезон</td><td>{item.season}</td></tr>
                      <tr><td>Повод</td><td>{item.reason}</td></tr>
                    </tbody>
                  </table>

                  {availableSizes.length > 0 && (
                    <div className="text-center">
                      <p>
                        Размеры в наличии:{' '}
                        {availableSizes.map((s) => (
                          <span
                            key={s.size}
                            className={`catalog-item-size${selectedSize === s.size ? ' selected' : ''}`}
                            onClick={() => setSelectedSize(s.size)}
                            style={{ cursor: 'pointer' }}
                          >
                            {s.size}
                          </span>
                        ))}
                      </p>
                      <p>
                        Количество:{' '}
                        <span className="btn-group btn-group-sm pl-2">
                          <button
                            className="btn btn-secondary"
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                          >
                            -
                          </button>
                          <span className="btn btn-outline-primary">{qty}</span>
                          <button
                            className="btn btn-secondary"
                            onClick={() => setQty((q) => Math.min(10, q + 1))}
                          >
                            +
                          </button>
                        </span>
                      </p>
                    </div>
                  )}

                  {availableSizes.length > 0 && (
                    <button
                      className="btn btn-danger btn-block btn-lg"
                      disabled={!selectedSize}
                      onClick={handleAddToCart}
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
