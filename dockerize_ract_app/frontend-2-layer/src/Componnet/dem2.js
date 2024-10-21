import React, { useState } from "react";
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box, TableContainer, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import LogoutIcon from "../Assets/logoutIcon.svg";
import axios from "axios";
import "./Demofile.css";

const StyledTableCell = styled(TableCell)({
  head: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const Demofile = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState({});
  const [isEditable, setIsEditable] = useState(false);
  console.log("output ==>", output);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = () => {
    // Create the payload for the API request
    const payload = { query };

    // Make an Axios POST request
    axios
      .post("http://65.1.198.137:9000/sql_query", payload) // Replace with your API endpoint
      .then((response) => {
        // Handle the API response
        console.log(response.data, "output");
        setOutput(response.data); // Assuming the API response contains the output
      })
      .catch((error) => {
        console.error("API request failed:", error);
      });
  };

  const handleClear = () => {
    setQuery("");
    // setOutput({});
    setOutput(""); // Clear the output
  };

  const handleEditToggle = () => {
    setIsEditable(!isEditable);
  };

  return (
    <Grid container sm={12} md={12} lg={12} style={{ marginTop: "10px" }}>
      <div className="header">
        <div>SQL Generator</div>
        <div>
          {/* <button
            variant="contained"
            className="btn"
            onClick={() => {
              navigate("/");
            }}
          >
            Logout
          </button> */}
          <Tooltip
            title="Logout"
            componentsProps={{
              tooltip: {
                sx: {
                  padding: 1,
                  paddingLeft: 2,
                  paddingRight: 12,
                },
              },
            }}
          >
            <img
              src={LogoutIcon}
              alt="Logout Icon"
              onClick={() => {
                navigate("/");
              }}
              style={{ cursor: "pointer" }}
            />
          </Tooltip>
        </div>
      </div>
      <Grid item container sm={12} md={12} lg={12} spacing={2} style={{ marginLeft: "5px", marginRight: "5px" }}>
        <Grid item sm={4} md={4} lg={4}>
          <TextField label="NLP Query" variant="outlined" fullWidth value={query} onChange={handleQueryChange} />
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <div style={{ height: "300px", width: "100%", border: "1px solid #dddddd", borderRadius: "5px" }}>
            <span>{output.query ? output.query : ""}</span>
          </div>
        </Grid>
        <Grid item sm={4} md={4} lg={4}>
          <div style={{ height: "300px", width: "100%", border: "1px solid #dddddd", borderRadius: "5px" }}>
            <span>{output.query ? output.query : ""}</span>
          </div>
        </Grid>
      </Grid>
      <Grid sm={12} md={12} lg={12}>
        <div
          style={{
            marginTop: "20px",
            // position: "relative",
            paddingLeft: "5px",
            paddingRight: "5px",
            top: "50px",
          }}
        >
          {/* <h2
          style={{
            position: "relative",
            left: "-585px",
            top: "20px",
          }}
        >
          Query Response
        </h2> */}
          <div
            style={{
              // width: "85%",
              justifyContent: "center",
              // position: "relative",
              left: "70px",
              overflowX: "auto",
              maxHeight: "500px",
              marginBottom: "200px",
            }}
          >
            <span className="query-responce-header">Query Response</span>
            <Paper style={{ marginTop: "10px" }}>
              <TableContainer component={Paper}>
                <Table stickyHeader aria-label="static table">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          textTransform: "capitalize",
                          backgroundColor: "#dbdbe98a",
                          color: "black",
                          fontWeight: "400px",
                        }}
                      >
                        Index
                      </TableCell>
                      {console.log("parag", output.result)}
                      {output.result &&
                        Object.keys(output.result[0]).map((columnName, index) => (
                          <TableCell
                            key={index}
                            style={{
                              textTransform: "capitalize",
                              backgroundColor: "#dbdbe98a",
                              color: "black",
                              fontWeight: "400px",
                            }}
                          >
                            {/* Value */}
                            {columnName}
                            {/* {output.result[Object.keys(output.result)[0]]} */}
                          </TableCell>
                        ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {/* {output.result ? (
                    Object.keys(output.result[Object.keys(output.result)[0]]).map((value, index) => (
                      <TableRow key={index}>
                        <TableCell>{index}</TableCell>
                        {console.log("result object dot", output.result)}
                        {Object.values(output.result).map((columnData, dataIndex) => (
                          <TableCell key={dataIndex}>{columnData}</TableCell>
                        ))}
                      </TableRow>
                    )) */}
                    {output.result ? (
                      Object.keys(output.result).map((rowKey, rowIndex) => (
                        <TableRow key={rowIndex}>
                          {/* Display the row index */}
                          <TableCell>{rowIndex}</TableCell>

                          {/* Map over the columns based on the rowKey */}
                          {Object.keys(output.result[rowKey]).map((columnName, colIndex) => (
                            <React.Fragment key={colIndex}>
                              {/* Display the column name */}
                              {/* <TableCell>{columnName}</TableCell> */}

                              {/* Display the corresponding value */}
                              <TableCell>{output.result[rowKey][columnName]}</TableCell>
                            </React.Fragment>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={output.result ? Object.keys(output.result).length + 1 : 2}>No data available</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default Demofile;
