import { ADD_TO_CART, REMOVE_FROM_CART } from "../Actions/Cart"
import CartItem from '../../Models/Cart-item'
import { ADD_ORDER } from "../Actions/Orders"
import { DELETE_PRODUCT } from "../Actions/Products"

const initialState = {
    items: {},
    totalAmount: 0
}

export default (state = initialState, action) => {

    switch (action.type) {
        case ADD_TO_CART:
            const addedProduct = action.product
            const prodPrice = addedProduct.price
            const prodTitle = addedProduct.title

            let updatedOrNewCartItem

            if (state.items[addedProduct.id]) {
                //already have the item in the cart
                updatedOrNewCartItem = new CartItem(
                    state.items[addedProduct.id].quantity + 1,
                    prodPrice,
                    prodTitle,
                    state.items[addedProduct.id].sum + prodPrice,


                )
                    ;
                return {
                    ...state,
                    items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                    totalAmount: state.totalAmount + prodPrice


                }
            } else {
                updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state,
                items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
                totalAmount: state.totalAmount + prodPrice
            }


        case REMOVE_FROM_CART:
            const selectedCartItem = state.items[action.pId]
            const currentQty = selectedCartItem.quantity
            let updatedCartItems = { ...state.items }

            if (currentQty > 1) {
                //we need to reduce the quantity -1 item 

                const updatedCartItem = new CartItem(
                    selectedCartItem.quantity - 1,
                    selectedCartItem.productPrice,
                    selectedCartItem.productTitle,
                    selectedCartItem.sum - selectedCartItem.productPrice

                )

                updatedCartItems = { ...state.items, [action.pId]: updatedCartItem }

            } else {
                // la quantité cest un et on va tt supprimer 
                updatedCartItems = { ...state.items }
                delete updatedCartItems[action.pId]
            }
            return {
                ...state, items: updatedCartItems,
                totalAmount: state.totalAmount - selectedCartItem.productPrice
            }

        case ADD_ORDER:
            return initialState

        case DELETE_PRODUCT:
            if (!state.items[action.pid]) {
                return state
            }
            const updatedItems = { ...state.items }
            const itemTotal = state.items[action.pid].sum
            delete updatedItems[action.pid]
            return {
                ...state,
                items: updatedItems,
                totalAmount : state.totalAmount - itemTotal
            }

    }
    return state
}