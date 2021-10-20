import React , {useEffect, useState} from 'react'
import { FlatList, ActivityIndicator, View , Text, StyleSheet} from 'react-native'
import  Colors  from  "../../Constants/Colors"
import {useSelector , useDispatch} from 'react-redux'
import OrderItem from '../../Components/Shop/OrderItem'
import * as ordersActions from '../../Store/Actions/Orders'
const OrdersScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const orders = useSelector(state => state.orders.orders)

    const dispatch = useDispatch()

    useEffect(async()=> {
        setIsLoading(true)
        await dispatch(ordersActions.fetchOrders())
        setIsLoading(false)
    }, [dispatch])

    if(isLoading) {
        return(
            <View style= {{flex :1 , justifyContent : 'center', alignItems : 'center'}}>
                <ActivityIndicator  size= 'large' color = {Colors.primary}/>
            </View>        
            )
    }
    if(orders.length === 0 ) {
        return (
          <View style={styles.addView}>
            <Text>No orders are found here , try to order some products ! </Text>
          </View>
        )
      }

    return (
    <FlatList 
    data= {orders}
    keyExtractor = {item => item.id}
    renderItem ={itemData => <OrderItem 
        amount = {itemData.item.totalAmount} 
        date = {itemData.item.readableDate}
        items = {itemData.item.items}
        />}

    />)
}

OrdersScreen.navigationOptions = {
    headerTitle : 'Orders'
}

const styles = StyleSheet.create({
    addView : {
        flex : 1, 
        alignItems: 'center', 
        justifyContent : 'center'
    }
})

export default OrdersScreen      