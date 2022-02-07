import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Nav from './src/components/Nav/Nav'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'

export default function App() {
    return (
        <NativeBaseProvider>
            <NavigationContainer>
                <Nav />
                <StatusBar style="auto" />
            </NavigationContainer>
        </NativeBaseProvider>
    )
}
