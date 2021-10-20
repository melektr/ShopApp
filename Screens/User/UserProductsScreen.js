import React from 'react'
import { View ,FlatList, Button , Alert, Text, StyleSheet} from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from "../../Components/Shop/ProductItem"
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../../Constants/Colors'
import * as productsActions from '../../Store/Actions/Products'
const UserProductsScreen = props => {

  const userProducts = useSelector(state => state.products.userProducts)

  const dispatch = useDispatch()

  const editProductHandler = (id) => {
    props.navigation.navigate('EditProduct', {productId : id})
  }

  const deleteHandler = (id) => {
    Alert.alert('ARe you sure ? ' , 'Do you really want to delete this item? ' , [
        {text : 'No', style : 'default'} ,
        {text : 'Yes', style: 'destructive' , onPress: () => {dispatch(productsActions.deleteProduct(id))} }
    ])
}

  if(userProducts.length === 0 ) {
    return (
      <View style={styles.addView}>
        <Text>No products are found here , try to add some ! </Text>
      </View>
    )
  }

  return (
    <FlatList
      data={userProducts}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => { editProductHandler(itemData.item.id)}} >

          <Button color={Colors.primary} title='Edit' onPress={() => {editProductHandler(itemData.item.id)}}/>
          <Button color={Colors.primary} title='Delete' onPress={deleteHandler.bind(this, itemData.item.id)}/>

          </ProductItem>
          )}

        />
    )
}


UserProductsScreen.navigationOptions = navData => {
  return  {  headerTitle : 'Your Products ',
  headerLeft : (
          <Icon
            name='list'
            size={20}
            color={Colors.primary}
            style={{ marginLeft: 15 }}
            onPress={() => navData.navigation.toggleDrawer()} />
  ), 

  headerRight : (
    <Icon
    name='plus'
    size={20}
    color={Colors.primary}
    style={{ marginRight: 15 }}
    onPress={() => navData.navigation.navigate('EditProduct')} />
  )
}
  
}
const styles = StyleSheet.create ({
  addView: {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    color : "white",
    backgroundColor : Colors.primary
  }
})


export default UserProductsScreen