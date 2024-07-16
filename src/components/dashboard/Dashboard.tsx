import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AppsIcon from "@mui/icons-material/Apps";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import GridViewIcon from "@mui/icons-material/GridView";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import PieChartIcon from "@mui/icons-material/PieChart";
import { Box, Button, Card, Divider, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DashHeader from "./DashHeader";
import { DashboardStyles } from "./DashboardStyles";
import DashboardTable from "./dashboardTable";
import syoftLogo from "../../assets/syoftlogo.png";

export default function Dashboard() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <Box sx={DashboardStyles.dashboardMainContainer}>
      <Box sx={DashboardStyles.firstContainer}>
        <Box component="img" src={syoftLogo} sx={DashboardStyles.syoftLogo} />
        <Divider sx={DashboardStyles.divider} />
        <Box sx={DashboardStyles.firstInnerContainer}>
          <Box sx={DashboardStyles.rowContainer}>
            <GridViewIcon sx={DashboardStyles.icon} />
            <Typography sx={DashboardStyles.dashboard}>Dashboard</Typography>
          </Box>
          <Box sx={DashboardStyles.columnContainer}>
            <Box sx={DashboardStyles.loremContainer}>
              <AppsIcon sx={DashboardStyles.appIcon} />
              <Typography sx={DashboardStyles.lorem1}>Who Are We?</Typography>
              <Typography sx={DashboardStyles.lorem}>
                We are believers of change! A change driven by technology and
                innovation. We help businesses and individuals in adapting as
                well as adopting digital transformation. Our aim is to change
                people’s lives and improve businesses with our progressive and
                innovative technology solutions.
              </Typography>
            </Box>

            <Button
              variant="contained"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
              sx={DashboardStyles.button}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>
      <Box sx={DashboardStyles.secondContainer}>
        <DashHeader />
        <Box sx={DashboardStyles.secondInnerContainer}>
          <Box sx={DashboardStyles.secondRowContainer}>
            <Card sx={DashboardStyles.cardContainer}>
              <Box sx={DashboardStyles.cardRowContainer}>
                <Box sx={DashboardStyles.iconContainer}>
                  <AccountBalanceWalletIcon sx={DashboardStyles.icons} />
                </Box>
                <Box sx={DashboardStyles.secondColumnContainer}>
                  <Typography variant="h4" sx={DashboardStyles.columnHeading}>
                    $357k
                  </Typography>
                  <Typography>Total</Typography>
                  <Typography>Revenue</Typography>
                </Box>
              </Box>
            </Card>
            <Card sx={DashboardStyles.cardContainer}>
              <Box sx={DashboardStyles.cardRowContainer}>
                <Box sx={DashboardStyles.iconContainer}>
                  <PieChartIcon sx={DashboardStyles.icons} />
                </Box>
                <Box sx={DashboardStyles.secondColumnContainer}>
                  <Typography variant="h4" sx={DashboardStyles.columnHeading}>
                    $175
                  </Typography>
                  <Typography>Last Month</Typography>
                  <Typography>Revenue</Typography>
                </Box>
              </Box>
            </Card>
            <Card sx={DashboardStyles.cardContainer}>
              <Box sx={DashboardStyles.cardRowContainer}>
                <Box sx={DashboardStyles.iconContainer}>
                  <PeopleAltIcon sx={DashboardStyles.icons} />
                </Box>
                <Box sx={DashboardStyles.secondColumnContainer}>
                  <Typography variant="h4" sx={DashboardStyles.columnHeading}>
                    102
                  </Typography>
                  <Typography>Total</Typography>
                  <Typography>customers</Typography>
                </Box>
              </Box>
            </Card>
            <Card sx={DashboardStyles.cardContainer}>
              <Box sx={DashboardStyles.cardRowContainer}>
                <Box sx={DashboardStyles.iconContainer}>
                  <PersonAddAlt1Icon sx={DashboardStyles.icons} />
                </Box>
                <Box sx={DashboardStyles.secondColumnContainer}>
                  <Typography variant="h4" sx={DashboardStyles.columnHeading}>
                    16
                  </Typography>
                  <Typography>Last Month</Typography>
                  <Typography>customers</Typography>
                </Box>
              </Box>
            </Card>
          </Box>
          <Paper sx={DashboardStyles.tableContainer}>
            <DashboardTable />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
