import axios from 'axios'
const link = 'http://1833-82-20-31-7.ngrok.io'

export default (
    comic: Comic_ShortBoxed_SplitTitle_Image,
    collectionMutate: ({
        collection,
    }: {
        collection: Comic_ShortBoxed_SplitTitle_Image[]
    }) => void
) => {
    axios
        .delete(`${link}/collectionHandler`, {
            data: {
                diamond_id: comic.diamond_id,
            },
        })
        .then((res) => {
            if (res.data) {
                console.log('bums')
                collectionMutate(res.data)
            }
        })
        .catch((err) => console.error(err))
}
