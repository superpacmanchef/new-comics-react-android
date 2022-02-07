import { Box, Center, FlatList, Text, Button } from 'native-base'
import React, { useState } from 'react'
import ComicComponent from '../components/Comics/comicComponent'
import { useCollection, usePull, useUser } from '../lib/hooks'

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
                <Box mx="2" mt="3">
                    <FlatList
                        data={pullList}
                        keyExtractor={(item, index) => item}
                        renderItem={(item) => {
                            return <Text color="white">{item.item}</Text>
                        }}
                    />
                </Box>
            )}
        </Box>
    )
}

export default Profile
