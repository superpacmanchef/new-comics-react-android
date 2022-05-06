import axios from 'axios'
const link = 'https://comic-react-server.herokuapp.com'

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
                collectionMutate(res.data)
            }
        })
        .catch((err) => console.error(err))
}
