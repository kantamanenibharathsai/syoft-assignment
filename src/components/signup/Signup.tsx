import React, { useState } from "react";
import MailIcon from "@mui/icons-material/Mail";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  IconButton,
} from "@mui/material";
import signupImg from "../../assets/signup.webp";
import { SignupStyles } from "./SignupStyles";
import { useNavigate } from "react-router-dom";

interface FormData {
  user_firstname: string;
  user_email: string;
  user_phone: string;
  user_password: string;
  user_lastname: string;
  user_city: string;
  user_zipcode: string;
}

export default function Signup() {
  const [formData, setFormData] = useState<FormData>({
    user_firstname: "",
    user_email: "",
    user_phone: "",
    user_password: "",
    user_lastname: "Doe",
    user_city: "Hyderabad",
    user_zipcode: "500072",
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    const newErrors: Partial<FormData> = {};
    if (!formData.user_firstname)
      newErrors.user_firstname = "First name is required";
    if (!formData.user_phone) newErrors.user_phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.user_phone))
      newErrors.user_phone = "Invalid phone number";
    if (!formData.user_email) newErrors.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.user_email))
      newErrors.user_email = "Invalid email format";
    if (!formData.user_password)
      newErrors.user_password = "Password is required";
    else if (formData.user_password.length < 6)
      newErrors.user_password = "Password must be at least 6 characters";

    return newErrors;
  };

  const registerUser = async () => {
    try {
      const response = await fetch(
        "https://syoft.dev/Api/user_registeration/api/user_registeration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const result = await response.json();
      setLoading(false);

      if (response.ok) {
        if (result.status === true) {
          setSuccessMessage("Registration successful!");
          navigate("/signin");
        } else {
          setErrorMessage(result.message || "User already exists.");
        }
      } else {
        setErrorMessage(
          result.message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);
      registerUser();
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSignin = () => {
    navigate("/signin");
  };

  return (
    <Box sx={SignupStyles.signupContainer}>
      <Paper sx={SignupStyles.signupRowContainer}>
        <Box sx={SignupStyles.firstContainer}>
          <Paper sx={SignupStyles.firstInnerContainer}>
            <Typography sx={SignupStyles.welcomeText}>
              Welcome to{" "}
              <Typography component={"span"} sx={SignupStyles.loremText}>
                Syoft
              </Typography>
            </Typography>
            <Typography sx={SignupStyles.signupText}> Sign up</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={SignupStyles.inputContainer}
            >
              <Box sx={SignupStyles.addressContainer}>
                <Box sx={SignupStyles.inputRowContainer}>
                  <Box component="label" sx={SignupStyles.label}>
                    First name
                  </Box>
                  <TextField
                    size="small"
                    name="user_firstname"
                    sx={SignupStyles.input}
                    placeholder="First name"
                    value={formData.user_firstname}
                    onChange={handleChange}
                    error={!!errors.user_firstname}
                    InputProps={{
                      endAdornment: (
                        <AccountCircleIcon sx={SignupStyles.mail} />
                      ),
                    }}
                  />
                </Box>

                <Box sx={SignupStyles.inputRowContainer}>
                  <Box component="label" sx={SignupStyles.label}>
                    Last name
                  </Box>
                  <TextField
                    size="small"
                    name="user_lastname"
                    sx={SignupStyles.input}
                    placeholder="Doe"
                    value={formData.user_lastname}
                    disabled
                    InputProps={{
                      endAdornment: (
                        <AccountCircleIcon sx={SignupStyles.mail} />
                      ),
                    }}
                  />
                </Box>
              </Box>
              {errors.user_firstname && (
                <Typography sx={SignupStyles.errorText}>
                  {errors.user_firstname}
                </Typography>
              )}
              <Box component="label" sx={SignupStyles.label}>
                Phone number
              </Box>
              <TextField
                size="small"
                name="user_phone"
                type="number"
                sx={SignupStyles.input}
                placeholder="Phone number"
                value={formData.user_phone}
                onChange={handleChange}
                error={!!errors.user_phone}
                helperText={errors.user_phone}
                InputProps={{
                  endAdornment: <PhoneIcon sx={SignupStyles.mail} />,
                }}
              />
              <Box component="label" sx={SignupStyles.label}>
                Email
              </Box>
              <TextField
                size="small"
                name="user_email"
                sx={SignupStyles.input}
                placeholder="Email address"
                value={formData.user_email}
                onChange={handleChange}
                error={!!errors.user_email}
                helperText={errors.user_email}
                InputProps={{
                  endAdornment: <MailIcon sx={SignupStyles.mail} />,
                }}
              />
              <Box component="label" sx={SignupStyles.label}>
                Password
              </Box>
              <TextField
                size="small"
                name="user_password"
                type={showPassword ? "text" : "password"}
                sx={SignupStyles.input}
                placeholder="Password"
                value={formData.user_password}
                onChange={handleChange}
                error={!!errors.user_password}
                helperText={errors.user_password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon sx={SignupStyles.mail} />
                        ) : (
                          <VisibilityIcon sx={SignupStyles.mail} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={SignupStyles.addressContainer}>
                <Box sx={SignupStyles.inputRowContainer}>
                  <Box component="label" sx={SignupStyles.label}>
                    City
                  </Box>
                  <TextField
                    size="small"
                    name="user_city"
                    sx={SignupStyles.input}
                    placeholder="Hyderabad"
                    value={formData.user_city}
                    disabled
                    InputProps={{
                      endAdornment: <LocationCityIcon sx={SignupStyles.mail} />,
                    }}
                  />
                </Box>
                <Box sx={SignupStyles.inputRowContainer}>
                  <Box component="label" sx={SignupStyles.label}>
                    Pincode
                  </Box>
                  <TextField
                    size="small"
                    name="user_zipcode"
                    sx={SignupStyles.input}
                    placeholder="500072"
                    value={formData.user_zipcode}
                    disabled
                    InputProps={{
                      endAdornment: <LocationOnIcon sx={SignupStyles.mail} />,
                    }}
                  />
                </Box>
              </Box>

              {loading && (
                <CircularProgress size={24} sx={{ alignSelf: "center" }} />
              )}
              {successMessage && (
                <Typography color="success.main">{successMessage}</Typography>
              )}
              {errorMessage && (
                <Typography color="error.main">{errorMessage}</Typography>
              )}

              <Button
                variant="contained"
                sx={SignupStyles.button}
                type="submit"
                disabled={loading}
              >
                Register
              </Button>
              <Box sx={SignupStyles.accountContainer}>
                <Typography sx={SignupStyles.already}>
                  Already have an Account?
                </Typography>
                <Typography sx={SignupStyles.signin} onClick={handleSignin}>
                  Sign in
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={SignupStyles.secondContainer}>
          <Box
            component={"img"}
            src={signupImg}
            sx={SignupStyles.registerImg}
          />
        </Box>
      </Paper>
    </Box>
  );
}
