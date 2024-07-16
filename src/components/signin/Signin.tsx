import React, { useState } from "react";
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
import signinImg from "../../assets/signin.webp";
import { SigninStyles } from "./SigninStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MailIcon from "@mui/icons-material/Mail";
import { useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

interface FormData {
  user_email: string;
  user_password: string;
}

interface Errors {
  user_email: string;
  user_password: string;
}

export default function Signin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    user_email: "",
    user_password: "",
  });

  const [errors, setErrors] = useState<Errors>({
    user_email: "",
    user_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    navigate("/");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); 
  };

  const validate = () => {
    const newErrors: Partial<Errors> = {};
    if (!formData.user_email) newErrors.user_email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.user_email))
      newErrors.user_email = "Invalid email format";
    if (!formData.user_password)
      newErrors.user_password = "Password is required";
    return newErrors;
  };

  const loginUser = async() => {
    try {
      const response = await fetch(
        "https://syoft.dev/Api/userlogin/api/userlogin",
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
          localStorage.setItem("user", JSON.stringify(result.user_data));
          navigate("/dashboard");
        } else {
          setErrorMessage(
            result.message || "Invalid Credentials. Please try again."
          );
        }
      } else {
        setErrorMessage(
          result.message || "Sign in failed. Please try again."
        );
      }
    } catch (error) {
      setLoading(false);
      setErrorMessage("An error occurred. Please try again.");
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Errors);
    } else {
      setLoading(true);
      setSuccessMessage(null);
      setErrorMessage(null);
      loginUser();
    
    }
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  return (
    <Box sx={SigninStyles.signupContainer}>
      <Paper sx={SigninStyles.signupRowContainer}>
        <Box sx={SigninStyles.firstContainer}>
          <Paper sx={SigninStyles.firstInnerContainer} elevation={2}>
            <Typography sx={SigninStyles.welcomeText}>
              Welcome to{" "}
              <Typography component={"span"} sx={SigninStyles.loremText}>
                Syoft
              </Typography>
            </Typography>
            <Typography sx={SigninStyles.signupText}> Sign in</Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={SigninStyles.inputContainer}
            >
              <Box component={"label"} sx={SigninStyles.label}>
                Enter your email address
              </Box>
              <TextField
                size="small"
                name="user_email"
                sx={SigninStyles.input}
                placeholder="email address"
                value={formData.user_email}
                onChange={handleChange}
                error={!!errors.user_email}
                helperText={errors.user_email}
                InputProps={{
                  endAdornment: <MailIcon sx={SigninStyles.mail} />,
                }}
              />
              <Box component={"label"} sx={SigninStyles.label}>
                Enter your password
              </Box>
              <TextField
                size="small"
                name="user_password"
                type={showPassword ? "text" : "password"}
                sx={SigninStyles.input1}
                placeholder="password"
                value={formData.user_password}
                onChange={handleChange}
                error={!!errors.user_password}
                helperText={errors.user_password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? (
                          <VisibilityOffIcon sx={SigninStyles.mail} />
                        ) : (
                          <VisibilityIcon sx={SigninStyles.mail} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <Box sx={SigninStyles.forget}>Forget Password</Box>

              <Button
                variant="contained"
                sx={SigninStyles.button}
                type="submit"
                disabled={loading}
              >
                Sign in
              </Button>
              {loading && (
                <CircularProgress size={24} sx={{ alignSelf: "center" }} />
              )}
              {successMessage && (
                <Typography color="success.main">{successMessage}</Typography>
              )}
              {errorMessage && (
                <Typography color="error.main">{errorMessage}</Typography>
              )}
              <Box sx={SigninStyles.accountContainer}>
                <Typography sx={SigninStyles.already}>No Account</Typography>
                <Typography sx={SigninStyles.signin} onClick={handleSignup}>
                  Signup
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>
        <Box sx={SigninStyles.secondContainer}>
          <Box
            component={"img"}
            src={signinImg}
            sx={SigninStyles.registerImg}
          />
        </Box>
      </Paper>
    </Box>
  );
}
