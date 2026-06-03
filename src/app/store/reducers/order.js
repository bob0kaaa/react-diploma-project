import { postOrder } from '../../../shared/api';
import { cartClear } from './cart';

const ORDER_REQUEST = 'order/REQUEST';
const ORDER_SUCCESS = 'order/SUCCESS';
const ORDER_FAILURE = 'order/FAILURE';
const ORDER_RESET = 'order/RESET';

const initialState = {
  loading: false,
  success: false,
  error: null,
};

export const submitOrder = (phone, address, items) => async (dispatch) => {
  dispatch({ type: ORDER_REQUEST });
  try {
    await postOrder({
      owner: { phone, address },
      items: items.map((i) => ({ id: i.id, price: i.price, count: i.qty })),
    });
    dispatch({ type: ORDER_SUCCESS });
    dispatch(cartClear());
  } catch (err) {
    dispatch({ type: ORDER_FAILURE, payload: err.message });
  }
};

export const resetOrder = () => ({ type: ORDER_RESET });

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case ORDER_REQUEST:
      return { ...state, loading: true, error: null };
    case ORDER_SUCCESS:
      return { ...state, loading: false, success: true };
    case ORDER_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ORDER_RESET:
      return initialState;
    default:
      return state;
  }
};

export default orderReducer;
