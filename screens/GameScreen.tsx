import React, { useEffect, useState } from 'react'
import { Modal, Text, View } from 'react-native'

import ArrowButton from '../components/ArrowButton'
import LifePip from '../components/LifePip'
import CustomButton from '../components/CustomButton'

import { getScore, saveScore } from '../services/dataService'
import { activateButton, cleanGrid, createNewGrid, randomizeRotation } from '../utils/GameLogic';
import styles from '../constants/styles';
import colours from '../constants/colours';
import { useNavigation } from '@react-navigation/native';
import { ArrowData, ScreenNavigationProp } from '../constants/types';
import { DIFFICULTY } from '../utils/Settings';

const GameScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>();

    // Grid Variables
    const [grid, setGrid] = useState<ArrowData[]>(cleanGrid);
    const [buttonSequence, setButtonSequence] = useState<number[] | null>(null);

    // Game Variables
    const TOTAL_TURNS = DIFFICULTY;
    const [turnsLeft, setTurnsLeft] = useState<number>(TOTAL_TURNS);
    const [score, setScore] = useState<number>(0);
    const [failed, setFailed] = useState<boolean>(false);

    // Misc
    const [showModal, setShowModal] = useState<boolean>(false)

    // Create a new grid and sequence
    function startNewGame() {
        setTurnsLeft(TOTAL_TURNS);
        setShowModal(false);
        setFailed(false);

        const { newGrid, newSequence } = createNewGrid();

        setGrid(newGrid);
        setButtonSequence(newSequence);
    }

    // Reset same grid
    function resetGame() {
        setTurnsLeft(TOTAL_TURNS)
        setShowModal(false)
        setFailed(false)

        saveScore(score - 1)
        setScore((prev) => (prev - 1))
        
        // Reset to green
        let resetGrid = [...grid]
        resetGrid.map(button => (
            button.active = true
        ))

        // Activate same buttons
        if (buttonSequence) {
            buttonSequence.forEach(index => {
                resetGrid = activateButton(resetGrid, index)
            })
        } else {
            console.error("No button sequence found");
        }

        setGrid(resetGrid)
    }

    // Called when user presses a button
    function pressButton(index: number) {
        setTurnsLeft(prev => prev - 1)
        setGrid(activateButton(grid, index))
        checkIfComplete()
    }

    // Check if all buttons are active or turns are up
    function checkIfComplete() {
        let complete = true

        grid.forEach(button => {
            if (button.active === false) {
                complete = false
            }
        })

        if (complete) {
            setScore(prev => prev + 1)
            saveScore(score + 1)

            setShowModal(true)
        }
        else if (turnsLeft <= 1) {
            setShowModal(true)
            setFailed(true)
        }
    }
    
    // Start new game and load player score
    useEffect(() => {
        startNewGame()
        getScore().then(result => setScore(result.score))
    }, [])

    return (
        <View style={[styles.gameContainer, styles.centreContent]}>

            {/* SCORE */}
            <View>
                <Text style={[styles.defaultText, { fontSize: 40 }]}>score</Text>
                <Text style={[styles.defaultText, { fontSize: 40 }]}>{"" + score}</Text>
            </View>

            {/* LIVES LEFT */}
            <View style={[styles.rowContainer, { height: 100 }]}>
                {[...Array(turnsLeft)].map((_, i) => <LifePip key={i} />)}
            </View>

            {/* GRID OF BUTTONS */}
            <View style={styles.gridContainer}>
                {grid.map((button, i) => (
                    <ArrowButton
                        key={i}
                        rotation={button.rotation}
                        active={button.active}
                        onPress={() => pressButton(button.id)} />
                ))}
            </View>

    
            {/* BOTTOM BUTTONS */}
            <View style={styles.rowContainer}>
                <CustomButton size={50} icon={true} label='house' colourLight={colours.greyHighlight} colourDark={colours.grey} onPress={() => navigation.goBack()} />
                <CustomButton size={50} icon={true} label='arrow-rotate-left' colourLight={colours.greyHighlight} colourDark={colours.grey} onPress={resetGame} />
            </View>

            {/* MODAL WINDOW */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}

            >
                <View style={[styles.centreContent, { flex: 1, backgroundColor: "#00000066" }]}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.defaultText}>{failed ? "Grid Failed" : "Grid Complete"}</Text>
                        <CustomButton
                            size={24}
                            label={failed ? "retry" : "next"}
                            colourLight={colours.greenHighlight}
                            colourDark={colours.green}
                            onPress={failed ? resetGame : startNewGame}
                        />
                    </View>
                </View>
            </Modal>

        </View>
    )
}

export default GameScreen