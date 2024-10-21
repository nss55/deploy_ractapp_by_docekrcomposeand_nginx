import React, { useState } from "react";
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Paper, Grid, Box, TableContainer } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/system";
import relantoLogo from "../Assets/relantos_logo.jpg";
import axios from "axios";
import "./Demofile.css";
import { APIBACKEND, APIAIOLD, APIAINEW } from "../E2E/axios.utils";

const StyledTableCell = styled(TableCell)({
  head: {
    backgroundColor: "#f0f0f0",
    fontWeight: "bold",
  },
});

const Demofile2 = () => {
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
    APIAIOLD.post("sql_query", payload) // Replace with your API endpoint
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
    <div style={{ margin: "10px" }}>
      <div
        style={
          {
            // position: "relative",
            // top: "40px",
            // backgroundColor: "#dbdbe98a",
          }
        }
        className="header"
      >
        <span style={{ fontSize: "40px", fontWeight: "2px" }}> Relanto Co-Pilot</span>
        <img src={relantoLogo} alt="relanto_logo" style={{ marginRight: "10px" }} height={55} />
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "10px" }}>
        <button
          variant="contained"
          className="btn"
          onClick={() => {
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
      <Grid container spacing={1}>
        <Grid item xs={7}>
          <Box
            style={{
              position: "relative",
              top: "100px",
              left: "80px",
              width: "75%",
            }}
          >
            <TextField label="NLP Query" variant="outlined" fullWidth value={query} onChange={handleQueryChange} />
          </Box>
        </Grid>

        <Grid item xs={5}>
          <textarea
            value={output.query ? output.query : ""}
            onChange={(e) => setOutput({ ...output, query: e.target.value })}
            readOnly={isEditable}
            placeholder="Output"
            style={{
              width: "200px",
              height: "110px",
              border: "1px solid #ccc",
              padding: "5px",
              fontSize: "14px",
              position: "relative",
              top: "100px",
            }}
          />
          <button
            variant="contained"
            color="primary"
            onClick={handleEditToggle}
            style={{
              position: "relative",
              top: "90px",
              left: "10px",
            }}
            className="btn"
          >
            {isEditable ? "SAVE" : "EDIT"}
          </button>
          {/* <Button
            variant="contained"
            color="primary"
            onClick={handleQuerySubmit}
            style={{
              position: "relative",
              top: "90px",
              left: "10px",
            }}
          >
            Submit
          </Button> */}
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            style={{
              position: "relative",
              left: "80px",
              top: "50px",
              width: "20%",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button variant="contained" onClick={handleQuerySubmit} className="btn">
              SUBMIT
            </button>
            <button variant="contained" onClick={handleClear} className="btn">
              CLEAR
            </button>
          </Box>
        </Grid>
      </Grid>
      <div
        style={{
          marginTop: "20px",
          position: "relative",
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
            width: "85%",
            justifyContent: "center",
            position: "relative",
            left: "70px",
            overflowX: "auto",
            maxHeight: "500px",
            marginBottom: "200px",
          }}
        >
          <span className="query-responce-header">Query Response</span>
          <Paper>
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
    </div>
  );
};

export default Demofile2;
