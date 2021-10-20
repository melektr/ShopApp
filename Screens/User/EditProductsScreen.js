import React, { useState, useCallback, useEffect, useReducer } from 'react'
import { View, Text, StyleSheet, ScrollView, Alert, ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import Colors from '../../Constants/Colors'
import { useSelector, useDispatch } from 'react-redux'
import * as productActions from '../../Store/Actions/Products'
import Input from '../../Components/UI/Input'

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


const EditProductsScreen = props => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()

    const prodId = props.navigation.getParam('productId')
    const editedProduct = useSelector(state =>
        state.products.userProducts.find(prod => prod.id === prodId)
    )
    const dispatch = useDispatch()

    const [formState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: ''

        },
        inputValidities: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false
        },
        formIsValid: editedProduct ? true : false

    })
    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '')
    // const [titleIsValid, setTitleIsValid] = useState(false)
    // const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '')
    // const [price, setPrice] = useState('')
    // const [description, setDescription] = useState(editedProduct ? editedProduct.description : '')


    console.log('TITLEEEEEE=======', formState.inputValues.title);

    console.log('FOOOOOORMMMM============', formState.formIsValid);


    useEffect( () => {
        if (error) {
            Alert.alert('An error occured ! ', error , 
            [{text : 'OKAY'}]
            )
        }
    } , [error])

    const submitHandler = useCallback(async () => {
        ;
        if (!formState.formIsValid) {
            Alert.alert('Wrong input !', 'Please check the errors in the form', [
                { text: 'Okay' }
            ])
            return
        }
        setError(null)
        setIsLoading(true)
        try {
            if (editedProduct) {
                await dispatch(
                    productActions.updateProduct(
                        prodId,
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl))
                console.log('title =======', formState.inputValues.title);
            } else {
                await dispatch(
                    productActions.createProduct(
                        formState.inputValues.title,
                        formState.inputValues.description,
                        formState.inputValues.imageUrl,
                        +formState.inputValues.price))
            }
            props.navigation.goBack()
        } catch (err) {
            setError(err.message)
        }
        setIsLoading(false)
       
    }
        // console.log('FORMUUUUUULAIIIIIRE IS', formState.formIsValid)
        , [dispatch, prodId, formState])

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler })
    }, [submitHandler])


    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type: FORM_INPUT_UPDATE,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        })
    }, [dispatchFormState])

    if(isLoading) {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator  size='large' color= {Colors.primary} />
            </View>
        )
    }


    return (
        <ScrollView>
            <View style={styles.form}>
                <Input
                    id='title'
                    label='Title'
                    errorText='Please enter a valid title !'
                    keyboardType='default'
                    autoCapitalized='sentences'
                    autoCorrect
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.title : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                <Input
                    id='imageUrl'
                    label='ImageUrl'
                    errorText='Please enter a valid imageUrl !'
                    keyboardType='default'
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.imageUrl : ''}
                    initiallyValid={!!editedProduct}
                    required
                />
                {editedProduct ? null : (<Input
                    id='price'
                    label='Price'
                    errorText='Please enter a valid price!'
                    keyboardType='decimal-pad'
                    returnKeyType='next'
                    onInputChange={inputChangeHandler}
                    required
                    min={0.1}
                />)}
                <Input
                    id='description'
                    label='Description'
                    errorText='Please enter a valid description!'
                    keyboardType='default'
                    autoCapitalized='sentences'
                    autoCorrect
                    multiline
                    numberOfLines={3} //ANDROIIID
                    onInputChange={inputChangeHandler}
                    initialValue={editedProduct ? editedProduct.description : ''}
                    initiallyValid={!!editedProduct}
                    required
                    minlength={5}
                />
            </View>
        </ScrollView>
    )
}

EditProductsScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId') ? 'Edit Product' : 'Add Product',
        headerRight: () =>
            <Icon name='check'
                size={23}
                style={{ marginRight: 15 }}
                color={Colors.primary}
                onPress={submitFn}

            />

    }


}

const styles = StyleSheet.create({
    form: {
        margin: 20
    },

    centered : {
        flex : 1,
        alignItems : 'center',
        justifyContent : 'center'
    }


})


export default EditProductsScreen

