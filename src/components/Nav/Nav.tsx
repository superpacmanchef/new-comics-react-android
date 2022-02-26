import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator, StackScreenProps } from '@react-navigation/stack'
import React from 'react'
import Home from '../../screens/Home'
import Login from '../../screens/Login'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Box, Text } from 'native-base'
import FocusComic from '../../screens/FocusComicScreen'
import { CardStyleInterpolators } from '@react-navigation/stack'
import Profile from '../../screens/Profile'
import { useUser } from '../../lib/hooks'
import AddComicScreen from '../../screens/AddComicScreen'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'
import {
    PermissionsAndroid,
    Pressable,
    TouchableHighlight,
    TouchableOpacity,
} from 'react-native'

export type HomeStackParamList = {
    Home: undefined
    FocusComic: { comic: Comic_ShortBoxed_SplitTitle_Image }
}
export type ProfileStackParamList = {
    Profile: undefined
    FocusComic: { comic: Comic_ShortBoxed_SplitTitle_Image }
    AddComic: undefined
}

const HomeStack = createStackNavigator<HomeStackParamList>()
const LoginStack = createStackNavigator()
const ProfileStack = createStackNavigator<ProfileStackParamList>()

type FocusComicScreen = StackScreenProps<HomeStackParamList, 'FocusComic'>

const HomeStackScreen = (props: FocusComicScreen) => {
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
                    headerTitle: 'Comic Focus',
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
            <ProfileStack.Screen
                name="AddComic"
                component={AddComicScreen}
                options={{
                    title: 'Add Comic',
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
        <SafeAreaProvider>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarLabel: ({ focused }) => {
                        let iconName = 'home'

                        if (route.name === 'HomeStack') {
                            iconName = focused ? 'Home' : 'Home'
                        } else if (route.name === 'LoginStack') {
                            iconName = focused ? 'Login' : 'Login'
                        } else if (route.name === 'ProfileStack') {
                            iconName = focused ? 'Account' : 'Account'
                        }
                        return (
                            <Text color="white" fontSize={'xs'}>
                                {iconName}
                            </Text>
                        )
                    },
                    headerShown: false,
                    tabBarActiveTintColor: 'red',
                    tabBarInactiveTintColor: 'white',
                    tabBarButton: (props) => (
                        <Pressable
                            android_ripple={{ color: 'white' }}
                            {...props}
                        />
                    ),
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
                        <Box bg="muted.600" w="full" h="full" pt={5} />
                    ),
                })}
            >
                <Tab.Screen name="HomeStack" component={HomeStackScreen} />
                {!user ? (
                    <Tab.Screen
                        name="LoginStack"
                        component={LoginStackScreen}
                    />
                ) : (
                    <Tab.Screen
                        name="ProfileStack"
                        component={ProfileStackScreen}
                    />
                )}
            </Tab.Navigator>
        </SafeAreaProvider>
    )
}
