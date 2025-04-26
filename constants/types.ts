import { StackNavigationProp } from "@react-navigation/stack";

export type ArrowData = { id: number, rotation: ArrowRotation, active: boolean };
export type ArrowRotation = '0deg' | '45deg' | '90deg' | '135deg' | '180deg' | '225deg' | '270deg' | '315deg';

export type RootStackParamList = {
    "Main Menu": undefined;
    "Game": undefined;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;