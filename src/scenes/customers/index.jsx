import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomerList from "../../components/CustomerList";

import CustomerApi from '../../api/Customer'

const Customers = () => {
    const [customers, setCustomers] = useState([])
    const navigate = useNavigate()

    const handleCreateNew = () => {
        navigate('/customers/create')
    };


    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = async () => {
        const customers = await CustomerApi.getFilterCustomer([])

        const newCustomers = customers.data.map((item) => (
            {
                id: item._id,
                name: item.name,
                age: item.age,
                email: item.email,
                lastVisit: item.lastVisit,
                totalVisits: item.totalVisits,
                totalSpent: item.totalSpent,
            }
        ))

        setCustomers(newCustomers)

    }


    return (
        <Box m="20px">
            <Header
                title="CUSTOMERS"
                subtitle="List of all customers"
            />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={handleCreateNew}>
                    Create New Customer
                </Button>
            </Box>
            <CustomerList customers={customers} />


        </Box>
    );
};

export default Customers;
