import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import Axios from 'axios'
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CustometApi from '../../api/Customer'
import VisitApi from '../../api/Visit'

const VisitsCreate = () => {
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const navigate = useNavigate()
    const [customers, setCustomers] = useState([])


    useEffect(() => {
        getCustomers()
    }, [])

    const getCustomers = async () => {
        const customers = await CustometApi.getFilterCustomer([])
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

    const handleFormSubmit = async (values) => {
        const response = await VisitApi.createVisit({
            source: values.source,
            customerId: values.customerId
        })

        navigate('/visits')
    };

    return (
        <Box m="20px">
            <Header title="CREATE VISIT" subtitle="Create a New User Visit" />

            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={checkoutSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit}>
                        <Box
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                            }}
                        >
                            <FormControl
                                variant="filled"
                                error={!!touched.field && !!errors.field}
                                sx={{ gridColumn: "span 4" }}
                                fullWidth >
                                <InputLabel id="customer-id-label">Customer</InputLabel>
                                <Select
                                    labelId="customer-id-label"
                                    id="customerId"
                                    name="customerId"
                                    value={values.customerId}
                                    label="Customer"
                                    onChange={handleChange}
                                >
                                    {customers.map((value) => (
                                        <MenuItem value={value.id}>{value.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Source"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.source}
                                name="source"
                                error={!!touched.source && !!errors.source}
                                helperText={touched.source && errors.source}
                                sx={{ gridColumn: "span 4" }}
                            />

                        </Box>
                        <Box display="flex" justifyContent="end" mt="20px">
                            <Button type="submit" color="secondary" variant="contained">
                                Create New Visit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};


const checkoutSchema = yup.object().shape({
    customerId: yup.string().required("required"),
    source: yup.string().required("required"),
});

const initialValues = {
    customerId: "",
    source: "",
};

export default VisitsCreate;
