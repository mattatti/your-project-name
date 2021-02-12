import {
  ButtonGroup,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  withStyles,
  Button,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";
import DCandidateForm from "./DCandidateForm";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
const styles = (theme) => ({
  root: {
    "& .MuiTableCell-head": {
      fontSize: "1.25rem",
    },
  },
  paper: {
    margin: theme.spacing(2),
    padding: theme.spacing(2),
  },
});

const DCandidates = ({ classes, ...props }) => {
  const [currentId, setCurrentId] = useState(0);

  useEffect(() => {
    props.fetchAllDCandidates();
  }, []); //componentDidMount

  return (
    <Paper className={classes.paper} elevation={3}>
      <Grid container>
        <Grid item xs={6}>
          <DCandidateForm {...{ currentId, setCurrentId }} />
        </Grid>
        <Grid item xs={6}>
          <TableContainer>
            <Table>
              <TableHead className={classes.root}>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Mobile</TableCell>
                  <TableCell>Blood Group</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {props.dCandidateList.map((record, index) => {
                  return (
                    <TableRow key={index} hover>
                      <TableCell>{record.fullname}</TableCell>
                      <TableCell>{record.mobile}</TableCell>
                      <TableCell>{record.bloodgroup}</TableCell>
                      <TableCell>
                        <ButtonGroup variant="text">
                          <Button>
                            <EditIcon
                              color="primary"
                              onClick={() => {
                                setCurrentId(record.id);
                              }}
                            />
                          </Button>
                          <Button>
                            <DeleteIcon color="secondary" />
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Paper>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  fetchAllDCandidates: actions.fetchAll,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidates));
