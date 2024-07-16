import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { Avatar, Box, Typography, Popover, Button } from "@mui/material";
import { DashboardStyles } from "./DashboardStyles";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import syoftLogo from "../../assets/syoftlogo.png";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import profileFallbackImg from "../../assets/profile.jpeg";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

interface AdminDetails {
  user_firstname: string;
  user_email: string;
  user_phone: string;
  user_city: string;
  user_zipcode: string;
}

export default function DashHeader() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const parsedData = JSON.parse(userData);
      setAdminDetails(parsedData[0]);
    }
  }, []);

  const handleChangeImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files?.[0];
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const imageData = fileReader.result as string;
        setProfileImage(imageData);
      };
      if (file) {
        fileReader.readAsDataURL(file);
      }
    }
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <Box sx={DashboardStyles.headerContainer}>
      <Box
        component="img"
        src={syoftLogo}
        sx={DashboardStyles.syoftLogoMobile}
      />
      <Typography sx={DashboardStyles.headerText}>Overview</Typography>
      <Box sx={DashboardStyles.headerRowContainer}>
        <Box sx={DashboardStyles.headerInput}>
          <Box
            component={"input"}
            sx={DashboardStyles.inputField}
            placeholder="search"
          />
          <SearchIcon />
        </Box>
        <NotificationsIcon sx={DashboardStyles.notification} />
        <Box sx={DashboardStyles.avatarContainer} onClick={handleClick}>
          <Avatar
            alt="Admin"
            sx={DashboardStyles.avatar}
            src={profileImage ?? profileFallbackImg}
          />
          <Typography sx={DashboardStyles.admin}>
            {adminDetails ? adminDetails.user_firstname : "Admin"}
          </Typography>
          <ArrowDropDownIcon sx={DashboardStyles.arrow} />
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ padding: 3 }}>
          <Box sx={DashboardStyles.profileContainer}>
            <Box sx={DashboardStyles.profileImageContainer}>
              <Box
                component={"img"}
                src={profileImage ?? profileFallbackImg}
                sx={DashboardStyles.profileImage}
                onError={(
                  event: React.SyntheticEvent<HTMLImageElement, Event>
                ) =>
                  ((event.target as HTMLImageElement).src = profileFallbackImg)
                }
              />
              <Box
                component={"label"}
                htmlFor="image"
                sx={DashboardStyles.profileLabel}
              >
                <EditIcon />
              </Box>
              <Box
                component={"input"}
                type="file"
                id="image"
                sx={DashboardStyles.inputImage}
                onChange={handleChangeImage}
                data-testid="profileInput"
              />
            </Box>
          </Box>

          <Typography variant="h6" sx={DashboardStyles.title}>
            Name:{" "}
            <Typography component="span" sx={DashboardStyles.title}>
              {adminDetails ? adminDetails.user_firstname : "Admin"}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={DashboardStyles.title}>
            Email:{" "}
            <Typography component="span" sx={DashboardStyles.title}>
              {adminDetails ? adminDetails.user_email : "admin@example.com"}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={DashboardStyles.title}>
            Phone Number:{" "}
            <Typography component="span" sx={DashboardStyles.title}>
              {adminDetails ? adminDetails.user_phone : "9505759576"}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={DashboardStyles.title}>
            City:{" "}
            <Typography component="span" sx={DashboardStyles.title}>
              {adminDetails ? adminDetails.user_city : "Hyderabad"}
            </Typography>
          </Typography>
          <Typography variant="body2" sx={DashboardStyles.title}>
            Pincode:{" "}
            <Typography component="span" sx={DashboardStyles.title}>
              {adminDetails ? adminDetails.user_zipcode : "500072"}
            </Typography>
          </Typography>

          <Button
            onClick={handleLogout}
            variant="contained"
            startIcon={<ExitToAppIcon />}
            sx={DashboardStyles.logoutButton}
          >
            Logout
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
