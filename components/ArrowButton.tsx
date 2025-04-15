import { TouchableOpacity, View } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons';

import styles from "../constants/styles";
import colours from "../constants/colours";
import { LinearGradient } from "expo-linear-gradient";


type Props = ({
    rotation: string;
    active: boolean;
    onPress: () => void;
});

const ArrowButton: React.FC<Props> = ({ rotation, active, onPress }) => {
    return (

        <TouchableOpacity
            onPress={onPress}>
            <LinearGradient
                colors={active ? [colours.greenHighlight, colours.green] : [colours.redHighlight, colours.red]}
                style={styles.arrowButton}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}>
                <View style={{ transform: [{ rotate: rotation }] }}>
                    <FontAwesome5 color={colours.white} name='arrow-alt-circle-up' size={70} />
                </View>
            </LinearGradient>
        </TouchableOpacity>
    );
}

export default ArrowButton;