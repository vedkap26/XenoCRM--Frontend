import { Box, Button, } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header";

import CampaignApi from "../../api/Campaign";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([])
  const navigate = useNavigate()

  const handleCreateNew = () => {
    navigate('/campaigns/create')
  };


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "name", headerName: "Name" },
    {
      field: "message",
      headerName: "Message",
      flex: 1,
    },
    {
      field: "audienceSize",
      headerName: "Audience Size",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "sent",
      headerName: "Sent",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "failed",
      headerName: "Failed",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "createdAt",
      headerName: "Created At",
      headerAlign: "left",
      align: "left",
      flex: 1
    },
    {
      field: 'actions', headerName: 'Actions', width: 100, renderCell: (params) => {
        return (
          <Button
            onClick={(e) => onExecute(params.row)}
            variant="contained"
            disabled={params.row.executed}
          >
            {params.row.executed ? "Executed" : "Execute"}
          </Button>
        );
      }
    }
  ];

  const onExecute = async (row) => {
    await executeCampaign(row)
    await getCampaigns()
  }

  useEffect(() => {
    getCampaigns()
  }, [])

  const getCampaigns = async () => {
    const campaigns = await CampaignApi.getCampaigns()
    setCampaigns(campaigns.data.map((value) => ({ id: value._id, ...value })))
  }

  const executeCampaign = async (campaign) => {
    await CampaignApi.executeCampaign({
      campaignId: campaign._id
    })
  }

  return (
    <Box m="20px">
      <Header
        title="CAMPAIGNS"
        subtitle="Previously executed campaigns"
      />
      <Box display="flex" justifyContent="end" mt="20px">
        <Button type="submit" color="secondary" variant="contained" onClick={handleCreateNew}>
          Create New Campaign
        </Button>
      </Box>
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
          rows={campaigns}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>


    </Box>
  );
};

export default Campaigns;
