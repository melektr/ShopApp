import React from 'react'
import {HeaderButton } from 'react-navigation-header-buttons'
import FontAwesome from 'react-native-vector-icons'
import  {Platform} from 'react-native'
import Colors from '../../Constants/Colors'

const CustomHeaderButton = props => {
    return <HeaderButton  { ...props} IconComponent = {FontAwesome} iconSize = {23}  color = {Platform.OS === 'android' ? 'white' : Colors.primary}/>
}

export default CustomHeaderButton