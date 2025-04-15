import { StyleSheet } from "react-native";
import colours from "./colours";

import { Dimensions } from 'react-native';

const screenDimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    arrowButton: {
        height: 100,
        width: 100,

        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
        borderWidth: 6,
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: 300,
    },
    button: {
        borderRadius: 40,
        borderWidth: 4,
        margin: 10,
        paddingHorizontal: 24,
        paddingVertical: 12,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    centreContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',

        columnGap: 10,
        rowGap: 10,
        width: 320,
    },
    modalContainer: {
        backgroundColor: colours.blue,
        borderRadius: 40,
        borderWidth: 4,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    rowContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        columnGap: 20
    },


    // TEXT
    appTitleText: {
        color: colours.white,
        fontFamily: 'Audiowide-Regular',
        textAlign: 'center',
        fontSize: 100,
    },
    defaultText: {
        color: colours.white,
        fontFamily: 'Audiowide-Regular',
        textAlign: 'center',
        fontSize: 40,
    },
    pageHeader: {
        fontSize: 60,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        margin: 10,
    },
});

export default styles;