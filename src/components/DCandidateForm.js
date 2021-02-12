import {
  Grid,
  InputLabel,
  MenuItem,
  TextField,
  withStyles,
  FormControl,
  Select,
  Button,
  FormHelperText,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import { connect } from "react-redux";
import * as actions from "../actions/dCandidate";

const styles = (theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      minWidth: 230,
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 230,
  },
  smMargin: {
    margin: theme.spacing(1),
  },
});
const initialFieldValues = {
  fullname: "",
  mobile: "",
  email: "",
  age: "",
  bloodgroup: "",
  address: "",
};

const DCandidateForm = ({ classes, ...props }) => {
  //validate()
  //validate ({fullname: 'Jenny'})
  const validate = (fieldValues = values) => {
    let temp = {};
    if ("fullname" in fieldValues)
      temp.fullname = fieldValues.fullname ? "" : "This field is required.";
    if ("mobile" in fieldValues)
      temp.mobile = fieldValues.mobile ? "" : "This field is required.";
    if ("bloodgroup" in fieldValues)
      temp.bloodgroup = fieldValues.bloodgroup ? "" : "This field is required.";
    if ("email" in fieldValues)
      temp.email = /^$|.+@.+..+/.test(values.email)
        ? ""
        : "Email is not valid.";
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange } = useForm(
    initialFieldValues,
    validate
  );

  //material-ui select
  const inputLabel = React.useRef(null);
  const [labelWidth, setLabelWidth] = React.useState(0);
  React.useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      props.createDCandidate(values, () => {
        window.alert("Inserted.");
      });
    }
  };

  useEffect(() => {
    if (props.currentId != 0)
      setValues({
        ...props.dCandidateList.find((x) => x.id == props.currentId),
      });
  }, [props.currentId]);
  return (
    <form
      autoComplete="off"
      noValidate
      className={classes.root}
      onSubmit={handleSubmit}
    >
      <Grid container>
        <Grid item xs={6}>
          <TextField
            name="fullname"
            variant="outlined"
            label="Full Name"
            value={values.fullname}
            onChange={handleInputChange}
            error={true}
            helperText={errors.fullname}
            {...(errors.fullname && {
              error: true,
              helperText: errors.fullname,
            })}
          />
          <TextField
            name="email"
            variant="outlined"
            label="Email"
            value={values.email}
            onChange={handleInputChange}
            error={true}
            helperText={errors.email}
            {...(errors.email && {
              error: true,
              helperText: errors.email,
            })}
          />
          <FormControl
            variant="outlined"
            className={classes.formControl}
            {...(errors.bloodgroup && { error: true })}
          >
            <InputLabel ref={inputLabel}>Blood Group</InputLabel>
            <Select
              name="bloodgroup"
              value={values.bloodgroup}
              onChange={handleInputChange}
              labelWidth={labelWidth}
            >
              <MenuItem value="">Select Blood Group</MenuItem>
              <MenuItem value="A+">A +ve</MenuItem>
              <MenuItem value="A-">A -ve</MenuItem>
              <MenuItem value="B+">B +ve</MenuItem>
              <MenuItem value="B-">B -ve</MenuItem>
              <MenuItem value="AB+">AB +ve</MenuItem>
              <MenuItem value="AB-">AB -ve</MenuItem>
              <MenuItem value="O+">O +ve</MenuItem>
              <MenuItem value="O-">O -ve</MenuItem>
            </Select>
            {errors.bloodgroup && (
              <FormHelperText>{errors.bloodgroup}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="mobile"
            variant="outlined"
            label="Mobile"
            value={values.mobile}
            onChange={handleInputChange}
            error={true}
            helperText={errors.mobile}
            {...(errors.mobile && {
              error: true,
              helperText: errors.mobile,
            })}
          />
          <TextField
            name="age"
            variant="outlined"
            label="Age"
            value={values.age}
            onChange={handleInputChange}
          />
          <TextField
            name="address"
            variant="outlined"
            label="Address"
            value={values.address}
            onChange={handleInputChange}
          />
          <div>
            <Button
              className={classes.smMargin}
              variant="contained"
              color="primary"
              type="submit"
            >
              Submit
            </Button>
            <Button className={classes.smMargin} variant="contained">
              Reset
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
};

const mapStateToProps = (state) => ({
  dCandidateList: state.dCandidate.list,
});

const mapActionToProps = {
  createDCandidate: actions.create,
  updateDCandidate: actions.update,
};

export default connect(
  mapStateToProps,
  mapActionToProps
)(withStyles(styles)(DCandidateForm));
