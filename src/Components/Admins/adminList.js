import React, { useEffect, useState } from "react";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { collection, getDocs } from "firebase/firestore";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

import { Box, Button, CircularProgress, TextField, Stack } from "@mui/material";

import { db } from "../../Firebase/firebaseConfig";
import { tableStyles } from "../../Utils/tableStyles";
import { EnhancedTableToolbar } from "./adminsTableToolbar";

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

export default function AdminsList() {
  const [rows, setRows] = useState([]); // table rows
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltered, setIsFiltered] = useState(false);
  const [createdTo, setCreatedTo] = useState(null);
  const [createdFrom, setCreatedFrom] = useState(null);

  const filterList = {};

  // handle filter
  const handleFilterSubmit = (applyFilters) => {
    const filters = applyFilters();
    console.log("Filters: ", filters);
    filters.map((item) => {
      const key = columns[`${filters?.indexOf(item)}`].name;
      let newFilter;
      if (key === "createdAt") {
        newFilter = {
          createdFrom: moment(item[0]).format("DD-MM-YYYY"),
          createdTo: moment(item[1]).format("DD-MM-YYYY"),
        };
      } else {
        newFilter = { [key]: moment(item[0]).format("DD-MM-YYYY") };
      }
      Object.assign(filterList, newFilter);
    });
    console.log("FILTER LIST: ", filterList);
    setIsFiltered(true);
  };

  const columns = [
    {
      name: "displayName",
      label: "Name",
      options: {
        filter: false,
      },
    },
    {
      name: "email",
      label: "Email",
      options: {
        filter: false,
      },
    },
    {
      name: "createdAt",
      label: "Date Created",
      options: {
        filter: true,
        filterType: "custom",
        customFilterListOptions: {
          render: (v) => {
            if (v[0] && v[1]) {
              console.log(
                `From: ${moment(v[0]).format("MM-DD-YYYY")},  To: ${moment(
                  v[1]
                ).format("MM-DD-YYYY")}`
              );
              return [
                `Created From: ${moment(v[0]).format("MM-DD-YYYY")}`,
                ` Created To: ${moment(v[1]).format("MM-DD-YYYY")}`,
              ];
            }
            if (v[0]) {
              return ` Created From: ${moment(v[0]).format("MM-DD-YYYY")}`;
            }
            if (v[1]) {
              return ` Created To: ${moment(v[1]).format("MM-DD-YYYY")}`;
            }
            return [];
          },
          update: (filterList, filterPos, index) => {
            console.log(
              "customFilterListOnDelete: ",
              filterList,
              filterPos,
              index
            );

            if (filterPos === 0) {
              filterList[index].splice(filterPos, 1, "");
            } else if (filterPos === 1) {
              filterList[index].splice(filterPos, 1);
            } else if (filterPos === -1) {
              filterList[index] = [];
            }

            return filterList;
          },
        },
        filterOptions: {
          names: [],
          logic(createdAt, filters) {
            const formattedDate =
              typeof createdAt === "string"
                ? moment(createdAt, "DD-MM-YYYY").format("MM-DD-YYYY")
                : moment(createdAt?.toDate()).format("MM-DD-YYYY");

            // console.log("Formatted Date: ", formattedDate);

            if (filters[0] && filters[1]) {
              let formattedTo = moment(filters[1]).format("MM-DD-YYYY");
              let formattedFrom = moment(filters[0]).format("MM-DD-YYYY");

              return (
                moment(formattedDate, "MM-DD-YYYY").isBetween(
                  formattedFrom,
                  formattedTo
                ) === false
              );
            }
            if (filters[1]) {
              let formattedFrom = moment(filters[1]).format("MM-DD-YYYY");
              return moment(formattedDate).isSameOrAfter(formattedFrom);
            }
            if (filters[0]) {
              let formattedTo = moment(filters[0]).format("MM-DD-YYYY");
              return moment(formattedDate).isSameOrBefore(formattedTo);
            }
            return false;
          },
          display: (filterList, onChange, index, column) => (
            <Stack direction="row" spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Requested From:"
                  value={createdFrom || filterList[index][0]}
                  onChange={(newValue) => {
                    setCreatedFrom(newValue);
                    filterList[index][0] = newValue;
                    onChange(filterList[index], index, column);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Requested To:"
                  value={createdTo || filterList[index][1]}
                  onChange={(newValue) => {
                    setCreatedTo(newValue);
                    filterList[index][1] = newValue;
                    onChange(filterList[index], index, column);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          ),
        },
        customBodyRenderLite: (dataIndex) => {
          return typeof rows[dataIndex].createdAt === "string"
            ? moment(rows[dataIndex].createdAt, "DD-MM-YYYY").format(
                "MMMM Do YYYY, h:mm:ss a"
              )
            : moment(rows[dataIndex].createdAt?.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              );
        },
      },
    },
    {
      name: "lastLoginAt",
      label: "Last Login At",
      options: {
        filter: false,
        customBodyRenderLite: (dataIndex) => {
          return typeof rows[dataIndex].lastLoginAt === "string"
            ? moment(rows[dataIndex].lastLoginAt, "DD-MM-YYYY").format(
                "MMMM Do YYYY, h:mm:ss a"
              )
            : moment(rows[dataIndex].lastLoginAt?.toDate()).format(
                "MMMM Do YYYY, h:mm:ss a"
              );
        },
      },
    },
    // {
    //   name: "",
    //   label: "",
    //   options: {
    //     filter: false,
    //     customBodyRenderLite: (dataIndex) => {
    //       if (rows[dataIndex]) {
    //         return <JobsMoreMenu jobId={rows[dataIndex]["docId"]} />;
    //       }
    //     },
    //   },
    // },
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
      const getAdmins = async () => {
        try {
          const adminsSnapshot = await getDocs(collection(db, "admin"));
          const fetchedAdmins = [];
          adminsSnapshot.forEach((admin) => {
            fetchedAdmins.push({ docId: admin.id, ...admin.data() });
          });
          setRows(fetchedAdmins);
          setIsLoading(false);
        } catch (err) {
          console.log("Error while fetching admins: " + err);
        }
      };

      getAdmins();
    } catch (err) {
      console.log("Error while fetching admins: " + err);
    }
  }, []);

  console.log("admins: ", rows);

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
