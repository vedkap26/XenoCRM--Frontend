import Axios from 'axios'

const getCommunications = async () => {
    return await Axios.get(process.env.REACT_APP_BACKEND_URL + '/communication/')
}

export default { getCommunications }