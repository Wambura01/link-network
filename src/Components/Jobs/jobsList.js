import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { collection, getDocs } from "firebase/firestore";

import { Box, Button, CircularProgress } from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";

import { db } from "../../Firebase/firebaseConfig";
import { tableStyles } from "../../Utils/tableStyles";
import { EnhancedTableToolbar } from "./jobsTableToolbar";
import JobsMoreMenu from "./jobsMoreActions";

function CircularIndeterminate() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <CircularProgress sx={{ color: "black" }} />
    </Box>
  );
}

const muiCache = createCache({
  key: "mui-datatables",
  prepend: "true",
});

// table stylings
const getMuiTheme = () => createTheme(tableStyles);

export default function JobsList() {
  const [rows, setRows] = useState([]); // table rows
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);

  const filterList = {};

  // handle filter
  const handleFilterSubmit = (applyFilters) => {
    const filters = applyFilters();
    filters.map((item) => {
      const key = columns[`${filters.indexOf(item)}`].name;
      let newFilter;

      Object.assign(filterList, newFilter);
    });

    setIsFiltered(true);
  };

  const columns = [
    {
      name: "company_name",
      label: "Company",
      options: {
        filter: true,
      },
    },
    {
      name: "role",
      label: "Role",
      options: {
        filter: true,
      },
    },
    {
      name: "type",
      label: "Type of Employment",
      options: {
        filter: true,
      },
    },
    {
      name: "count",
      label: "Number of applicants",
      options: {
        filter: false,
      },
    },
    {
      name: "isClosed",
      label: "Job Closed?",
      options: {
        filter: true,
        customBodyRenderLite: (dataIndex) =>
          rows[dataIndex].isClosed === false ||
          rows[dataIndex].isClosed === undefined ? (
            <ClearIcon
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "red",
              }}
            />
          ) : (
            <CheckIcon
              sx={{
                fontSize: "1.2rem",
                fontWeight: "700",
                color: "#009966",
              }}
            />
          ),
      },
    },
    {
      name: "",
      label: "",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          if (rows[dataIndex]) {
            return <JobsMoreMenu jobId={rows[dataIndex]["docId"]} />;
          }
        },
      },
    },
  ];

  const handleChangePage = (tableState) => {
    const { page } = tableState;
    setPage(page);
  };

  const handleChangeRowsPerPage = (newRowsPerPage) => {
    setRowsPerPage(parseInt(newRowsPerPage, 10));
    setPage(0);
  };

  const options = {
    responsive: "standard",
    rowsPerPage,
    rowsPerPageOptions: [10, 25, 50, 100],
    download: true,
    print: false,
    confirmFilters: true,
    onTableChange: (action, tableState) => {
      switch (action) {
        case "changePage":
          handleChangePage(tableState);
          break;
        case "changeRowsPerPage":
          handleChangeRowsPerPage(tableState.rowsPerPage);
          break;
        default:
          console.log("action not handled.");
      }
    },
    customFilterDialogFooter: (currentFilterList, applyNewFilters) => (
      <Box style={{ marginTop: "40px" }}>
        <Button
          variant="contained"
          sx={{
            fontWeight: "500",
            fontSize: ".88rem",
            backgroundColor: "black",

            "&:hover": {
              backgroundColor: "rgba(0,0,0,.8)",
            },
          }}
          onClick={() => handleFilterSubmit(applyNewFilters)}
        >
          Apply Filters
        </Button>
      </Box>
    ),
  };

  useEffect(() => {
    try {
      // fetch jobs on render
      const getJobs = async () => {
        try {
          const jobsSnapshot = await getDocs(collection(db, "jobs"));
          const fetchedJobs = [];
          jobsSnapshot.forEach((job) => {
            fetchedJobs.push({ docId: job.id, ...job.data() });
          });
          setRows(fetchedJobs);
          setIsLoading(false);
        } catch (err) {
          console.log("Error while fetching jobs: " + err);
        }
      };

      getJobs();
    } catch (err) {
      console.log("Error while fetching jobs: " + err);
    }
  }, []);

  console.log("jobs: ", rows);

  return (
    <div style={{ backgroundColor: "#f2fffb" }}>
      <EnhancedTableToolbar />
      <CacheProvider value={muiCache}>
        <ThemeProvider theme={getMuiTheme()}>
          {isLoading ? (
            <CircularIndeterminate />
          ) : (
            <MUIDataTable data={rows} columns={columns} options={options} />
          )}
        </ThemeProvider>
      </CacheProvider>
    </div>
  );
}
