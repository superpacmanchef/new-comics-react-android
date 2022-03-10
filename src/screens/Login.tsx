import { Box, Button, Input, ScrollView, Text } from 'native-base'
import React, { useState } from 'react'
import MainButton from '../components/UI/MainButton'
import { useCollection, usePull, useUser } from '../lib/hooks'
const link = 'http://753e-82-20-31-7.ngrok.io'

const Login = () => {
    const [inputEmail, updateInputEmail] = useState('')
    const [inputPassword, updateInputPassword] = useState('')
    const [inputPasswordRepeat, updateInputPassowrdRepeat] = useState('')
    const [inputUsername, updateInputUsername] = useState('')

    const [user, { mutate }] = useUser()
    const { collectionMutate } = useCollection()
    const { pullListMutate } = usePull()
    const [toShow, updateToShow] = useState('Login')

    const logUser = async () => {
        const mailformat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!inputEmail.match(mailformat)) {
            alert('Valid email address!')
            return
        }

        const body = {
            username: inputEmail,
            password: inputPassword,
        }
        const res = await fetch(`${link}/userHandler/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })

        if (res.status === 200) {
            const userObj = await res.json()
            mutate(userObj.username)
            collectionMutate(userObj.collection)
            pullListMutate(userObj.pullList)
        } else {
            alert('Incorrect username or password.')
        }
    }

    const regUser = async () => {
        const mailformat =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        if (!inputEmail.match(mailformat)) {
            alert('Valid email address!')
            return
        }

        if (inputPassword !== inputPasswordRepeat) {
            alert('Passwords do not match.')
            return
        }

        const body = {
            email: inputEmail,
            password: inputPassword,
            passwordRepeat: inputPasswordRepeat,
            username: inputUsername,
        }

        const res = await fetch(`${link}/userHandler/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        })
        if (res.status === 200) {
            logUser()
        } else {
            alert('That email is already registered.')
        }
    }

    return (
        <Box bg="muted.800" flex="1" px="2">
            <Box flexDirection="row" mx="auto" mt="8">
                <Button
                    flex="1"
                    ml="2"
                    borderRadius={'0'}
                    bg={toShow === 'Login' ? 'red.600' : 'gray.200'}
                    onPress={() => {
                        updateToShow('Login')
                    }}
                >
                    Login
                </Button>
                <Button
                    flex="1"
                    mr="2"
                    borderRadius={'0'}
                    bg={toShow === 'Register' ? 'red.600' : 'gray.200'}
                    onPress={() => {
                        updateToShow('Register')
                    }}
                >
                    Register
                </Button>
            </Box>
            <ScrollView>
                <Box
                    borderRadius={'10'}
                    w="5/6"
                    bg="muted.500"
                    mx="auto"
                    my="12"
                    px="5"
                    pb="12"
                    pt="6"
                    color="white"
                    shadow="9"
                >
                    {toShow === 'Login' ? (
                        <>
                            <Text fontSize={'28'} color="white">
                                Login
                            </Text>
                            <Input
                                value={inputEmail}
                                onChangeText={(val) => updateInputEmail(val)}
                                type="text"
                                placeholderTextColor="white"
                                color="white"
                                mt="8"
                                placeholder="Email"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Input
                                color="white"
                                onChangeText={(val) => updateInputPassword(val)}
                                value={inputPassword}
                                textDecorationColor={'white'}
                                placeholderTextColor="white"
                                type="password"
                                mt="8"
                                placeholder="Password"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Box mt={5}>
                                <MainButton
                                    onPress={() => {
                                        logUser()
                                    }}
                                >
                                    Login
                                </MainButton>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Text fontSize={'28'} color="white">
                                Register
                            </Text>
                            <Input
                                value={inputEmail}
                                onChangeText={(val) => updateInputEmail(val)}
                                type="text"
                                placeholderTextColor="white"
                                color="white"
                                mt="8"
                                placeholder="Email"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Input
                                color="white"
                                onChangeText={(val) => updateInputUsername(val)}
                                value={inputUsername}
                                textDecorationColor={'white'}
                                placeholderTextColor="white"
                                mt="8"
                                placeholder="Username"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Input
                                color="white"
                                onChangeText={(val) => updateInputPassword(val)}
                                value={inputPassword}
                                textDecorationColor={'white'}
                                placeholderTextColor="white"
                                type="password"
                                mt="8"
                                placeholder="Password"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Input
                                color="white"
                                onChangeText={(val) =>
                                    updateInputPassowrdRepeat(val)
                                }
                                value={inputPasswordRepeat}
                                textDecorationColor={'white'}
                                placeholderTextColor="white"
                                type="password"
                                mt="8"
                                placeholder="Password Repeat"
                                bg="muted.400"
                                shadow="4"
                                maxWidth="300px"
                            />
                            <Box mt={5}>
                                <MainButton
                                    onPress={() => {
                                        regUser()
                                    }}
                                >
                                    Register
                                </MainButton>
                            </Box>
                        </>
                    )}
                </Box>
            </ScrollView>
        </Box>
    )
}

export default Login
