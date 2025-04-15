import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

import { useFocusEffect, useNavigation } from '@react-navigation/native';

import CustomButton from '../components/CustomButton';

import { getScore, saveScore } from '../services/dataService';
import colours from '../constants/colours';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '../constants/styles';
import { ScreenNavigationProp } from '../constants/types';

const MainMenu = () => {
    const navigation = useNavigation<ScreenNavigationProp>();
    const [score, setScore] = useState<number>(0);

    const resetScore = () => {
        saveScore(0);
        setScore(0);
    }

    const getPlayerScore = async () => {
        const response = await getScore()
        setScore(response.score);
    }

    useFocusEffect(() => {
        getPlayerScore();
    });

    return (
        <View style={{ backgroundColor: "none", flex: 1, maxWidth: 300, alignSelf: "center" }}>

            <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Text style={[styles.appTitleText]}>{'THE\nGRID'}</Text>
            </View>

            <View style={{ flex: 1, justifyContent: 'flex-start', padding: 20 }}>
                <CustomButton
                    size={45}
                    label='START'
                    colourLight={colours.redHighlight}
                    colourDark={colours.red}
                    onPress={() => navigation.navigate("Game")} />
                <Text style={styles.defaultText}>score</Text>
                <Text style={styles.defaultText}>{"" + score}</Text>
                <CustomButton
                    size={24}
                    label='reset score'
                    colourLight={colours.greyHighlight}
                    colourDark={colours.grey}
                    onPress={resetScore} />
            </View>

        </View>
    );
};

export default MainMenu;