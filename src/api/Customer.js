import Axios from 'axios'

const getFilterCustomer = async (filters) => {
    return await Axios.get(process.env.REACT_APP_BACKEND_URL + '/customer/filter?filters=' + JSON.stringify(filters))
}

const createCustomer = async (customer) => {
    return await Axios.post(process.env.REACT_APP_BACKEND_URL + "/customer/add", {
        ...customer
    })
}

export default { getFilterCustomer, createCustomer }