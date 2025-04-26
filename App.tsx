import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';

import { Platform, StyleSheet } from 'react-native';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import MainMenu from './screens/MainMenu';
import GameScreen from './screens/GameScreen';
import colours from './constants/colours';
import { LinearGradient } from 'expo-linear-gradient';

const { Navigator, Screen } = createStackNavigator();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    'Audiowide-Regular': require('./assets/fonts/Audiowide-Regular.ttf'),
  });

  const navProps: StackNavigationOptions = {
    headerShown: false,
    cardStyle: { backgroundColor: "transparent" },
    cardStyleInterpolator: ({ current, next, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateY: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width * 2, 0],
              }),
            },
            {
              translateY: next
                ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -layouts.screen.width * 2],
                })
                : 0,
            },
          ],
        },

      };
    },
  }

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <LinearGradient
      colors={[colours.blue, colours.blueHighlight]}
      style={styles.appContainer}
      start={{ x: 0.5, y: 0 }}
      end={{ x: 0.5, y: 1 }}>
      <StatusBar style='light' />
      <NavigationContainer>
        <Navigator screenOptions={navProps} initialRouteName='Main Menu'>
          <Screen name='Main Menu' component={MainMenu} />
          <Screen name='Game' component={GameScreen} />
        </Navigator>
      </NavigationContainer>
    </LinearGradient>
  );
}



const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
    backgroundColor: "transparent",
  },
})