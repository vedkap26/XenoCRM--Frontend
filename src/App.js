import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Campaigns from "./scenes/campaigns";
import CampaignCreate from "./scenes/campaign-create";
import CommunicationLogs from "./scenes/communication-logs";
import Customers from "./scenes/customers";
import CustomerCreate from "./scenes/customer-create";
import Orders from "./scenes/orders";
import OrdersCreate from "./scenes/orders-create";
import Visits from "./scenes/visits";
import VisitsCreate from "./scenes/visits-create";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />

              <Route
                path="/campaigns"
                element={
                  <ProtectedRoute>
                    <Campaigns />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/campaigns/create"
                element={<ProtectedRoute>
                  <CampaignCreate />
                </ProtectedRoute>
                }
              />
              <Route path="/campaigns/communication-logs" element={<ProtectedRoute>
                <CommunicationLogs />
              </ProtectedRoute>
              }
              />

              <Route path="/customers" element={<ProtectedRoute><Customers /></ProtectedRoute>} />
              <Route path="/customers/create" element={<ProtectedRoute>
                <CustomerCreate />
              </ProtectedRoute>} />

              <Route path="/orders" element={<ProtectedRoute>
                <Orders />
              </ProtectedRoute>} />
              <Route path="/orders/create" element={<ProtectedRoute>
                <OrdersCreate />
              </ProtectedRoute>} />

              <Route path="/visits" element={<ProtectedRoute>
                <Visits />
              </ProtectedRoute>} />
              <Route path="/visits/create" element={<ProtectedRoute>
                <VisitsCreate />
              </ProtectedRoute>} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
