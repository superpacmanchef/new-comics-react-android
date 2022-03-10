import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Box, Center, Text, Image, ScrollView, Divider } from 'native-base'
import React, { useEffect, useState } from 'react'
import { HomeStackParamList } from '../components/Nav/Nav'
import MainButton from '../components/UI/MainButton'
import { useCollection, usePull, useUser } from '../lib/hooks'
import addComicToCollection from '../utils/addComicToCollection'
import addComicToPullList from '../utils/addComicToPullList'
import removeComicFromCollection from '../utils/removeComicFromCollection'
import removeComicFromPullList from '../utils/removeComicFromPullList'

type FocusComicScreen = NativeStackScreenProps<HomeStackParamList, 'FocusComic'>

const InfoBlock = (props: { data: string; title: string }) => {
    const { data, title } = props

    return (
        <>
            <Box w="full" my="2">
                <Text color={'white'} fontSize="20" w="full" textAlign={'left'}>
                    {title}:
                </Text>
                <Text color={'white'} fontSize="16" w="full" textAlign={'left'}>
                    {data}
                </Text>
            </Box>
            <Divider my="1" />
        </>
    )
}

const FocusComic = (props: FocusComicScreen) => {
    const { comic } = props.route.params

    const [user] = useUser()
    const { pullList, pullListMutate } = usePull()
    const { collection, collectionMutate } = useCollection()
    const [inCollection, updateInCollection] = useState(true)

    useEffect(() => {
        props.navigation.setOptions({ headerTitle: comic.title })
    }, [])

    useEffect(() => {
        updateInCollection(
            !collection
                .map((collectionComic: Comic_ShortBoxed_SplitTitle_Image) => {
                    if (collectionComic.diamond_id === comic.diamond_id) {
                        return true
                    }
                    return false
                })
                .some((el: boolean) => el)
        )
    }, [collection])

    return (
        <ScrollView>
            <Box bg="muted.800" flex="1" px="2">
                <Center>
                    <Text
                        color={'white'}
                        fontSize="24"
                        w="full"
                        textAlign={'center'}
                    >
                        {comic.title} #{comic.issue_no}
                    </Text>
                    <Image
                        source={{ uri: comic.image }}
                        alt="Alternate Text"
                        height={'350'}
                        width="500"
                        resizeMode={'contain'}
                        m="3"
                    />

                    {/* Logged in user only - Add/Remove from Colleciton/Pull list */}
                    <Box flexDir={'row'}>
                        {user &&
                            (!pullList.includes(
                                comic.title
                                    .toUpperCase()
                                    .replace('THE ' || 'The ', '')
                            ) ? (
                                <MainButton
                                    onPress={() => {
                                        let title = comic.title.toUpperCase()
                                        title = title.replace('THE ', '')
                                        addComicToPullList(
                                            title,
                                            pullListMutate
                                        )
                                    }}
                                >
                                    <Text textAlign={'center'} color="white">
                                        Add to Pull List
                                    </Text>
                                </MainButton>
                            ) : (
                                <MainButton
                                    onPress={() => {
                                        removeComicFromPullList(
                                            comic.title,
                                            pullListMutate
                                        )
                                    }}
                                >
                                    <Text textAlign={'center'} color="white">
                                        Remove From Pull List
                                    </Text>
                                </MainButton>
                            ))}

                        {user &&
                            (inCollection ? (
                                <MainButton
                                    onPress={() => {
                                        addComicToCollection(
                                            comic,
                                            collectionMutate
                                        )
                                    }}
                                >
                                    <Text textAlign={'center'} color="white">
                                        Add to Collections
                                    </Text>
                                </MainButton>
                            ) : (
                                <MainButton
                                    onPress={() => {
                                        removeComicFromCollection(
                                            comic,
                                            collectionMutate
                                        )
                                    }}
                                >
                                    <Text textAlign={'center'} color="white">
                                        Remove From Collection
                                    </Text>
                                </MainButton>
                            ))}
                    </Box>

                    <Box w="full" my="2">
                        <InfoBlock
                            title="Description"
                            data={comic.description}
                        />
                        <InfoBlock title="Creators" data={comic.creators} />
                        <InfoBlock title="Publisher" data={comic.publisher} />
                        <InfoBlock
                            title="Release Date"
                            data={comic.release_date}
                        />
                    </Box>
                </Center>
            </Box>
        </ScrollView>
    )
}

export default FocusComic
