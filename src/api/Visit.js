import Axios from 'axios'

const getVisits = async () => {
    return await Axios.get(process.env.REACT_APP_BACKEND_URL + '/visit')
}

const createVisit = async (visit) => {
    return await Axios.post(process.env.REACT_APP_BACKEND_URL + "/visit/add", {
        ...visit
    })
}


export default { getVisits, createVisit }