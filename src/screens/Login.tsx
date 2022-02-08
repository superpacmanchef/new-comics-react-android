import { Box, Button, Input, Text } from 'native-base'
import React, { useState } from 'react'
import { useUser } from '../lib/hooks'
const link = 'http://1833-82-20-31-7.ngrok.io'

const Login = () => {
    const [inputEmail, updateInputEmail] = useState('')
    const [inputPassword, updateInputPassword] = useState('')

    const [user, { mutate }] = useUser()

    const logUser = async () => {
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
            console.log(userObj)
            mutate(userObj)
        } else {
            alert('Incorrect username or password.')
        }
    }

    return (
        <Box bg="muted.800" flex="1" px="2">
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
                <Button
                    bg="red.600"
                    mt="8"
                    onPress={() => {
                        logUser()
                    }}
                >
                    Login
                </Button>
            </Box>
        </Box>
    )
}

export default Login
