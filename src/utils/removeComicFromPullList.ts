import axios from 'axios'
const link = 'http://edc0-82-20-31-7.ngrok.io'

export default (
    comicTitle: string,
    pullListMutate: ({ pullList }: { pullList: string }) => void
) => {
    axios
        .delete(`${link}/pullHandler`, {
            data: {
                comic: comicTitle,
            },
        })
        .then((res) => {
            if (res.data) {
                pullListMutate({
                    pullList: res.data,
                })
            }
        })
        .catch((err) => console.error(err))
}
