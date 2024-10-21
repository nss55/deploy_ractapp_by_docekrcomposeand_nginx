import React, { useState } from "react";
import {
  TextField,
  Button,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Grid,
  Box,
  TableContainer,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  LinearProgress,
} from "@mui/material";
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

const Demofile = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [output, setOutput] = useState({});
  const [isEditable, setIsEditable] = useState(false);

  console.log("output==>", output);

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const [selectedValue, setSelectedValue] = useState("SQL_Query"); // You can set the default value here

  // Handle change when a radio button is selected
  // const handleChange = (event) => {
  //   setSelectedValue(event.target.value);
  // };
  // console.log("selectedValue", selectedValue);

  // const handleQuerySubmit = () => {
  //   const payload = { query };
  //   {
  //     selectedValue === "SQL_Query"
  //       ? axios
  //           // .post("http://65.1.198.137:9000/sql_query", payload)
  //           .post("http:///65.1.198.137:6999/sql_query", payload)
  //           .then((response) => {
  //             console.log(response.data, "output");
  //             setOutput(response.data);
  //           })
  //           .catch((error) => {
  //             console.error("API request failed:", error);
  //           })
  //       : axios
  //           .post("http://65.1.198.137:8510/retrieve_answer", payload)
  //           .then((response) => {
  //             console.log("response", response.data);
  //             setOutput(response.data);
  //           })
  //           .catch((error) => {
  //             console.error("API request failed:", error);
  //           });
  //   }
  // };

  const [loading, setLoading] = useState(false);

  const handleQuerySubmit = () => {
    setLoading(true);
    const payload = { query };
    // APIAINEW.post("bot_query", payload)
    APIAINEW.post("get_bot_response", payload)
      .then((response) => {
        // console.log("output", response.data);
        // console.log("output type", typeof response.data);
        // if (typeof response.data === "string") {
        //   setOutput(JSON.parse(response.data));
        // } else setOutput(response.data);
        // setSelectedValue(response.data.query ? "SQL_Query" : "Unstructured_data");
        setOutput(response.data);
        setSelectedValue(
          response.data.query ? "SQL_Query" : "Unstructured_data"
        );
      })
      .catch((error) => {
        console.error("API request failed:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleClear = () => {
    setQuery("");
    // setOutput({});
    setSelectedValue("SQL_Query");
    setTimeout(() => {
      setOutput(""); // Clear the output
    }, 200);
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
        <span style={{ fontSize: "40px", fontWeight: "2px" }}>
          {" "}
          Relanto Co-Pilot
        </span>
        <img
          src={relantoLogo}
          alt="relanto_logo"
          style={{ marginRight: "10px" }}
          height={55}
        />
      </div>
      <div>{loading && <LinearProgress />}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
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
            <TextField
              label="NLP Query"
              variant="outlined"
              fullWidth
              value={query}
              onChange={handleQueryChange}
            />
          </Box>
        </Grid>

        <Grid item xs={5}>
          {selectedValue === "SQL_Query" ? (
            <>
              <textarea
                value={output.query ? output.query : ""}
                onChange={(e) =>
                  setOutput({ ...output, query: e.target.value })
                }
                readOnly={isEditable}
                placeholder="Output"
                style={{
                  width: "400px",
                  height: "180px",
                  border: "1px solid #ccc",
                  padding: "5px",
                  fontSize: "14px",
                  position: "relative",
                  top: "100px",
                  resize: "both",
                  overflow: "auto",
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
            </>
          ) : (
            <>
              <div
                // value={output.response ? output.response : ""}
                // value={
                //   output.response[0].retrieved_chunks
                //     ? output.response[0].retrieved_chunks
                //     : ""
                // }
                // // onChange={(e) => setOutput({ ...output, query: e.target.value })}
                // readOnly={isEditable}
                placeholder="Output"
                style={{
                  width: "400px",
                  height: "180px",
                  border: "1px solid #ccc",
                  padding: "5px",
                  fontSize: "14px",
                  position: "relative",
                  top: "100px",
                  resize: "both",
                  overflow: "auto",
                }}
              >
                {output.response[0].retrieved_chunks
                  .split("\n")
                  .map((data, index) => (
                    <p
                      style={{ fontSize: "9px" }}
                      key={index}
                      dangerouslySetInnerHTML={{ __html: data }}
                    />
                  ))}
              </div>
              <button
                variant="contained"
                color="primary"
                style={{
                  position: "relative",
                  top: "90px",
                  left: "10px",
                  display: "none",
                }}
                className="btn"
              >
                {"EDIT"}
              </button>
            </>
          )}
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl
            style={{
              position: "relative",
              left: "80px",

              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={selectedValue}
              onChange={handleChange}
            >
              <FormControlLabel value="SQL_Query" control={<Radio />} label="SQL Query" />
              <FormControlLabel value="Unstructured_data" control={<Radio />} label="Unstructured Data" />
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid> */}
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            style={{
              position: "relative",
              left: "80px",
              // top: "50px",
              width: "20%",
              padding: "10px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <button
              variant="contained"
              onClick={handleQuerySubmit}
              className="btn"
            >
              SUBMIT
            </button>
            <button variant="contained" onClick={handleClear} className="btn">
              CLEAR
            </button>
          </Box>
        </Grid>
      </Grid>
      {selectedValue === "SQL_Query" ? (
        <>
          <div
            style={{
              marginTop: "20px",
              position: "relative",
              top: "50px",
            }}
          >
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
                            whiteSpace: "nowrap",
                            // width: "100%",
                          }}
                        >
                          Index
                        </TableCell>
                        {/* {console.log("parag", output.result)} */}
                        {output.result &&
                          Object.keys(output.result[0]).map(
                            (columnName, index) => (
                              <TableCell
                                key={index}
                                style={{
                                  textTransform: "capitalize",
                                  backgroundColor: "#dbdbe98a",
                                  color: "black",
                                  fontWeight: "400px",
                                  whiteSpace: "nowrap",
                                  // width: "100%",
                                }}
                              >
                                {/* Value */}
                                {columnName.replace(/_+/g, " ")}
                                {/* {output.result[Object.keys(output.result)[0]]} */}
                              </TableCell>
                            )
                          )}
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
                        Object.keys(output.result)
                          .slice(0, 10)
                          .map((rowKey, rowIndex) => (
                            <TableRow key={rowIndex}>
                              {/* Display the row index */}
                              <TableCell>{rowIndex + 1}</TableCell>

                              {/* Map over the columns based on the rowKey */}
                              {Object.keys(output.result[rowKey]).map(
                                (columnName, colIndex) => (
                                  <React.Fragment key={colIndex}>
                                    {/* Display the column name */}
                                    {/* <TableCell>{columnName}</TableCell> */}

                                    {/* Display the corresponding value */}
                                    {/* <TableCell>{typeof output.result[rowKey][columnName]}</TableCell> */}
                                    <TableCell>
                                      {typeof output.result[rowKey][
                                        columnName
                                      ] === "number"
                                        ? parseInt(
                                            output.result[rowKey][columnName]
                                          )
                                        : output.result[rowKey][columnName]}
                                    </TableCell>

                                    {/* <TableCell>{isNaN(output.result[rowKey][columnName]) ? "-" : output.result[rowKey][columnName]}</TableCell> */}
                                  </React.Fragment>
                                )
                              )}
                            </TableRow>
                          ))
                      ) : (
                        <TableRow>
                          <TableCell
                            colSpan={
                              output.result
                                ? Object.keys(output.result).length + 1
                                : 2
                            }
                          >
                            No data available
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </>
      ) : (
        <div
          style={
            {
              // marginTop: "20px",
              // position: "relative",
              // top: "50px",
            }
          }
        >
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              position: "relative",
              left: "70px",
              // overflowX: "auto",
              // maxHeight: "500px",
              marginBottom: "200px",
            }}
          >
            <textarea
              value={
                output.response[0].response ? output.response[0].response : ""
              }
              // onChange={(e) => setOutput({ ...output, query: e.target.value })}
              readOnly={isEditable}
              placeholder="Output"
              style={{
                width: "90%",
                height: "180px",
                border: "1px solid #ccc",
                padding: "5px",
                fontSize: "14px",
                position: "relative",
                top: "100px",
                resize: "both",
                overflow: "auto",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Demofile;
