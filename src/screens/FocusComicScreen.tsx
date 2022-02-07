import { NativeStackScreenProps } from '@react-navigation/native-stack'
import {
    Box,
    Center,
    Text,
    Image,
    ScrollView,
    Divider,
    InputGroup,
    Button,
} from 'native-base'
import React, { useEffect, useState } from 'react'
import { HomeStackParamList } from '../components/Nav/Nav'
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
    const [t, updateT] = useState(true)

    useEffect(() => {
        console.log('bums2')

        updateT(
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
                    <Box w="full" my="2">
                        <InfoBlock
                            title="Description"
                            data={comic.description}
                        />
                        <InfoBlock title="Creators" data={comic.creators} />
                        <InfoBlock title="Diamond ID" data={comic.diamond_id} />
                        <InfoBlock
                            title="Release Date"
                            data={comic.release_date}
                        />
                    </Box>

                    {user &&
                        (pullList.length > 0 &&
                        !pullList.includes(comic.title.toUpperCase()) ? (
                            <Button
                                onPress={() => {
                                    addComicToPullList(
                                        comic.title,
                                        pullListMutate
                                    )
                                }}
                            >
                                Add to Pull List
                            </Button>
                        ) : (
                            <Button
                                onPress={() => {
                                    removeComicFromPullList(
                                        comic.title,
                                        pullListMutate
                                    )
                                }}
                            >
                                Remove From Pull List
                            </Button>
                        ))}

                    {user &&
                        (t ? (
                            <Button
                                onPress={() => {
                                    addComicToCollection(
                                        comic,
                                        collectionMutate
                                    )
                                }}
                            >
                                Add to Collections
                            </Button>
                        ) : (
                            <Button
                                onPress={() => {
                                    removeComicFromCollection(
                                        comic,
                                        collectionMutate
                                    )
                                }}
                            >
                                Remove From Collection
                            </Button>
                        ))}
                </Center>
            </Box>
        </ScrollView>
    )
}

export default FocusComic
