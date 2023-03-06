export const tableStyles = {
  components: {
    MUIDataTableHeadCell: {
      styleOverrides: {
        fixedHeader: {
          color: "black",
          backgroundColor: "#f2f2f2",
        },
        data: {
          fontFamily: "Rubik, sans-serif",
          textTransform: "uppercase",
          fontWeight: "600",
          fontSize: ".9rem",
        },
        toolButton: {
          textAlign: "left",
          fontFamily: "Rubik, sans-serif",
          fontWeight: "bold",
          fontSize: "1rem",
        },
      },
    },
    MUIDataTableSelectCell: {
      styleOverrides: {
        fixedHeader: {
          color: "black",
          backgroundColor: "#f2f2f2",
        },
      },
    },
    MUIDataTableBodyCell: {
      styleOverrides: {
        root: {
          fontFamily: "Rubik, sans-serif",
          fontWeight: "400",
          fontSize: ".88rem",
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "dimgray",

          "&:hover": {
            color: "black",
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        text: {
          color: "black",
          fontFamily: "Rubik, sans-serif",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        body2: {
          fontFamily: "Rubik, sans-serif",
        },
      },
    },
  },
};
