import React from 'react'
import { View, StyleSheet, Button, Image, Text } from 'react-native'
import BodyText from '../components/BodyText'
import TitleText from '../components/TitleText'
import Color from '../constainsts/color'
import MainButton from '../components/MainButton'

function GameOverScreen(props) {
    return (
        <View style={styles.screen}>
            <TitleText>Game is Over</TitleText>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/success.png')}
                    style={styles.image}
                    resizeMode='cover'
                />
            </View>

            <View style={styles.resultContainer}>
                <BodyText style={styles.resultText}>Your Phone Needed <Text style={styles.highlight}>{props.roundNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{props.userNumber}</Text></BodyText>
            </View>
            <MainButton onPress={props.onRestart}>New Game</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 2,
        borderColor: 'black',
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',

    },
    highlight: {
        color: Color.primary,
        fontFamily: 'open-sans-bold'
    },
    resultContainer: {
        width: '80%'
    },
    resultText: {
        textAlign: 'center',
        fontSize: 20,
        marginVertical: 10
    }
})

export default GameOverScreen
