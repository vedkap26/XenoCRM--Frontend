import { Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useState } from "react";
import FilterList from "../../components/FilterList";
import CustomerList from "../../components/CustomerList";
import { tokens } from "../../theme";

import Axios from 'axios'
import { useNavigate } from "react-router-dom";

import CustomerApi from '../../api/Customer'
import CampaignApi from '../../api/Campaign'

const labelValue = {
    'age': "Age",
    'totalSpent': "Total Spent",
    "totalVisits": "Total Visits",
    "lastVisit": "Last Visit",

    "eq": "Equals",
    "gt": "Greater Than",
    "lt": "Less Than",
    "gte": "Greater Than Equals",
    "lte": "Less Than Equals",

    "AND": "And",
    "OR": "Or"
}

const CampaignCreate = () => {
    const [filterSet, setFilterSet] = useState(false)
    const [filters, setFilters] = useState([])
    const [filtersLabel, setFiltersLabel] = useState([])
    const [customers, setCustomers] = useState([])
    const [showSnackbar, setShowSnackbar] = useState(false)
    const [snackMessage, setSnackMessage] = useState("")
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [aiSuggestions, setAiSuggestions] = useState([]);
    const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate()

    const showMessage = (message) => {
        setSnackMessage(message)
        setShowSnackbar(true);
    };

    const handleSnackClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackMessage("")
        setShowSnackbar(false);
    };

    const handleCampaignSubmit = async (values) => {
        const { name, message } = values;
        const rules = filters

        const response = await CampaignApi.createCampaign({
            name,
            message,
            rules
        })


        showMessage("Campaign Added")

        navigate("/campaigns")

    };

    const handleFilterSubmit = (values) => {
        const id = Date.now()
        const newVal = {
            id: id,
            ...values
        }

        const newLab = {
            id: id,
            field: labelValue[values.field],
            operator: labelValue[values.operator],
            value: values.value,
            logicalOperator: labelValue[values.logicalOperator]
        }

        setFilters([...filters, newVal])
        setFiltersLabel([...filtersLabel, newLab])
    }

    const onFilterDelete = (row) => {
        const newFilters = filters.filter((value) => row.id != value.id)
        const newFiltersLabels = filtersLabel.filter((value) => row.id != value.id)

        setFilters(newFilters)
        setFiltersLabel(newFiltersLabels)
    }

    const getCustomers = async () => {
        const response = await CustomerApi.getFilterCustomer(filters)


        const newCustomers = response.data.map((item) => (
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

    const toggleFilterSet = () => {
        setFilterSet(!filterSet)
    }
    const fetchAiSuggestions = async (campaignObjective) => {
        setIsLoadingSuggestions(true);
        try {
            const response = await Axios.post(`${process.env.REACT_APP_BACKEND_URL}/ai/message-suggestions`, {
                campaignObjective
            });

            if (response.data && response.data.suggestions) {
                setAiSuggestions(response.data.suggestions);
                showMessage("Suggestions generated!");
            }
        } catch (error) {
            console.error("AI Fetch Error:", error);
            showMessage("Failed to generate suggestions.");
        } finally {
            setIsLoadingSuggestions(false);
        }
    };

    return (
        <Box m="20px">
            <Header title="CREATE CAMPAIGN" subtitle={filterSet ? "Create a new campaign (Audience Count: " + customers.length + ")" : "Filter target user base"} />
            {
                filterSet ? (
                    <Box>
                        <Formik
                            onSubmit={handleCampaignSubmit}
                            initialValues={campaignInitial}
                            validationSchema={campaignSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                                setFieldTouched,
                                validateForm   
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
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Name"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.name}
                                            name="name"
                                            error={!!touched.name && !!errors.name}
                                            helperText={touched.name && errors.name}
                                            sx={{ gridColumn: "span 4" }}
                                        />
                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Message (Hint: Use placeholder such as %name% %email% %age%)"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.message}
                                            name="message"
                                            error={!!touched.message && !!errors.message}
                                            helperText={touched.message && errors.message}
                                            sx={{ gridColumn: "span 4" }}
                                            InputLabelProps={{ shrink: true }}
                                        />
                                        {aiSuggestions.length > 0 && (
                                            <Box gridColumn="span 4">
                                                <Typography variant="subtitle1" sx={{ mt: 2, mb: 1 }}>
                                                    AI Suggestions:
                                                </Typography>
                                                {aiSuggestions.map((suggestion, idx) => (
                                                    <Box
                                                        key={idx}
                                                        sx={{
                                                            p: 1,
                                                            mb: 1,
                                                            backgroundColor: colors.primary[400],
                                                            borderRadius: 1,
                                                            cursor: "pointer"
                                                        }}
                                                        onClick={() => {
                                                            setFieldValue("message", suggestion);
                                                            setFieldTouched("message", true);
                                                            setTimeout(() => validateForm(), 0);
                                                        }}

                                                    >
                                                        {suggestion}
                                                    </Box>
                                                ))}
                                            </Box>
                                        )}
                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="20px" gap={2}>
                                        <Button onClick={toggleFilterSet} type="button" color="primary" variant="contained">
                                            Back
                                        </Button>

                                        <Button type="submit" color="secondary" variant="contained">
                                            Create New Campaign
                                        </Button>

                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            disabled={isLoadingSuggestions || !values.name}
                                            onClick={() => fetchAiSuggestions(values.name)}
                                        >
                                            {isLoadingSuggestions ? "Generating..." : "Get AI Message Suggestions"}
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>


                    </Box>
                ) : (
                    <Box>
                        <Formik
                            onSubmit={handleFilterSubmit}
                            initialValues={filterInitial}
                            validationSchema={filterSchema}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue,
                                setFieldTouched

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
                                            sx={{ gridColumn: "span 1" }}
                                            fullWidth >
                                            <InputLabel id="field-label">Field</InputLabel>
                                            <Select
                                                labelId="field-label"
                                                id="field"
                                                name="field"
                                                value={values.field}
                                                label="Field"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'age'}>Age</MenuItem>
                                                <MenuItem value={'totalSpent'}>Total Spent</MenuItem>
                                                <MenuItem value={'totalVisits'}>Total Visits</MenuItem>
                                                <MenuItem value={'lastVisit'}>Last Visit</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <FormControl
                                            variant="filled"
                                            error={!!touched.operator && !!errors.operator}
                                            sx={{ gridColumn: "span 1" }}
                                            fullWidth >
                                            <InputLabel id="operator-label">Operator</InputLabel>
                                            <Select
                                                labelId="operator-label"
                                                id="operator"
                                                name="operator"
                                                value={values.operator}
                                                label="Operator"
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'eq'}>Equals</MenuItem>
                                                <MenuItem value={'gt'}>Greater Than</MenuItem>
                                                <MenuItem value={'lt'}>Less Than</MenuItem>
                                                <MenuItem value={'gte'}>Greater Than Equals</MenuItem>
                                                <MenuItem value={'lte'}>Less Than Equals</MenuItem>
                                                <MenuItem value={'ne'}>Not Equals</MenuItem>
                                            </Select>
                                        </FormControl>

                                        <TextField
                                            fullWidth
                                            variant="filled"
                                            type="text"
                                            label="Value"
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.value}
                                            name="value"
                                            error={!!touched.value && !!errors.value}
                                            helperText={touched.value && errors.value}
                                            sx={{ gridColumn: "span 1" }}
                                        />

                                        <FormControl
                                            variant="filled"
                                            error={!!touched.logicalOperator && !!errors.logicalOperator}
                                            sx={{ gridColumn: "span 1" }}
                                            fullWidth >
                                            <InputLabel id="logicalOperator-label">Logical Operator</InputLabel>
                                            <Select
                                                labelId="logicalOperator-label"
                                                id="logicalOperator"
                                                name="logicalOperator"
                                                label="Logical Operator"
                                                value={values.logicalOperator}
                                                onChange={handleChange}
                                            >
                                                <MenuItem value={'AND'}>AND</MenuItem>
                                                <MenuItem value={'OR'}>OR</MenuItem>

                                            </Select>
                                        </FormControl>


                                    </Box>
                                    <Box display="flex" justifyContent="end" mt="20px">
                                        <Button type="submit" color="secondary" variant="contained">
                                            Add Filter
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Applied Filters
                        </Typography>
                        <FilterList filters={filtersLabel} onItemDelete={onFilterDelete} />
                        <Box display="flex" justifyContent="end" mt="10px" mb={"20px"}>
                            <Button type="button" color="secondary" variant="contained" onClick={getCustomers}>
                                Filter Customers
                            </Button>
                        </Box>
                        <Typography variant="h5" color={colors.greenAccent[400]}>
                            Targeted Customers
                        </Typography>
                        <CustomerList customers={customers} />
                        <Box display="flex" justifyContent="end" mt="10px" mb={"20px"}>
                            <Button type="button" color="secondary" variant="contained" onClick={toggleFilterSet}>
                                Next
                            </Button>
                        </Box>
                    </Box>
                )
            }

            <Snackbar
                open={showSnackbar}
                autoHideDuration={5000}
                onClose={handleSnackClose}
                message={snackMessage}
            />

        </Box>
    );
};

const filterSchema = yup.object().shape({
    field: yup.string().required("required"),
    operator: yup.string().required("required"),
    value: yup.string().required("required"),
    logicalOperator: yup.string().required("required"),
});

const filterInitial = {
    field: "",
    operator: "",
    value: "",
    logicalOperator: ""
}

const campaignSchema = yup.object().shape({
    name: yup.string().required("required"),
    message: yup.string().required("required"),
});

const campaignInitial = {
    name: "",
    message: ""
}

export default CampaignCreate;
