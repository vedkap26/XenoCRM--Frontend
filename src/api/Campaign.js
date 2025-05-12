import Axios from 'axios'

const createCampaign = async (campaign) => {
    await Axios.post(process.env.REACT_APP_BACKEND_URL + '/campaign/add', {
        ...campaign
    })
}

const getCampaigns = async () => {
    return await Axios.get(process.env.REACT_APP_BACKEND_URL + '/campaign')
}

const executeCampaign = async (campaign) => {
    await Axios.post(process.env.REACT_APP_BACKEND_URL + '/campaign/execute', {
        ...campaign
    })
}

export default {
    createCampaign,
    getCampaigns,
    executeCampaign
}