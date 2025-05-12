import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios'
import VisitsList from "../../components/VisitsList";
import VisitApi from '../../api/Visit'

const Visits = () => {
    const [visits, setVisits] = useState([])
    const navigate = useNavigate()

    const handleCreateNew = () => {
        navigate('/visits/create')
    };


    useEffect(() => {
        getVisits()
    }, [])

    const getVisits = async () => {
        const visits = await VisitApi.getVisits()

        const newVisits = visits.data.map((item) => (
            {
                id: item._id,
                customer: item.customerId.name,
                source: item.source,
                date: item.date
            }
        ))

        setVisits(newVisits)

    }


    return (
        <Box m="20px">
            <Header
                title="VISITS"
                subtitle="List of all visits"
            />
            <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" onClick={handleCreateNew}>
                    Create New Visit
                </Button>
            </Box>
            <VisitsList visits={visits} />


        </Box>
    );
};

export default Visits;
