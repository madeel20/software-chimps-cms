import React, { useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import { employeesRef } from "../../../../firebase/index";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";
const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0",
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
  const classes = useStyles();
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [salary, setSalary] = useState("");
  const [joinDate, setJoinDate] = useState(today());
  const [jobTitle, setJobTitle] = useState("");
  const onAdd = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      salary === "" ||
      joinDate === "" ||
      jobTitle === ""
    ) {
      setError("Fill All the Fields!");
      return;
    }
    setLoading(true);
    //check if employee with same exists or not
    employeesRef
      .where("email", "==", email)
      .get()
      .then((res) => {
        if (res.docs.length > 0) {
          setError("Employee with same email already exist!");
          setLoading(false);
          return;
        }
        employeesRef
          .add({
            firstName,
            lastName,
            email,
            salary,
            joinDate,
            jobTitle,
          })
          .then(() => {
            setEmail("");
            setFirstName("");
            setLastName("");
            setJobTitle("");
            setJoinDate("");
            setSalary();
            setLoading(false);
            props.onCancelClick();
            props.onAdd();
          })
          .catch((err) => {
            setLoading(false);
            console.log(err);
          });
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Add Employee</h4>
            </CardHeader>

            {error !== "" && (
              <Alert variant="filled" severity="error">
                {error}
              </Alert>
            )}
            {isLoading && (
              <GridContainer
                container
                spacing={3}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "50vh", minWidth: "100%" }}
              >
                <GridItem item xs={12} sm={12} md={12}>
                  <CircularProgress />
                </GridItem>
              </GridContainer>
            )}

            {!isLoading && (
              <div>
                <CardBody>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="First Name"
                        id="first-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: firstName,
                          onChange: (e) => setFirstName(e.target.value),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Last Name"
                        id="last-name"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: lastName,
                          onChange: (e) => setLastName(e.target.value),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Email address"
                        id="email-address"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: email,
                          type: "email",
                          onChange: (e) => setEmail(e.target.value),
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Job Title"
                        id="job-title"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: jobTitle,
                          onChange: (e) => setJobTitle(e.target.value),
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Joint Date"
                        id="join-date"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: joinDate,
                          onChange: (e) => setJoinDate(e.target.value),
                          type: "date",
                        }}
                      />
                    </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                      <CustomInput
                        labelText="Salary "
                        id="salary"
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: salary,
                          onChange: (e) => setSalary(e.target.value),
                          type: "number",
                        }}
                      />
                    </GridItem>
                  </GridContainer>
                </CardBody>
                <CardFooter>
                  <Button onClick={() => onAdd()} color="primary">
                    Add Employee
                  </Button>
                  <Button onClick={() => props.onCancelClick()} color="">
                    Cancel
                  </Button>
                </CardFooter>
              </div>
            )}
          </Card>
        </GridItem>
        {/* <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar profile>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={avatar} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>Alec Thompson</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem> */}
      </GridContainer>
    </div>
  );
}
function today() {
  let d = new Date();
  let currDate = d.getDate();
  let currMonth = d.getMonth() + 1;
  let currYear = d.getFullYear();
  return (
    currYear +
    "-" +
    (currMonth < 10 ? "0" + currMonth : currMonth) +
    "-" +
    (currDate < 10 ? "0" + currDate : currDate)
  );
}
