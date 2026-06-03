const CART_ADD = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';
const CART_UPDATE_QTY = 'cart/UPDATE_QTY';
const CART_CLEAR = 'cart/CLEAR';

const loadFromStorage = () => {
    try {
        return JSON.parse(localStorage.getItem('cart') || '[]');
    } catch {
        return [];
    }
};

const saveToStorage = (items) => {
    localStorage.setItem('cart', JSON.stringify(items));
};

const initialState = {
    items: loadFromStorage(),
};

export const cartAdd = (item) => ({ type: CART_ADD, payload: item });
export const cartRemove = (id, size) => ({ type: CART_REMOVE, payload: { id, size } });
export const cartUpdateQty = (id, size, qty) => ({ type: CART_UPDATE_QTY, payload: { id, size, qty } });
export const cartClear = () => ({ type: CART_CLEAR });

const cartReducer = (state = initialState, action) => {
    let newItems;
    switch (action.type) {
        case CART_ADD: {
            const { id, size } = action.payload;
            const idx = state.items.findIndex((i) => i.id === id && i.size === size);
            if (idx >= 0) {
                newItems = state.items.map((item, i) =>
                    i === idx ? { ...item, qty: item.qty + action.payload.qty } : item
                );
            } else {
                newItems = [...state.items, action.payload];
            }
            saveToStorage(newItems);
            return { ...state, items: newItems };
        }
        case CART_REMOVE:
            newItems = state.items.filter(
                (i) => !(i.id === action.payload.id && i.size === action.payload.size)
            );
            saveToStorage(newItems);
            return { ...state, items: newItems };
        case CART_UPDATE_QTY:
            newItems = state.items.map((i) =>
                i.id === action.payload.id && i.size === action.payload.size
                    ? { ...i, qty: action.payload.qty }
                    : i
            );
            saveToStorage(newItems);
            return { ...state, items: newItems };
        case CART_CLEAR:
            saveToStorage([]);
            return { ...state, items: [] };
        default:
            return state;
    }
};

export default cartReducer;
