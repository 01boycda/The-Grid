import AsyncStorage from '@react-native-async-storage/async-storage';

const STORE_KEY = 'SCORE_STORE';

export const getScore = async () => {
    try {
        const jsonScore = await AsyncStorage.getItem(STORE_KEY);
        return jsonScore != null ? JSON.parse(jsonScore) : { score: 0 };
    } catch (e) {
        console.log(`Error getting score: ${e}`);
    }
}

export const saveScore = async (score: number) => {
    try {
        const jsonScore = JSON.stringify({ score: score });
        await AsyncStorage.setItem(STORE_KEY, jsonScore);
    } catch (e) {
        console.log(`Error saving score: ${e}`);
    }
}