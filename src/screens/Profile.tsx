import { Box, FlatList, Text, Button, InputGroup } from 'native-base'
import React, { useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import { useCollection, usePull, useUser } from '../lib/hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import removeComicFromPullList from '../utils/removeComicFromPullList'
import * as ImagePicker from 'expo-image-picker'
const link = 'http://beb2-82-20-31-7.ngrok.io'

const Profile = () => {
    const [user, { mutate }] = useUser()
    const { pullList, pullListMutate } = usePull()
    const { collection, collectionMutate } = useCollection()

    const [toShow, updateToShow] = useState('Collection')

    return (
        <Box bg="muted.800" flex="1">
            <Text color="white" fontSize={'20'} mt="2" mx="auto">
                {user.username}'s Profile
            </Text>

            <Box flexDirection="row" mx="auto">
                <Button
                    flex="1"
                    ml="2"
                    borderRadius={'0'}
                    bg={toShow === 'Collection' ? 'red.600' : 'gray.200'}
                    onPress={() => {
                        updateToShow('Collection')
                    }}
                >
                    Collection
                </Button>
                <Button
                    flex="1"
                    mr="2"
                    borderRadius={'0'}
                    bg={toShow === 'PullList' ? 'red.600' : 'gray.200'}
                    onPress={() => {
                        updateToShow('PullList')
                    }}
                >
                    Pull List
                </Button>
            </Box>
            {toShow === 'Collection' ? (
                <ComicComponent chosenWeeksComicsFilter={collection} />
            ) : (
                <Box mx="2" my="4" flex="1">
                    <FlatList
                        data={pullList}
                        keyExtractor={(item, index) => item}
                        renderItem={(item) => {
                            return (
                                <Box flexDir="row" mb="6">
                                    <Text
                                        flex="1"
                                        mr="4"
                                        fontSize={20}
                                        color="white"
                                    >
                                        {item.item}
                                    </Text>
                                    <MaterialCommunityIcons
                                        onPress={() => {
                                            removeComicFromPullList(
                                                item.item,
                                                pullListMutate
                                            )
                                        }}
                                        name="delete-forever"
                                        color="red"
                                        size={30}
                                    />
                                </Box>
                            )
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Profile
