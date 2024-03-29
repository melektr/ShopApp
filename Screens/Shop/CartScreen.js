import React, { useState } from 'react'
import { StyleSheet, View, Text, Button, FlatList, ActivityIndicator } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import Colors from '../../Constants/Colors'
import CartItem from '../../Components/Shop/CartItem'
import * as cartActions from '../../Store/Actions/Cart'
import * as orderActions from '../../Store/Actions/Orders'

const CartScreen = props => {

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const cartTotalAmount = useSelector(state => state.cart.totalAmount)

    const cartItems = useSelector(state => {
        const transformedCartItems = []
        for (const key in state.cart.items) {
            transformedCartItems.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum
            })
        }
        return transformedCartItems
    })

    const dispatch = useDispatch()

    const sendOrderHandler = async () => {
        setError (null)
        setIsLoading(true)
        try {
            await dispatch(orderActions.addOrder(cartItems, cartTotalAmount))
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
    }

    // if(isLoading) {
    //     return(
    //         <View style = {styles.centered}> 
    //             <ActivityIndicator size = 'large' color = {Colors.primary} />
    //             </View>
    //     )
    // }

    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>
                    Total :<Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                {isLoading ?  (<ActivityIndicator size = 'small' color = {Colors.primary}/> ) : 
              (  <Button
                    color={Colors.accent}
                    title='Order Now '
                    disabled={cartItems.length === 0}
                    onPress={sendOrderHandler}

                >
                </Button> )}
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData =>
                    <CartItem
                        quantity={itemData.item.quantity}
                        title={itemData.item.productTitle}
                        amount={itemData.item.sum}
                        deletable
                        onRemove={() => { dispatch(cartActions.removeFromCart(itemData.item.productId)) }}
                    />}
            />
        </View>
    )
}

CartScreen.navigationOptions = {
    headerTitle: 'Your Cart'
}

const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontFamily: 'OpenSans-Bold',
        fontSize: 18
    },
    amount: {
        color: Colors.primary
    },
    centered : {
        flex : 1 , 
        justifyContent : 'center',
        alignItems : 'center'
    }
})


export default CartScreen