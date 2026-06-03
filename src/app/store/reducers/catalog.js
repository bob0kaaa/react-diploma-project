import {fetchCategories, fetchItems} from "../../../shared/api/index.js";

const CATEGORIES_REQUEST = 'catalog/CATEGORIES_REQUEST';
const CATEGORIES_SUCCESS = 'catalog/CATEGORIES_SUCCESS';
const CATEGORIES_FAILURE = 'catalog/CATEGORIES_FAILURE';

const ITEMS_REQUEST = 'catalog/ITEMS_REQUEST';
const ITEMS_SUCCESS = 'catalog/ITEMS_SUCCESS';
const ITEMS_FAILURE = 'catalog/ITEMS_FAILURE';

const ITEMS_MORE_REQUEST = 'catalog/ITEMS_MORE_REQUEST';
const ITEMS_MORE_SUCCESS = 'catalog/ITEMS_MORE_SUCCESS';
const ITEMS_MORE_FAILURE = 'catalog/ITEMS_MORE_FAILURE';

const SET_CATEGORY = 'catalog/SET_CATEGORY';
const SET_SEARCH = 'catalog/SET_SEARCH';
const RESET_SEARCH = 'catalog/RESET_SEARCH';

const PAGE_SIZE = 6;

const initialState = {
    categories: [],
    categoriesLoading: false,
    categoriesError: null,

    items: [],
    itemsLoading: false,
    itemsMoreLoading: false,
    itemsError: null,
    hasMore: true,

    activeCategory: null,
    searchQuery: '',
};

export const loadCategories = () => async (dispatch) => {
    dispatch({type: CATEGORIES_REQUEST});
    try {
        const data = await fetchCategories();
        dispatch({type: CATEGORIES_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: CATEGORIES_FAILURE, payload: err.message});
    }
};

export const loadItems = () => async (dispatch, getState) => {
    const {activeCategory, searchQuery} = getState().catalog;
    dispatch({type: ITEMS_REQUEST});
    try {
        const data = await fetchItems({categoryId: activeCategory, offset: 0, q: searchQuery});
        dispatch({type: ITEMS_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: ITEMS_FAILURE, payload: err.message});
    }
};


export const loadMoreItems = () => async (dispatch, getState) => {
    const {activeCategory, searchQuery, items} = getState().catalog;
    dispatch({type: ITEMS_MORE_REQUEST});
    try {
        const data = await fetchItems({categoryId: activeCategory, offset: items.length, q: searchQuery});
        dispatch({type: ITEMS_MORE_SUCCESS, payload: data});
    } catch (err) {
        dispatch({type: ITEMS_MORE_FAILURE, payload: err.message});
    }
};

export const setCategory = (categoryId) => (dispatch) => {
    dispatch({type: SET_CATEGORY, payload: categoryId});
    dispatch(loadItems());
};

export const setSearch = (q) => (dispatch) => {
    dispatch({type: SET_SEARCH, payload: q});
    dispatch(loadItems());
};

export const resetSearch = () => (dispatch) => {
    dispatch({type: RESET_SEARCH});
    dispatch(loadItems());
};


const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_SEARCH:
            return {...state, searchQuery: '', items: [], hasMore: true};
        case CATEGORIES_REQUEST:
            return {...state, categoriesLoading: true, categoriesError: null};
        case CATEGORIES_SUCCESS:
            return {...state, categoriesLoading: false, categories: action.payload};
        case CATEGORIES_FAILURE:
            return {...state, categoriesLoading: false, categoriesError: action.payload};

        case ITEMS_REQUEST:
            return {...state, itemsLoading: true, itemsError: null, items: []};
        case ITEMS_SUCCESS:
            return {
                ...state,
                itemsLoading: false,
                items: action.payload,
                hasMore: action.payload.length === PAGE_SIZE,
            };
        case ITEMS_FAILURE:
            return {...state, itemsLoading: false, itemsError: action.payload};

        case ITEMS_MORE_REQUEST:
            return {...state, itemsMoreLoading: true};
        case ITEMS_MORE_SUCCESS:
            return {
                ...state,
                itemsMoreLoading: false,
                items: [...state.items, ...action.payload],
                hasMore: action.payload.length === PAGE_SIZE,
            };
        case ITEMS_MORE_FAILURE:
            return {...state, itemsMoreLoading: false, itemsError: action.payload};

        case SET_CATEGORY:
            return {...state, activeCategory: action.payload, items: [], hasMore: true};
        case SET_SEARCH:
            return {...state, searchQuery: action.payload, items: [], hasMore: true};

        default:
            return state;
    }
};

export default catalogReducer;