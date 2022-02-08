import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Home from '../../screens/Home'
import Login from '../../screens/Login'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Box, Button } from 'native-base'
import FocusComic from '../../screens/FocusComicScreen'
import { CardStyleInterpolators } from '@react-navigation/stack'
import Profile from '../../screens/Profile'
import { useUser } from '../../lib/hooks'

export type HomeStackParamList = {
    Home: undefined
    FocusComic: { comic: Comic_ShortBoxed_SplitTitle_Image }
}

export type ProfileStackParamList = {
    Profile: undefined
    FocusComic: { comic: Comic_ShortBoxed_SplitTitle_Image }
}

const HomeStack = createStackNavigator<HomeStackParamList>()
const LoginStack = createStackNavigator()
const ProfileStack = createStackNavigator<ProfileStackParamList>()

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#404040',
                },
                headerTintColor: 'white',
            })}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen
                name="FocusComic"
                component={FocusComic}
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forBottomSheetAndroid,
                }}
            />
        </HomeStack.Navigator>
    )
}

const LoginStackScreen = () => {
    return (
        <LoginStack.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#404040',
                },
                headerTintColor: 'white',
            })}
        >
            <LoginStack.Screen name="Login" component={Login} />
        </LoginStack.Navigator>
    )
}

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: '#404040',
                },
                headerTintColor: 'white',
            })}
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen
                name="FocusComic"
                component={FocusComic}
                options={{
                    cardStyleInterpolator:
                        CardStyleInterpolators.forBottomSheetAndroid,
                }}
            />
        </ProfileStack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

export default () => {
    const [user, { mutate }] = useUser()

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarShowLabel: false,
                headerShown: false,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor: 'white',
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName = 'home'

                    if (route.name === 'HomeStack') {
                        iconName = focused ? 'home' : 'home'
                    } else if (route.name === 'LoginStack') {
                        iconName = focused ? 'login' : 'login'
                    } else if (route.name === 'ProfileStack') {
                        iconName = focused ? 'account' : 'account'
                    }

                    return (
                        <MaterialCommunityIcons
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    )
                },
                tabBarBackground: () => (
                    <Box bg="muted.700" w="full" h="full" />
                ),
            })}
        >
            <Tab.Screen name="HomeStack" component={HomeStackScreen} />
            {!user ? (
                <Tab.Screen name="LoginStack" component={LoginStackScreen} />
            ) : (
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileStackScreen}
                />
            )}
        </Tab.Navigator>
    )
}
