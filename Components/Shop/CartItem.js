import React from 'react'
import {View, Text , StyleSheet,TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const CartItem = props => {
    return (
    <View style= {styles.cartItem} >
        <View style={styles.itemData}>
            <Text style={styles.quantity}>{props.quantity}</Text> 
            <Text style={styles.title} >{props.title}</Text>
        </View>
        <View style={styles.itemData}>
            <Text style={styles.amount }>{props.amount}</Text>
           { props.deletable && <TouchableOpacity onPress={props.onRemove} style={styles.deleteButton}>
                <Icon name = 'trash' size = {23} color= 'red'/>
            </TouchableOpacity>}
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
        cartItem :{
            padding : 10,
            backgroundColor : 'white',
            flexDirection : 'row',
            justifyContent : 'space-between',
            marginHorizontal : 20
        },
        itamData: {
            flexDirection : 'row',
            alignItems : 'center'
        },
        quantity : {
            fontFamily : 'OpenSans-Regular',
            color : '#888',
            fontSize : 16
        },
        title : {
            fontFamily : 'OpenSans-Bold', 
            fontSize : 16
        },
        amount : {
            fontFamily : 'OpenSans-Bold', 
            fontSize : 16
        },
        deleteButton : {
            marginLeft : 20
        }
})

export default CartItem