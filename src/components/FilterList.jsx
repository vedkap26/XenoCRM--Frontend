import { Box, Button, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../theme";

const FilterList = ({ filters, onItemDelete }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const columns = [
        {
            field: "field",
            headerName: "Field",
            flex: 1,
            cellClassName: "name-column--cell",
            sortable: false,
        },
        {
            field: "operator",
            headerName: "Operator",
            flex: 1,
            sortable: false
        },
        {
            field: "value",
            headerName: "Value",
            flex: 1,
            sortable: false
        },
        {
            field: "logicalOperator",
            headerName: "Logical Operator",
            flex: 1,
            sortable: false
        },
        {
            field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
                return (
                    <Button
                        onClick={(e) => onItemDelete(params.row)}
                        variant="contained"
                    >
                        Delete
                    </Button>
                );
            }
        }
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
            <DataGrid checkboxSelection rows={filters} columns={columns} />
        </Box>
    );
};

export default FilterList;
