import { fetchItem } from '../../../shared/api';

const ITEM_REQUEST = 'item/REQUEST';
const ITEM_SUCCESS = 'item/SUCCESS';
const ITEM_FAILURE = 'item/FAILURE';
const ITEM_RESET = 'item/RESET';

const initialState = {
    item: null,
    loading: false,
    error: null,
};

export const loadItem = (id) => async (dispatch) => {
    dispatch({ type: ITEM_REQUEST });
    try {
        const data = await fetchItem(id);
        dispatch({ type: ITEM_SUCCESS, payload: data });
    } catch (err) {
        dispatch({ type: ITEM_FAILURE, payload: err.message });
    }
};

export const resetItem = () => ({ type: ITEM_RESET });

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case ITEM_REQUEST:
            return { ...state, loading: true, error: null, item: null };
        case ITEM_SUCCESS:
            return { ...state, loading: false, item: action.payload };
        case ITEM_FAILURE:
            return { ...state, loading: false, error: action.payload };
        case ITEM_RESET:
            return initialState;
        default:
            return state;
    }
};

export default itemReducer;
