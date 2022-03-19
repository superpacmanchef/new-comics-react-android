import axios from 'axios'
import {
    Box,
    CheckIcon,
    FormControl,
    Icon,
    IconButton,
    Modal,
    Select,
    Text,
} from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ComicComponent from '../components/Comics/comicComponent'
import MainButton from '../components/UI/MainButton'
import filterComicPublishers from '../utils/filterComicPublishers'
const link = 'http://321d-82-20-31-7.ngrok.io'

const Home = (props: any) => {
    const [chosenWeeksComics, updateChosenWeeksComics] = useState<
        Comic_ShortBoxed_SplitTitle_Image[]
    >([])
    const [chosenWeeksComicsFilter, updateChosenWeeksComicsFilter] = useState<
        Comic_ShortBoxed_SplitTitle_Image[] | null
    >(null)
    const [currentChosenWeek, updateCurrentChosenWeek] = useState(1)
    const [lastChosenWeek, updateLastChosenWeek] = useState<number>()
    const [currentPublisher, updateCurrentPublisher] = useState('ALL')
    const [showModal, updateShowModal] = useState(false)

    const getWeeksComics = async () => {
        //If filter within same week no need to re-get weeks comics
        if (currentChosenWeek !== lastChosenWeek) {
            updateLastChosenWeek(currentChosenWeek)

            axios
                .get(`${link}/weekComics/?week=${currentChosenWeek}`)
                .then((res) => {
                    const weekArrayWithImage = res.data.map(
                        (comic: Comic_ShortBoxed_SplitTitle) => {
                            return { ...comic, image: 'null' }
                        }
                    )

                    updateChosenWeeksComics(weekArrayWithImage)

                    const filteredChosenWeeksComics = filterComicPublishers(
                        weekArrayWithImage,
                        currentPublisher,
                        { pullList: [] }
                    )

                    updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
                })
                .catch((err) => console.log(err))
        } else {
            const filteredChosenWeeksComics = filterComicPublishers(
                chosenWeeksComics,
                currentPublisher,
                { pullList: [] }
            )

            updateChosenWeeksComicsFilter(filteredChosenWeeksComics)
        }
    }

    useEffect(() => {
        getWeeksComics()
    }, [])

    //Adds filter logo to header
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Box mr="2">
                    <IconButton
                        icon={
                            <Icon
                                as={
                                    <MaterialCommunityIcons
                                        name="filter"
                                        color="white"
                                    />
                                }
                                name="filter"
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
                            updateShowModal(true)
                        }}
                    />
                </Box>
            ),
        })
    }, [])

    return (
        <Box bg="muted.800" flex="1" px="2">
            <Modal
                isOpen={showModal}
                onClose={() => {
                    updateShowModal(false)
                }}
            >
                <Modal.Content maxWidth="400px" height={'340px'} bg="muted.500">
                    <Modal.CloseButton bg="white" />

                    <Modal.Header>
                        <Text color="white" fontSize={16}>
                            Filter
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <FormControl mb="4">
                            <FormControl.Label color="white">
                                <Text color="white">Week</Text>
                            </FormControl.Label>
                            <Select 
																_actionSheetContent={{bgColor : "muted.500"}}
                                bgColor="white" 
                                selectedValue={currentChosenWeek.toString()}
                                minWidth="200"
                                accessibilityLabel="Choose Week"
                                placeholder="Choose Week"
                                _selectedItem={{
                                    bg: 'red.500',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) =>
                                    updateCurrentChosenWeek(parseInt(itemValue))
                                }
                            >
                                <Select.Item label="Last Week" value="0" _text={{ color :"white"}} />
                                <Select.Item label="Current Week" value="1"color="white" _text={{ color :"white"}}  />
                                <Select.Item label="Next Week" value="2"color="white" _text={{ color :"white"}}  />
                            </Select>
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>
                                <Text color="white">Publisher</Text>
                            </FormControl.Label>
                            <Select
																_actionSheetContent={{bgColor : "muted.500"}}
                                bgColor="white" 
                                selectedValue={currentPublisher}
                                minWidth="200"
                                accessibilityLabel="Choose Publisher"
                                placeholder="Choose Publisher"
                                _selectedItem={{
                                    bg: 'red.500',
                                    endIcon: <CheckIcon size="5" />,
                                }}
                                mt={1}
                                onValueChange={(itemValue) =>
                                    updateCurrentPublisher(itemValue)
                                }
                            >
                                <Select.Item label="All" value="ALL" _text={{ color :"white"}} />
                                <Select.Item
                                    label="Marvel"
                                    value="MARVEL COMICS" _text={{ color :"white"}} 
                                />
                                <Select.Item
                                    label="Image" 
                                    value="IMAGE COMICS" _text={{ color :"white"}}
                                />
                                <Select.Item
                                    label="Dark Horse"
                                    value="DARK HORSE COMICS" _text={{ color :"white"}}
                                />
                                <Select.Item label="IDW" value="IDW COMICS" _text={{ color :"white"}}/>
                            </Select>
                        </FormControl>
                    </Modal.Body>
                    <Modal.Footer bg="muted.500">
                        <MainButton
                            onPress={() => {
                                getWeeksComics()
                                updateShowModal(false)
                            }}
                            mx="0"
                        >
                            Filter
                        </MainButton>
                    </Modal.Footer>
                </Modal.Content>
            </Modal>
            <ComicComponent chosenWeeksComicsFilter={chosenWeeksComicsFilter} />
        </Box>
    )
}

export default Home
