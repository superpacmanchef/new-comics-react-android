import {
    Box,
    Input,
    Text,
    FormControl,
    WarningOutlineIcon,
    Stack,
    KeyboardAvoidingView,
    ScrollView,
    VStack,
    IconButton,
    Icon,
    Modal,
} from 'native-base'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Platform, Alert } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import axios from 'axios'
import { useCollection } from '../lib/hooks'
import addComicToCollection from '../utils/addComicToCollection'
import { BarCodeScanner } from 'expo-barcode-scanner'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MainButton from '../components/UI/MainButton'

const link = 'http://321d-82-20-31-7.ngrok.io'

const AddComicScreen = (props: any) => {
    const [addComicTitle, updateAddComicTitle] = useState<string | undefined>()
    const [addComicIssueNumber, updateAddComicIssueNumber] = useState<
        string | undefined
    >()

    const [addComicDate, updateAddComicDate] = useState<Date | undefined>()
    const [addComicID, updateAddComicID] = useState('')
    const [addComicUPC, updateAddComicUPC] = useState('')

    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState()
    const [show, setShow] = useState(false)

    const [hasPermission, updateHasPermission] = useState<boolean | null>(null)
    const [scanned, setScanned] = useState(false)
    const [addLoading, updateAddLoading] = useState(false)

    const [modalShow, updateModalShow] = useState(false)

    const [cameraShow, updateCameraShow] = useState(false)

    const { collectionMutate } = useCollection()

    useEffect(() => {
        askPhotoPermission()
    }, [])

    //Adds Plus icon to header
    useLayoutEffect(() => {
        props.navigation.setOptions({
            headerRight: () => (
                <Box mr="2">
                    <IconButton
                        icon={
                            <Icon
                                as={<MaterialCommunityIcons name="camera" />}
                                name="emoji-happy"
                            />
                        }
                        _icon={{
                            color: cameraShow ? 'white' : 'red.600',
                            size: 'md',
                        }}
                        _hover={{
                            bg: 'red.500:alpha.20',
                        }}
                        _pressed={{
                            bg: 'red.500:alpha.20',
                        }}
                        onPress={async () => {
                          updateCameraShow(!cameraShow)
                        }}
                    />
                </Box>
            ),
        })
    }, [cameraShow])

    const onChange = (event: any, selectedDate: Date) => {
        const currentDate = selectedDate || date
        setShow(Platform.OS === 'ios')
        updateAddComicDate(currentDate)
    }

    const showMode = (currentMode: any) => {
        setShow(currentMode)
        setMode(currentMode)
    }

    const showDatepicker = () => {
        showMode('date')
    }

    const searchComic = async () => {
        updateAddLoading(true)
        if (addComicTitle === '' || addComicTitle === undefined) {
            updateAddComicTitle('')
            updateAddLoading(false)

            return
        }

        if (addComicIssueNumber === '' || addComicIssueNumber === undefined) {
            updateAddComicIssueNumber('')
            updateAddLoading(false)

            return
        }

        let upcCopy = addComicUPC.slice(0, addComicUPC.length - 5)
				if(addComicUPC){
        const t = 3 - addComicIssueNumber?.length
        let y = `11`

        if (t == 2) {
            y = '00' + addComicIssueNumber + y
        } else {
            y = '0' + addComicIssueNumber + y
        }

        upcCopy = upcCopy + y
				}

        let coverMonth = ''
        let coverYear = ''

        if (addComicDate !== undefined) {
            coverMonth = `${addComicDate.getMonth() + 1}`
            coverYear = `${addComicDate.getFullYear()}`
        }

        if (
            (addComicUPC !== '' && addComicUPC.length < 17) ||
            addComicUPC.length > 17
        ) {
            Alert.alert('UPC code length is not exactly 17.')
            return
        }

        if (
            (addComicTitle === '' && addComicTitle !== undefined) ||
            (addComicIssueNumber === '' && addComicIssueNumber !== undefined)
        ) {
            Alert.alert('Missed Comic Title or Issue Number.')
            return
        }

        try {
            const data = await axios.post(`${link}/comicSearchHandler`, {
                comicTitle: addComicTitle,
                comicIssueNumber: addComicIssueNumber,
                comicMonth: coverMonth,
                comicYear: coverYear,
                comicID: addComicID,
                comicUPC: upcCopy,
            })

            await addComicToCollection(data.data, collectionMutate)
            updateAddComicID('')
            updateAddComicUPC('')
            updateAddComicDate(undefined)
            updateAddComicIssueNumber('')
            updateAddComicTitle('')
            props.navigation.pop()
        } catch (err) {
            console.log(err)

            Alert.alert('Something went wrong. Please try again.')
        } finally {
            updateAddLoading(false)
        }
    }

    const searchComicPhoto = async (upc: string, issueNumber: string) => {
        updateAddLoading(true)
        if ((upc !== '' && upc.length < 17) || upc.length > 17) {
            Alert.alert('UPC code length is not exactly 17')
            updateAddLoading(false)

            return
        }

        try {
            const data = await axios.post(`${link}/comicSearchHandler`, {
                comicTitle: '',
                comicIssueNumber: '',
                comicMonth: '',
                comicYear: '',
                comicID: '',
                comicUPC: upc,
            })

            await addComicToCollection(data.data, collectionMutate)
            updateModalShow(false)
            updateAddComicUPC('')
            updateAddComicIssueNumber('')
            props.navigation.pop()
        } catch (err) {
            Alert.alert('Something went wrong. Please try again.')
        } finally {
            updateAddLoading(false)
        }
    }

    const handleBarCodeScanned = async ({
        type,
        data,
    }: {
        type: any
        data: any
    }): Promise<void> => {
        updateAddComicUPC(data)

        updateModalShow(true)
    }

    const askPhotoPermission = async () => {
        const { status } = await BarCodeScanner.requestPermissionsAsync()
        updateHasPermission(status === 'granted')
        return status === 'granted'
    }

    return (
        <KeyboardAvoidingView h="100%" bg="muted.800">
            {cameraShow ? (
                <VStack flex="1" h={'100%'} px="2" mt="4">
                    <Text color="white" fontSize={'2xl'} mx="auto" mb="4">
                        Scan Comic UPC
                    </Text>
                    <Modal
                        isOpen={modalShow}
                        onClose={() => {
                            updateModalShow(false)
                        }}
                    >
                        <Modal.Content
                            maxWidth="400px"
                            height={'300px'}
                            bg="muted.600"
                        >
                            <Modal.CloseButton bg="white" />

                            <Modal.Header>
                                <Text color="white" fontSize={16}>
                                    Input Comic Issue Number
                                </Text>
                            </Modal.Header>
                            <Modal.Body flex={1}>
                                <FormControl
                                    isInvalid={addComicIssueNumber === ''}
                                    mt="10"
                                >
                                    <Stack>
                                        <Input
                                            size={'lg'}
                                            color="white"
                                            onChangeText={
                                                updateAddComicIssueNumber
                                            }
                                            value={addComicIssueNumber}
                                            placeholder="Issue Number"
                                            keyboardType="numeric"
                                        />
                                        <FormControl.ErrorMessage
                                            leftIcon={
                                                <WarningOutlineIcon size="xs" />
                                            }
                                        >
                                            Comic Issue Number is Required!
                                        </FormControl.ErrorMessage>
                                    </Stack>
                                </FormControl>
                            </Modal.Body>
                            <Modal.Footer bg="muted.600">
                                <MainButton
                                    isLoading={addLoading}
                                    onPress={() => {
                                        updateAddLoading(true)
                                        if (addComicIssueNumber) {
                                            const t =
                                                3 - addComicIssueNumber?.length
                                            let y = `11`

                                            if (t == 2) {
                                                y =
                                                    '00' +
                                                    addComicIssueNumber +
                                                    y
                                            } else {
                                                y =
                                                    '0' +
                                                    addComicIssueNumber +
                                                    y
                                            }

                                            const r = addComicUPC + y
                                            updateAddComicUPC(r)
                                            searchComicPhoto(
                                                r,
                                                addComicIssueNumber
                                            )
                                        } else {
                                            updateAddComicIssueNumber('')
                                        }
                                    }}
                                >
                                    Add
                                </MainButton>
                            </Modal.Footer>
                        </Modal.Content>
                    </Modal>

                    <BarCodeScanner
                        onBarCodeScanned={
                            scanned ? undefined : handleBarCodeScanned
                        }
                        style={{ height: '80%' }}
                    />
                </VStack>
            ) : (
                <ScrollView>
                    <VStack flex="1" justifyContent="center" h={'100%'} px="2">
                        <FormControl
                            isRequired
                            isInvalid={addComicTitle === ''}
                        >
                            <Stack mt="4">
                                <FormControl.Label color="white">
                                    <Text color="white">Comic Name</Text>
                                </FormControl.Label>

                                <Input
                                    size={'2xl'}
                                    color="white"
                                    onChangeText={updateAddComicTitle}
                                    value={addComicTitle}
                                    placeholder="Amazing Spider-Man *"
                                />
                                <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size="xs" />}
                                >
                                    Comic Name is Required!
                                </FormControl.ErrorMessage>
                            </Stack>
                        </FormControl>

                        <FormControl
                            isRequired
                            isInvalid={addComicIssueNumber === ''}
                        >
                            <Stack mt="4">
                                <FormControl.Label color="white">
                                    <Text color="white">
                                        Comic Issue Number
                                    </Text>
                                </FormControl.Label>
                                <Input
                                    size={'2xl'}
                                    color="white"
                                    onChangeText={updateAddComicIssueNumber}
                                    value={addComicIssueNumber}
                                    placeholder="Issue No *"
                                    keyboardType="numeric"
                                />
                                <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size="xs" />}
                                >
                                    Comic Issue Number is Required!
                                </FormControl.ErrorMessage>
                            </Stack>
                        </FormControl>

                        <FormControl>
                            <Stack mt="4">
                                <FormControl.Label color="white">
                                    <Text color="white">Comic Cover Date</Text>
                                </FormControl.Label>

                                <Input
                                    onPressOut={() => {
                                        showDatepicker()
                                    }}
                                    size={'2xl'}
                                    color="white"
                                    value={
                                        addComicDate !== undefined
                                            ? addComicDate
                                                  .getMonth()
                                                  .toString() +
                                              ' / ' +
                                              addComicDate
                                                  .getFullYear()
                                                  .toString()
                                            : ''
                                    }
                                    placeholder="Release Date *"
                                />
                                <FormControl.Label>
                                    <Text color="white">
                                        Just year and month matter
                                    </Text>
                                </FormControl.Label>
                            </Stack>
                        </FormControl>

                        <FormControl>
                            <Stack mt="4">
                                <FormControl.Label color="white">
                                    <Text color="white">Comic UPC</Text>
                                </FormControl.Label>
                                <Input
                                    size={'2xl'}
                                    color="white"
                                    onChangeText={updateAddComicID}
                                    value={addComicID}
                                    placeholder="Diamond ID *"
                                />
                            </Stack>
                        </FormControl>

                        <FormControl
                            isInvalid={
                                (addComicUPC !== '' &&
                                    addComicUPC.length < 17) ||
                                addComicUPC.length > 17
                            }
                        >
                            <Stack mt="4">
                                <FormControl.Label color="white">
                                    <Text color="white">Comic UPC</Text>
                                </FormControl.Label>
                                <Input
                                    size={'2xl'}
                                    color="white"
                                    keyboardType="numeric"
                                    onChangeText={updateAddComicUPC}
                                    value={addComicUPC}
                                    placeholder="UPC *"
                                />
                                <FormControl.ErrorMessage
                                    leftIcon={<WarningOutlineIcon size="xs" />}
                                >
                                    <Text color="white">
                                        UPC is less than 17
                                    </Text>
                                </FormControl.ErrorMessage>
                            </Stack>
                        </FormControl>

                        {show && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={date}
                                mode={mode}
                                is24Hour={true}
                                display="default"
                                onChange={(event: any, selectedDate: any) => {
                                    onChange(event, selectedDate)
                                }}
                            />
                        )}
                        <Box mt="4">
                            <MainButton
                                isLoading={addLoading}
                                onPress={() => {
                                    updateAddLoading(true)
                                    searchComic()
                                }}
                                mx="0"
                                fontSize="xl"
                            >
                                Add to Pull List
                            </MainButton>
                        </Box>
                    </VStack>
                </ScrollView>
            )}
        </KeyboardAvoidingView>
    )
}

export default AddComicScreen
