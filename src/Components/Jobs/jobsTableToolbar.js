import { alpha } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Toolbar from "@mui/material/Toolbar";

export const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
        backgroundColor: "#f2fffb",
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{
            flex: "1 1 100%",
            fontFamily: "Rubik, sans-serif",
            fontWeight: "700",
            fontSize: "26px",
          }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Jobs
        </Typography>
      )}
    </Toolbar>
  );
};
