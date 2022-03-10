/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { View, Center, Box, Skeleton } from 'native-base'
import React from 'react'
import { StyleSheet } from 'react-native'

const LoadingComicTile = () => {
    return (
        <Box style={styles.outerView}>
            <Box
                bg="muted.500"
                mb="4"
                mx="2"
                borderRadius={5}
                style={styles.outerView}
            >
                <Center>
                    <Skeleton
                        h="170"
                        w="130"
                        m="3"
                        rounded="md"
                        startColor="muted.300"
                    />
                    <Skeleton.Text
                        px="5"
                        my="2"
                        lines={1}
                        startColor="muted.300"
                    />
                </Center>
            </Box>
        </Box>
    )
}

export default LoadingComicTile

const styles = StyleSheet.create({
    outerView: {
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
    },
})
