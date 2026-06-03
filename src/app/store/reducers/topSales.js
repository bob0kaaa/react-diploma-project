import { fetchTopSales } from '../../../shared/api';

const TOP_SALES_REQUEST = 'topSales/REQUEST';
const TOP_SALES_SUCCESS = 'topSales/SUCCESS';
const TOP_SALES_FAILURE = 'topSales/FAILURE';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export const loadTopSales = () => async (dispatch) => {
    dispatch({ type: TOP_SALES_REQUEST });
    try {
        const data = await fetchTopSales();
        dispatch({ type: TOP_SALES_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: TOP_SALES_FAILURE, payload: err.message });
    }
};

const topSalesReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOP_SALES_REQUEST:
            return { ...state, loading: true, error: null };
        case TOP_SALES_SUCCESS:
            return { ...state, loading: false, items: action.payload };
        case TOP_SALES_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default topSalesReducer;