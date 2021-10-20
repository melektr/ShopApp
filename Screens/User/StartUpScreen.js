import React , {useEffect} from 'react'
import { ActivityIndicator, StyleSheet, View } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import  Colors  from '../../Constants/Colors'
import {useDispatch} from 'react-redux'
import * as authActions from '../../Store/Actions/Auth'

const StartUpScreen = props => {
    const dispatch = useDispatch()

    useEffect(()=> {
        const tryLogin = async() => {
            const userData =  await AsyncStorage.getItem('userData')
            if (!userData ) {
                props.navigation.navigate('Auth')
                return
            }
            const transformedData  = JSON.parse(userData)
            const { token , userId , expiryDate} = transformedData
            const expirationDate = new Date (expiryDate)
            if (expirationDate <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return
            }

            const expirationTime = expirationDate.getTime() - new Date().getTime()
            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId, token, expirationTime))
        }
        tryLogin()
    }, [dispatch])


    return ( 
        <View style = {styles.screen}>
            <ActivityIndicator size ='large' color={Colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default StartUpScreen