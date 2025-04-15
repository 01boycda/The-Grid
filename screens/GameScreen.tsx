import React, { useEffect, useState } from 'react'
import { Alert, Modal, Text, View } from 'react-native'

import ArrowButton from '../components/ArrowButton'
import LifePip from '../components/LifePip'
import CustomButton from '../components/CustomButton'

import { getScore, saveScore } from '../services/dataService'
import { randomizeRotation } from '../components/GameLogic'
import styles from '../constants/styles'
import colours from '../constants/colours'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationProp } from '../constants/types'

const GameScreen = () => {
    const navigation = useNavigation<ScreenNavigationProp>()

    const cleanGrid = {
        arrows: [
            { id: 0, rotation: '0deg', active: true },
            { id: 1, rotation: '0deg', active: true },
            { id: 2, rotation: '0deg', active: true },
            { id: 3, rotation: '0deg', active: true },
            { id: 4, rotation: '0deg', active: true },
            { id: 5, rotation: '0deg', active: true },
            { id: 6, rotation: '0deg', active: true },
            { id: 7, rotation: '0deg', active: true },
            { id: 8, rotation: '0deg', active: true },
        ]
    }

    // Grid Variables
    const [grid, setGrid] = useState(cleanGrid)
    const [buttonSequence, setButtonSequence] = useState<number[]>([0, 0, 0, 0])

    // Game Variables
    const TOTAL_TURNS = 4
    const [turnsLeft, setTurnsLeft] = useState<number>(TOTAL_TURNS)
    const [score, setScore] = useState<number>(0)

    const [showModal, setShowModal] = useState<boolean>(false)
    const [failed, setFailed] = useState<boolean>(false)

    function createNewGrid() {
        console.log("Creating new grid...")
        setGrid(cleanGrid)
        setTurnsLeft(TOTAL_TURNS)

        setShowModal(false)
        setFailed(false)

        let newArrows = [...grid.arrows]

        // Randomize rotation
        newArrows.map((arrow, i) => (
            arrow.rotation = randomizeRotation(i)
        ))

        // Press random buttons
        let newSequence: number[] = []
        while (newSequence.length < TOTAL_TURNS) {
            let r = Math.floor(Math.random() * 9)
            if (!newSequence.includes(r)) {
                newSequence.push(r)
                activateButton(newArrows[r].id, newArrows[r].rotation)
            }
        }

        // Check if grid is all green
        let complete = true
        grid.arrows.forEach(arrow => {
            if (arrow.active === false) {
                complete = false
            }
        })

        if (complete) {
            createNewGrid()
            return
        }

        setButtonSequence(newSequence)
        setGrid({ ...grid, arrows: newArrows })
    }

    function resetCurrentGrid() {
        setScore(prev => prev - 1)
        saveScore(score - 1)

        setShowModal(false)
        setFailed(false)

        // turn all buttons green
        let newArrows = [...grid.arrows]

        // Reset to green
        newArrows.map((arrow, i) => (
            arrow.active = true
        ))

        // activate same buttons
        for (let i = 0; i < TOTAL_TURNS; i++) {
            let n = buttonSequence[i]
            activateButton(newArrows[n].id, newArrows[n].rotation)
        }

        setTurnsLeft(TOTAL_TURNS)
        setGrid({ ...grid, arrows: newArrows })
    }

    function pressButton(index: number, rotation: string) {
        setTurnsLeft(prev => prev - 1)
        activateButton(index, rotation)
        checkIfComplete()
    }

    function activateButton(index: number, rotation: string) {
        toggleButton(index)

        switch (rotation) {
            case '0deg':
                toggleButton(index - 3)
                break
            case '45deg':
                toggleButton(index - 2)
                break
            case '90deg':
                toggleButton(index + 1)
                break
            case '135deg':
                toggleButton(index + 4)
                break
            case '180deg':
                toggleButton(index + 3)
                break
            case '225deg':
                toggleButton(index + 2)
                break
            case '270deg':
                toggleButton(index - 1)
                break
            case '315deg':
                toggleButton(index - 4)
                break
            default:
                console.log(`${rotation} not accounted for`)
                break
        }
    }

    function toggleButton(index: number) {
        let newArrows = [...grid.arrows]

        newArrows[index].active ? newArrows[index].active = false : newArrows[index].active = true
        setGrid({ ...grid, arrows: newArrows })
    }

    function checkIfComplete() {
        let complete = true

        grid.arrows.forEach(arrow => {
            if (arrow.active === false) {
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

    // Setup gird
    useEffect(() => {
        createNewGrid()
        getScore().then(result => setScore(result.score))
    }, [])

    return (
        <View style={{ backgroundColor: "transparent", flex: 1, alignItems: "center", alignSelf: "center", justifyContent: "center", maxWidth: 300 }}>
            <View>
                <Text style={[styles.defaultText, { fontSize: 40 }]}>score</Text>
                <Text style={[styles.defaultText, { fontSize: 40 }]}>{"" + score}</Text>
            </View>

            <View style={[styles.rowContainer, { height: 100 }]}>
                {[...Array(turnsLeft)].map((_, i) => <LifePip key={i} />)}
            </View>

            <View style={styles.gridContainer}>
                {grid.arrows.map((arrows, i) => (
                    <ArrowButton
                        key={i}
                        rotation={arrows.rotation}
                        active={arrows.active}
                        onPress={() => pressButton(arrows.id, arrows.rotation)} />
                ))}
            </View>

            <View style={styles.rowContainer}>
                <CustomButton size={50} icon={true} label='house' colourLight={colours.greyHighlight} colourDark={colours.grey} onPress={() => navigation.goBack()} />
                <CustomButton size={50} icon={true} label='arrow-rotate-left' colourLight={colours.greyHighlight} colourDark={colours.grey} onPress={resetCurrentGrid} />
            </View>

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
                            onPress={failed ? resetCurrentGrid : createNewGrid}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

export default GameScreen