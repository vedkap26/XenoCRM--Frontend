import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import OrdersList from "../../components/OrdersList";
import OrderApi from '../../api/Order'


const Orders = () => {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate()

    const handleCreateNew = () => {
        navigate('/orders/create')
    };


    useEffect(() => {
        getOrders()
    }, [])

    const getOrders = async () => {
        const orders = await OrderApi.getOrders()

        const newOrders = orders.data.map((item) => (
            {
                id: item._id,
                customer: item.customerId.name,
                amount: item.amount,
                date: item.date
            }
        ))

        setOrders(newOrders)

    }


    return (
        <Box m="20px">
            <Header
                title="ORDERS"
                subtitle="List of all orders"
            />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={handleCreateNew}>
                    Create New Order
                </Button>
            </Box>
            <OrdersList orders={orders} />


        </Box>
    );
};

export default Orders;
