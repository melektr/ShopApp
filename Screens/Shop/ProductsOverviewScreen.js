import React , { useState, useEffect, useCallback} from 'react'
import { FlatList, Button, Text, ActivityIndicator, View } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import ProductItem from '../../Components/Shop/ProductItem'
import ProductDetailScreen from './ProductDetailScreen'
import * as cartActions from '../../Store/Actions/Cart'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../../Components/UI/HeaderButton'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../../Constants/Colors'
import * as productsActions from '../../Store/Actions/Products'
import { set } from 'react-native-reanimated'

const ProductsOverviewScreen = props => {
    const [isLoading , setIsLoading] = useState(false)
    const [isRefreshing, setIsRefreshing] = useState(false)
    const [error , setError] = useState()
    const products = useSelector(state => state.products.availableProducts)

    const dispatch = useDispatch()

const loadProducts = useCallback( async () => {
    setError(null)
    setIsRefreshing(true)
    try {
        await dispatch(productsActions.fetchProducts())
    } catch(err) {
        setError(err.message)
    }
    setIsRefreshing(false)
    }, [dispatch, setIsLoading, setError])

    useEffect (()=> {
       const willFocusSub =  props.navigation.addListener('willFocus', loadProducts)

        return () => {
            willFocusSub.remove()
        }
    }, [loadProducts])


    useEffect (()=> {
        setIsLoading(true)
       loadProducts().then(()=> {
           setIsLoading(false)
       })
    }, [dispatch ,loadProducts])

   

    const selectItemHandler = (id , title) => {
        props.navigation.navigate('ProductDetail', {
            productId: id,
            productTitle: title

        })
    }


    if (error) {
        return(
            <View style ={{flex : 1 , justifyContent : 'center', alignItems : 'center'}}>
                <Text>An Error Occured</Text>
            </View>
        )
    }


    if (isLoading) {
        return (
            <View style ={{flex : 1 , justifyContent : 'center', alignItems : 'center'}}>
                <ActivityIndicator  size='large' color = {Colors.primary}/>
            </View>
        )
    }


    if(!isLoading && products.length === 0) {
        return(
            <View style ={{flex : 1 , justifyContent : 'center', alignItems : 'center'}}>
                <Text>NO PRODUCTS FOUND , TRY TO ADD SOME </Text>
        </View>
        )
    }

    return (
        <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
            data={products}
            keyExtractor={item => item.id}
            renderItem={itemData => 
           ( <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => {
                   selectItemHandler(itemData.item.id , itemData.item.title)
            }}
                >

                <Button 
                color={Colors.primary}
                title = 'View Details'
                onPress={() => {
                    selectItemHandler(itemData.item.id , itemData.item.title)
                }}
                />
                  <Button 
                color={Colors.primary}
                title = 'To Cart'
                onPress={()=> {dispatch(cartActions.addToCart(itemData.item)) 
                }}
                />
            </ProductItem>
            )}
        />)
}


ProductsOverviewScreen.navigationOptions = navData => {
    return {
        headerTitle: 'All Products',
        headerRight: (
            // <HeaderButtons HeaderButtonComponent={HeaderButton}>
            //     <Item  title='Cart' iconName='star'/> 
            // </HeaderButtons>
            <Icon name='shopping-cart'
                size={23}
                style={{ marginRight: 15 }}
                color={Colors.primary}
                onPress={() => { navData.navigation.navigate('Cart')}}

            />

        ),
        headerLeft : (
            <Icon name ='list'
            size={23}
            style={{ marginLeft: 15 }}
            color={Colors.primary}
            onPress={() => { navData.navigation.toggleDrawer()}}

        />

        )
    }
}

export default ProductsOverviewScreen