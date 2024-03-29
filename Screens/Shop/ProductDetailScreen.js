import React from 'react'
import { StyleSheet, View, ScrollView, Image, Text, Button } from 'react-native'
import Colors from '../../Constants/Colors'
import { useSelector , useDispatch } from 'react-redux'
import * as cartActions from '../../Store/Actions/Cart'
const ProductDetailScreen = props => {
    const productId = props.navigation.getParam('productId')
    const selectedProduct = useSelector(state => state.products.availableProducts.find(prod => prod.id === productId))

    const dispatch = useDispatch()
    return (
        <ScrollView>
            <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
            <View style={styles.actions}>
            <Button  color = {Colors.primary}title="Add to Cart" onPress={() => {dispatch(cartActions.addToCart(selectedProduct))}}></Button>
            </View>
            <Text style= {styles.price}>${selectedProduct.price.toFixed(2)}</Text>
            <Text style= {styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
    )
}


ProductDetailScreen.navigationOptions = navData => {
    return {
        headerTitle: navData.navigation.getParam('productTitle')
    }
}




const styles = StyleSheet.create({
    image : {
        width : '100%',
        height : 300
    },
    actions :{
        marginVertical : 10,
        alignItems : 'center'
    },
    price : {
        fontSize : 20,
        color : '#888',
        textAlign : 'center',
        marginVertical : 20,
        fontFamily : 'OpenSans-Bold'
    },
     description : {
        fontSize : 14,
        textAlign : 'center',
        marginHorizontal : 20,
        fontFamily : 'OpenSans-Regular'
     },

})

export default ProductDetailScreen