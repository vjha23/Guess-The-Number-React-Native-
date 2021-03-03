import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../constainsts/color'
import TitleText from './TitleText'

function Header(props) {
    return (
        <View style={styles.header}>
            <TitleText>{props.title}</TitleText>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        padding: 36,
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center'
    },

})

export default Header
