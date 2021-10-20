import Product from "../../Models/Product"

export const DELETE_PRODUCT = 'DELETE_PRODUCT'
export const CREATE_PRODUCT = 'CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT'
export const SET_PRODUCTS = 'SET_PRODUCTS'

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId
        //ANY ASYNC COOOOODE
        // FOR A GET REQUEST  WE DONT NEED TO SET THE METHOD AND THE HEADERS AND EVEN THE BODY ..... WE JUST NEED A FETCH REQUESTTTT

        try {
            const response = await fetch('https://rn-complete-guide-c6333-default-rtdb.firebaseio.com/products.json')

            if (!response.ok) {
                throw new Error('Something is going wrong!')
            }

            const resData = await response.json()
            const loadedProducts = []

            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    resData[key].ownerId,
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price,

                )

                )
            }

            // console.log(resData);
            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts : loadedProducts.filter(prod => prod.ownerId === userId)
            })
        } catch (err) {
            throw (err)
        }

    }
}

export const deleteProduct = productId => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const response = await fetch(`https://rn-complete-guide-c6333-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`, {
            method: 'DELETE',

        })
        if (!response.ok) {
            throw new Error('Something went wrong ! ')
        }
        dispatch({ type: DELETE_PRODUCT, pid: productId })
    }

}

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        const userId = getState().auth.userId
        //ANY ASYNC COOOOODE
        const response = await fetch(`https://rn-complete-guide-c6333-default-rtdb.firebaseio.com/products.json?auth=${token}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,
                price,
                ownerId: userId
            })
        })

        const resData = await response.json()
        console.log(resData);
        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId
            }
        })
    }

}

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token
        console.log((getState));
        //ANY ASYNC COOOOODE
        const response = await fetch(`https://rn-complete-guide-c6333-default-rtdb.firebaseio.com/products/${id}.json?auth=${token}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title,
                imageUrl,
                description,

            })
        })
        if (!response.ok) {
            throw new Error('Something went wrong!!')
        }

        dispatch({
            type: UPDATE_PRODUCT,
            pid: id,
            productData: {
                title,
                description,
                imageUrl
            }
        })
    }

}

