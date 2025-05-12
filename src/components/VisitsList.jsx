import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const VisitList = ({ visits }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "customer",
            headerName: "Customer",
            flex: 1,
            cellClassName: "name-column--cell",
            sortable: false,
        },
        {
            field: "source",
            headerName: "Source",
        },
        {
            field: "date",
            headerName: "Date",
            flex: 1,
        }
    ];

    return (
        <Box
            m="40px 0 0 0"
            height="50vh"
            sx={{
                "& .MuiDataGrid-root": {
                    bvisit: "none",
                },
                "& .MuiDataGrid-cell": {
                    bvisitBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    bvisitBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    bvisitTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
            }}
        >
            <DataGrid checkboxSelection rows={visits} columns={columns} />
        </Box>
    );
};

export default VisitList;
