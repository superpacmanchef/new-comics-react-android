import { Box, FlatList, Text, Button, IconButton, Icon } from 'native-base'
import React, { useLayoutEffect, useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import { useCollection, usePull, useUser } from '../lib/hooks'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import removeComicFromPullList from '../utils/removeComicFromPullList'

const Profile = (props: any) => {
    const [user, { mutate }] = useUser()
    const { pullList, pullListMutate } = usePull()
    const { collection, collectionMutate } = useCollection()

    const [toShow, updateToShow] = useState('Collection')

    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Box mr="2">
                    <IconButton
                        icon={
                            <Icon
                                as={<MaterialCommunityIcons name="plus" />}
                                name="emoji-happy"
                            />
                        }
                        _icon={{
                            color: 'red.600',
                            size: 'md',
                        }}
                        _hover={{
                            bg: 'red.500:alpha.20',
                        }}
                        _pressed={{
                            bg: 'red.500:alpha.20',
                        }}
                        onPress={() => {
                            props.navigation.navigate('AddComic')
                        }}
                    />
                </Box>
            ),
        })
    }, [])

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
                    bg={toShow === 'Collection' ? 'red.600' : 'gray.100'}
                    _pressed={{
                        bg: toShow === 'Collection' ? 'red.800' : 'red.400',
                    }}
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
                    bg={toShow === 'PullList' ? 'red.600' : 'gray.100'}
                    _pressed={{
                        bg: toShow === 'PullList' ? 'red.800' : 'red.400',
                    }}
                    onPress={() => {
                        updateToShow('PullList')
                    }}
                >
                    Pull List
                </Button>
            </Box>
            {toShow === 'Collection' ? (
                <Box mx="2" flex="1">
                    <ComicComponent chosenWeeksComicsFilter={collection} />
                </Box>
            ) : (
                <Box mx="2" my="4" flex="1">
                    <FlatList
                        data={pullList}
                        keyExtractor={(item, index) => item}
                        renderItem={(item) => {
                            return (
                                <Box flexDir="row" mb="6" mx="4">
                                    <Text
                                        flex="1"
                                        mr="4"
                                        fontSize={20}
                                        color="white"
                                    >
                                        {item.item}
                                    </Text>
                                    <IconButton
                                        icon={
                                            <Icon
                                                as={
                                                    <MaterialCommunityIcons
                                                        name="delete-forever"
                                                        color="red"
                                                    />
                                                }
                                                name="Delete Comic"
                                            />
                                        }
                                        _icon={{
                                            color: 'red.600',
                                            size: 'md',
                                        }}
                                        _hover={{
                                            bg: 'red.500:alpha.20',
                                        }}
                                        _pressed={{
                                            bg: 'red.500:alpha.20',
                                        }}
                                        onPress={() => {
                                            removeComicFromPullList(
                                                item.item,
                                                pullListMutate
                                            )
                                        }}
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
