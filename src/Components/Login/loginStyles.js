import styled from "styled-components";

// login page
export const LoginPage = styled.div({
  display: "flex",
  width: "100%",

  "@media(max-width: 768px)": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
});

// LEFT login div
export const LeftDiv = styled.div({
  width: "50%",
  height: "auto",
  background: "black",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  "@media(max-width: 768px)": {
    display: "none",
  },
});

// logo
export const LogoStyles = styled.div({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

// RIGHT login div
export const RightDiv = styled.div({
  width: "50%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "white",

  "@media(max-width: 768px)": {
    width: "100%",
  },
});

// Right content container
export const RightContent = styled.div({
  margin: "9.4rem",
  width: "60%",

  "@media(max-width: 426px)": {
    width: "90%",
    margin: "9rem 5rem",
  },
});

// heading
export const Heading = styled.p({
  fontSize: "1.3rem",
  fontWeight: "bold",
  maxWidth: "60%",
  textAlign: "left",

  "@media(max-width: 768px)": {
    maxWidth: "90%",
    color: "white",
  },
});

// input containers
export const InputContainer = styled.div({
  display: "flex",
  flexDirection: "column",
});

// input labels
export const InputLabels = styled.p({
  fontWeight: "bold",
  fontSize: ".8rem",
  mb: ".9rem",

  "@media(max-width: 768px)": {
    color: "white",
  },
});

// forgot password
export const ForgotPassword = styled.p({
  width: "100%",
  textAlign: "right",
  fontSize: ".8rem",
  color: "var(--orange)",
  marginBottom: "2rem",
  cursor: "pointer",

  "@media(max-width: 768px)": {
    color: "white",
  },
});

export const SignInOptions = styled.div({
  width: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
});
