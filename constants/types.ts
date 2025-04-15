import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
    "Main Menu": undefined;
    "Game": undefined;
}

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;