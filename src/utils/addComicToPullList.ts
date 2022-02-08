import axios from 'axios'
const link = 'http://1833-82-20-31-7.ngrok.io'

export default (
    comicTitle: string,
    pullListMutate: ({ pullList }: { pullList: string }) => void
) => {
    axios
        .post(`${link}/pullHandler`, {
            comic: comicTitle,
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
