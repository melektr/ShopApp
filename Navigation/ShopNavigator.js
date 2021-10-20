import * as React from 'react';
import { createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductsOverviewScreen from '../Screens/Shop/ProductsOverviewScreen';
import ProductsDetailScreen from '../Screens/Shop/ProductDetailScreen'
import CartScreen from '../Screens/Shop/CartScreen'
import OrdersScreen from '../Screens/Shop/OrdersScreen'
import UserProductsScreen from '../Screens/User/UserProductsScreen'
import EditProductsScreen from '../Screens/User/EditProductsScreen'
import StartUpScreen from '../Screens/User/StartUpScreen'
import Colors from '../Constants/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Platform, View , SafeAreaView, Button} from 'react-native'
import AuthScreen from '../Screens/User/AuthScreen';
import { DrawerItems} from 'react-navigation-drawer'
import { useDispatch } from 'react-redux'
import * as authActions from '../Store/Actions/Auth'



//=================================> PRODUCTS STACK NAVIGATOR <=============================================


const ProductsNavigator = createStackNavigator({
    ProductsOverview: ProductsOverviewScreen,
    ProductDetail: ProductsDetailScreen,
    Cart: CartScreen
},
    // {
    //     navigationOptions: {
    //         drawerIcon: drawerConfig => <Icon name='shopping-bag' size={18} color={drawerConfig.tintColor} />
    //     }
    // }, 
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'OpenSans-Regular'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    })


//=================================> ORDERS STACK NAVIGATOR <=============================================


const OrdersNavigator = createStackNavigator({
    Orders: OrdersScreen
},
    // {
    //     navigationOptions: {
    //         drawerIcon: drawerConfig => <Icon name='list' size={18} color={drawerConfig.tintColor} />
    //     },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'OpenSans-Regular'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
)



//=================================> USERPRODUCTS STACK NAVIGATOR <=============================================

const UserProductsNavigator = createStackNavigator({
    userProducts: UserProductsScreen,
    EditProduct: EditProductsScreen
},
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
            },
            headerTitleStyle: {
                fontFamily: 'OpenSans-Bold'
            },
            headerBackTitleStyle: {
                fontFamily: 'OpenSans-Regular'
            },
            headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
        }
    }
)
 //=================================> USERPRODUCTS STACK NAVIGATOR <=============================================

const AuthNavigator = createStackNavigator({
    Auth : AuthScreen
},
{
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
        },
        headerTitleStyle: {
            fontFamily: 'OpenSans-Bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'OpenSans-Regular'
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary
    }
})

//=================================> DRAWER NAVIGATOR <=============================================


const shopNavigator = createDrawerNavigator({
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: UserProductsNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    } , 
    contentComponent : props => {
        const dispatch = useDispatch()

        return  <View style= {{flex : 1, paddingTop :20}}>
                <SafeAreaView forceInset= {{top : 'always', horizontal : 'never'}}>
                    <DrawerItems {...props} />
                    <Button title = 'Logout' color = {Colors.primary} onPress={()=> {
                        dispatch(authActions.logout())
                        props.navigation.navigate('Auth')
                    }}/>
                </SafeAreaView>
            </View>
        
    }
})

//=================================> SWITCH NAVIGATOR <=============================================
const MainNavigator = createSwitchNavigator({
    Start: StartUpScreen,
    Auth : AuthNavigator,
    Shop : shopNavigator
})


export default createAppContainer(MainNavigator)