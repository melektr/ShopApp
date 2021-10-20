import React , {useReducer, useCallback, useState , useEffect} from 'react'
import { Alert, KeyboardAvoidingView, StyleSheet, View, Button, ScrollView, ActivityIndicator } from 'react-native'
import Input from '../../Components/UI/Input'
import Card from '../../Components/UI/Card'
import Colors from '../../Constants/Colors'
import LinearGradient from 'react-native-linear-gradient'
import {useDispatch} from 'react-redux'
import * as authActions from '../../Store/Actions/Auth'

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE'

const formReducer = (state, action) => {
    if (action.type === FORM_INPUT_UPDATE) {
        const updatedValues = {
            ...state.inputValues,
            [action.input]: action.value
        }
        const updatedValidities = {
            ...state.inputValidities,
            [action.input]: action.isValid
        }
        let updatedFormIsValid = true
        for (const key in updatedValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedValidities[key]
        }
        return {
            formIsValid: updatedFormIsValid,
            inputValidities: updatedValidities,
            inputValues: updatedValues
        }
    }
    return state
}


const AuthScreen = props => {
    const [isLoading, setIsLoading] = useState(false)

    const [error , setError] = useState()

    const [isSignup, setIsSignup] = useState(false)
 
    const dispatch = useDispatch()

    useEffect (()=> {
        if(error) {
            Alert.alert("An Error Occurred !! " ,error , [{
                text : 'OK'
            }] )
        }
    }, [error])


    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            email : '',
            password : ''

        },
        inputValidities: {
          email : false,
          password : false
        },
        formIsValid: false

    })

    const authHandler  = async() => {
        let action 
        if(isSignup) {
            action = authActions.signup(
                formState.inputValues.email,
                formState.inputValues.password
            )
        } else {
            action = authActions.login(
                formState.inputValues.email,
                formState.inputValues.password
            )
        }
        setError(null)
        setIsLoading(true)
        try{
            await dispatch(action)
            props.navigation.navigate('Shop')
        } catch (err) {
            setError(err.message)
        }
    
    }


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])


    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['lightpink', 'white']} style={styles.gradient}>
                <Card style={styles.authContainer}>
                    <ScrollView>
                        <Input
                            id="email"
                            label="E-Mail"
                            keyboardType="email-address"
                            required
                            email
                            autoCapitalize='none'
                            errorText="please enter a valid email adress !"
                            onInputChange={inputChangeHandler}
                            intialValue=""
                        />
                        <Input
                            id="password"
                            label="Password"
                            keyboardType="default"
                            secureTextEntry
                            required
                            minLength={5}
                            autoCapitalize='none'
                            errorText="please enter a valid password !"
                            onInputChange={inputChangeHandler}
                            intialValue=""
                        />
                        <View style = {styles.buttonContainer}> 
                        { isLoading ? (
                        <ActivityIndicator size = 'large' color = {Colors.primary}/>
                        ) : (
                        <Button title={isSignup?  'SignUp' : 'Login' } color={Colors.primary} onPress={authHandler} />
                        )}
                         </View>
                        <View style = {styles.buttonContainer}>
                            <Button title={`Switch to  ${isSignup ? 'Login' : 'SignUp'}`} color={Colors.accent} onPress={() => { 
                            setIsSignup(prevState => !prevState)
                        }} />
                        </View>
                        
                    </ScrollView>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>

    )
}

AuthScreen.navigationOptions = {
    headerTitle: 'Authenticate'
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,

    },
    authContainer: {
        width: "80%",
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center'
    },
    buttonContainer : {
        marginTop : 10
    }
})

export default AuthScreen
