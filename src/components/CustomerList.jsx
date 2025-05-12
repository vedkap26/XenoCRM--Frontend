import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const CustomerList = ({ customers }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
            sortable: false,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
            sortable: false
        },
        {
            field: "age",
            headerName: "Age",
            flex: 1,
            sortable: false
        },
        {
            field: "totalSpent",
            headerName: "Total Spent",
            flex: 1,
        },
        {
            field: "totalVisits",
            headerName: "Total Visits",
            flex: 1,
        },
        {
            field: "lastVisit",
            headerName: "Last Visits",
            flex: 1,
        },
    ];

    return (
        <Box
            m="40px 0 0 0"
            height="50vh"
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
            }}
        >
            <DataGrid checkboxSelection rows={customers} columns={columns} />
        </Box>
    );
};

export default CustomerList;
