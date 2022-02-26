import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Nav from './src/components/Nav/Nav'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaView } from 'react-native'

export default function App() {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <SafeAreaView style={{ flex: 1 }}>
                    <StatusBar translucent />
                    <Nav />
                </SafeAreaView>
            </NativeBaseProvider>
        </NavigationContainer>
    )
}
