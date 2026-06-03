import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartRemove } from '../../app/store/reducers/cart';
import { submitOrder, resetOrder } from '../../app/store/reducers/order';
import Preloader from '../../shared/ui/Preloader';
import ErrorBlock from '../../shared/ui/ErrorBlock';

export default function CartPage() {
  'use no memo';
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { loading, success, error } = useSelector((state) => state.order);

  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [agreement, setAgreement] = useState(false);

  const total = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  const handleRemove = (id, size) => {
    dispatch(cartRemove(id, size));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(submitOrder(phone, address, cartItems));
  };

  if (success) {
    return (
      <main className="container">
        <div className="row">
          <div className="col">
            <section className="cart">
              <h2 className="text-center">Заказ оформлен!</h2>
              <p className="text-center">
                Спасибо за заказ. Мы свяжемся с вами в ближайшее время.
              </p>
              <div className="text-center">
                <Link
                  to="/"
                  className="btn btn-outline-primary"
                  onClick={() => dispatch(resetOrder())}
                >
                  На главную
                </Link>
              </div>
            </section>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="row">
        <div className="col">
          <section className="cart">
            <h2 className="text-center">Корзина</h2>

            {cartItems.length === 0 ? (
              <p className="text-center">Корзина пуста</p>
            ) : (
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Название</th>
                    <th scope="col">Размер</th>
                    <th scope="col">Кол-во</th>
                    <th scope="col">Стоимость</th>
                    <th scope="col">Итого</th>
                    <th scope="col">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, idx) => (
                    <tr key={`${item.id}-${item.size}`}>
                      <td scope="row">{idx + 1}</td>
                      <td>
                        <Link to={`/catalog/${item.id}.html`}>{item.title}</Link>
                      </td>
                      <td>{item.size}</td>
                      <td>{item.qty}</td>
                      <td>{item.price.toLocaleString('ru-RU')} руб.</td>
                      <td>{(item.price * item.qty).toLocaleString('ru-RU')} руб.</td>
                      <td>
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleRemove(item.id, item.size)}
                        >
                          Удалить
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan={5} className="text-right">Общая стоимость</td>
                    <td>{total.toLocaleString('ru-RU')} руб.</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            )}
          </section>

          {cartItems.length > 0 && (
            <section className="order">
              <h2 className="text-center">Оформить заказ</h2>
              <div className="card" style={{ maxWidth: '30rem', margin: '0 auto' }}>
                <form className="card-body" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="phone">Телефон</label>
                    <input
                      className="form-control"
                      id="phone"
                      placeholder="Ваш телефон"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="address">Адрес доставки</label>
                    <input
                      className="form-control"
                      id="address"
                      placeholder="Адрес доставки"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="agreement"
                      checked={agreement}
                      onChange={(e) => setAgreement(e.target.checked)}
                      required
                    />
                    <label className="form-check-label" htmlFor="agreement">
                      Согласен с правилами доставки
                    </label>
                  </div>

                  {loading && <Preloader />}
                  {error && <ErrorBlock message={error} />}

                  <button
                    type="submit"
                    className="btn btn-outline-secondary"
                    disabled={loading}
                  >
                    Оформить
                  </button>
                </form>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  );
}
