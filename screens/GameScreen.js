import React, { useState, useRef, useEffect } from 'react'
import { View, StyleSheet, Text, Button, Alert, ScrollView, FlatList } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons'
import BodyText from '../components/BodyText';


const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }

}

const renderListItem = (listLength, itemData) => (
    <View style={styles.listItem}>
        <BodyText>#{listLength - itemData.index}</BodyText>
        <Text>{itemData.item}</Text>
    </View>
)

function GameScreen(props) {
    const initialGuess = generateRandomBetween(1, 100, props.userChoice)
    const [cureentGuess, setCurrentGuess] = useState(initialGuess)
    const [pastGuesses, setPastGuess] = useState([initialGuess.toString()])
    const currentLow = useRef(1)
    const curentHigh = useRef(100)

    const { userChoice, onGameOver } = props
    useEffect(() => {
        if (cureentGuess === userChoice) {
            onGameOver(pastGuesses.length);
        }
    }, [cureentGuess, userChoice, onGameOver])


    const nextGuessHandler = direction => {
        if ((direction === 'Lower' && cureentGuess < props.userChoice) || (direction === 'Greater' && cureentGuess > props.userChoice)) {
            Alert.alert('Don\'t Lie', 'You know that this is wrong',
                [{ text: 'Sorry!', style: 'cancel' }])
            return;
        }
        if (direction === 'Lower') {
            curentHigh.current = cureentGuess
        } else {
            currentLow.current = cureentGuess + 1;
        }
        const nextNumber = generateRandomBetween(currentLow.current, curentHigh.current, cureentGuess)
        setCurrentGuess(nextNumber);
        setPastGuess(curPastGuesses => [nextNumber.toString(), ...curPastGuesses])

    }



    return (
        <View style={styles.screen}>
            <Text>Opponents Guess</Text>
            <NumberContainer>{cureentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={nextGuessHandler.bind(this, 'Lower')}>
                    <Ionicons name='md-remove' size={24} color='white' />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'Greater')}>
                    <Ionicons name='md-add' size={24} color='white' />
                </MainButton>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    keyExtractor={item => item}
                    data={pastGuesses}
                    renderItem={renderListItem.bind(this, pastGuesses.length)}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 400,
        maxWidth: '90%'
    },
    listItem: {
        borderColor: '#ccc',
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '60%'
    },
    listContainer: {
        width: '80%',
        flex: 1
    },
    list: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexGrow: 1
    }
})

export default GameScreen
