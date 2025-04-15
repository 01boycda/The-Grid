import { Text, TouchableOpacity } from "react-native";

import { FontAwesome6 } from '@expo/vector-icons';
import { LinearGradient } from "expo-linear-gradient";
import styles from "../constants/styles";

type CustomButtonProps = ({
    size: number;
    icon?: boolean;
    label: any;
    colourLight: string;
    colourDark: string;
    onPress: () => void;
});

const CustomButton = ({ size, icon, label, colourLight, colourDark, onPress }: CustomButtonProps) => {
    if (icon) {
        return (
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    colors={[colourLight, colourDark]}
                    style={styles.button}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}>
                    <FontAwesome6 color='white' name={label} size={size} />
                </LinearGradient>
            </TouchableOpacity >
        );
    } else {
        return (
            <TouchableOpacity onPress={onPress}>
                <LinearGradient
                    colors={[colourLight, colourDark]}
                    style={styles.button}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}>
                    <Text style={[styles.defaultText, { fontSize: size }]}>{label}</Text>
                </LinearGradient>
            </TouchableOpacity >

        );
    }

}

export default CustomButton;