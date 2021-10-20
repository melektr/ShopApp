import React from 'react'
import  {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native'


const ProductItem = props => {
    return(
        <TouchableOpacity onPress={props.onSelect}>
        <View style = {styles.product}>
            <View style={styles.imageContainer}>
            <Image style ={styles.Image} source = {{uri : props.image}}/>
            </View>
            <View style={styles.details}>
            <Text style= {styles.title}>{props.title}</Text>
            <Text style={styles.price}>${props.price.toFixed(2)}</Text>
            </View>
            <View style={styles.action}>
                {props.children}
            </View>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    product : {
        shadowColor : 'black',
        shadowOpacity : 0.26,
        shadowOffset : {width : 0, height : 2},
        shadowRadius:8,
        elevation : 5,
        borderRadius : 10,
        backgroundColor : 'white',
        height :300,
        margin : 20
    },
    imageContainer : {
        width : "100%",
        height : '60%',
        borderTopLeftRadius : 10,
        borderTopRightRadius : 10,
        overflow : 'hidden'

    },
    Image : {
        width : '100%',
        height: '100%'
    },
    title :{
        fontSize : 18,
        marginVertical : 2 ,
        fontFamily : 'OpenSans-Bold'
    },
    price : {
        fontSize : 14,
        color : "#888",
        fontFamily : 'OpenSans-Bold'
    },
    action : {
        flexDirection : 'row',
        justifyContent : 'space-between',
        alignItems :'center',
        height : '23%',
        paddingHorizontal : 20
    },
    details : {
        alignItems : 'center',
        height : '17%',
        padding : 10
    }
})

export default ProductItem