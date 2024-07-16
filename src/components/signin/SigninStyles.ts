export const SigninStyles = {
  signupContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  signupRowContainer: {
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    alignItems: "center",
    justifyContent: {xs:'center',md:"space-between"},
    width: { xs: "100%",sm:'90%', md: "90%", lg:'80%', xl:'60%'  },
    padding:{xs:'0px', sm:'10px', md:'10px'},
    borderRadius:"20px",
    boxSizing: "border-box",
    boxShadow:{xs:'none', md:'0px 0px 10px 0px rgba(0,0,0,0.1)'},
  },
  label: {
    fontSize: "15px",
  },
  firstContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: { xs: "100%", md: "50%" },
  },
  firstInnerContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    width: "85%",
    borderRadius: "20px",
    padding: "30px",
    boxShadow: {xs:"0px 0px 10px 0px rgba(0,0,0,0.1)", md:'none'},
  },
  logoText: {
    alignSelf: "flex-start",
    margin: "0px 0px 30px 15px",
    fontWeight: "900",
    display: { xs: "none", md: "block" },
  },
  secondContainer: {
    display: {xs:'none',md:"flex"},
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    width: { md: "50%", xl: "60%" },
    height: { xs: "35%", sm: "100%" },
    boxSizing: "border-box",
  },
  registerImg: { width: "100%", height: "100%" },
  mail: {
    color: "#C7C7C7",
  },
  accountContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  welcomeText: {
    fontSize: "16px",
  },
  loremText: {
    fontSize: "18px",
    color: "#0089EC",
    fontWeight: "800",
  },
  signupText: {
    fontSize: { xs: "25px", sm: "30px", md: "40px" },
    fontWeight: "600",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-start",
    width: "100%",
    marginTop:'20px'
   
  },
  input: {
    width: "100%",
    margin: "5px 0 10px 0",
    borderRadius: "20px",
  },
  input1: {
    width: "100%",
    margin: "10px 0 10px 0",
    borderRadius: "20px",
  },
  button: {
    width: "100%",
    margin: "10px 0 10px 0",
    fontWeight: "bold",
    textTransform: "none",
    background: "#0089EC",
    "&:hover": {
      background: "#0089EC",
    },
  },
  already: {
    color: "#C7C7C7",
    fontSize: "12px",
    marginTop: "15px",
  },
  signin: {
    color: "#0089EC",
    fontSize: "12px",
    marginTop: "5px",
    cursor:'pointer',
    '&:hover': {
      color: "#0089EC",
      textDecoration: "underline"

    }
  },
  forget: {
    fontSize: "12px",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    color: "#0089EC",
    width: "100%",
    margin: "0 0 30px 0",
  },
};
