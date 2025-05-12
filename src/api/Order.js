import Axios from 'axios'

const getOrders = async () => {
    return await Axios.get(process.env.REACT_APP_BACKEND_URL + '/order')
}

const createOrder = async (order) => {
    return await Axios.post(process.env.REACT_APP_BACKEND_URL + "/order/add", {
        ...order
    })
}


export default { getOrders, createOrder }