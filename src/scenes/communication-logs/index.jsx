import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import CommunicationApi from "../../api/Communication";

const CommunicationLogs = () => {
    const [communicationLogs, setCommunicationLogs] = useState([])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const columns = [
        { field: "customer", headerName: "Customer" },
        { field: "campaign", headerName: "Campaign" },
        { field: "status", headerName: "Status" },
        { field: "email", headerName: "Email" },
        { field: "message", headerName: "Message", flex: 1 }
    ];


    useEffect(() => {
        getCommunicationLogs()
    }, [])

    const getCommunicationLogs = async () => {
        const logs = await CommunicationApi.getCommunications()

        setCommunicationLogs(logs.data.map((value) => (
            {
                id: value._id,
                customer: value.customerId.name,
                campaign: value.campaignId.name,
                ...value
            })))
    }



    return (
        <Box m="20px">
            <Header
                title="CAMPAIGNS"
                subtitle="Previously executed campaigns"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={communicationLogs}
                    columns={columns}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>


        </Box>
    );
};

export default CommunicationLogs;
