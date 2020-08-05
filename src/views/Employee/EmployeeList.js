import React, { useContext, useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "./EmployeeTable";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import AddEmployee from "./AddEmployee/EmployeeProfile";
import { employeesRef } from "../../firebase/index";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme) => ({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1",
    },
  },
}));

export default function EmployeeList() {
  const classes = useStyles();
  const [employees, setEmployee] = useState([
    // {
    //   firstname: "Adeel",
    //   lastname: "Khan",
    //   email: "aliadeel20@gmail.com",
    //   salary: "9000",
    //   joindate: "22-2-2019",
    //   jobtitle: "web dev",
    // },
    // {
    //   firstname: "Adeel",
    //   lastname: "Khan",
    //   email: "aliadeel20@gmail.com",
    //   salary: "9000",
    //   joindate: "22-2-2019",
    //   jobtitle: "web dev",
    // },
    // {
    //   firstname: "Adeel",
    //   lastname: "Khan",
    //   email: "aliadeel20@gmail.com",
    //   salary: "9000",
    //   joindate: "22-2-2019",
    //   jobtitle: "web dev",
    // },
    // {
    //   firstname: "Adeel",
    //   lastname: "Khan",
    //   email: "aliadeel20@gmail.com",
    //   salary: "9000",
    //   joindate: "22-2-2019",
    //   jobtitle: "web dev",
    // },
  ]);
  const [isLoading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  console.log(employees);
  useEffect(() => {
    employeesRef
      .get()
      .then((res) => {
        setEmployee(res.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  const onEmployeeDelete = id=>{
    setLoading(true)
    employeesRef.doc(id).delete().then(res=>{
      onAddition();
     
    }).catch(res=>{setLoading(false);console.log(res)})
  }
  const onAddition = () => {
    employeesRef
      .get()
      .then((res) => {
        setEmployee(res.docs);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <GridContainer>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <AddEmployee
              onAdd={() => {
                onAddition()
              }}
              onCancelClick={handleClose}
            />
          </div>
        </Fade>
      </Modal>
      <GridItem md={12}>
        <Card>
          <CardHeader color="primary">
            <GridContainer alignItems="center">
              <GridItem md={9}>
                <h4 className={classes.cardTitleWhite}>All Employee</h4>
                <p className={classes.cardCategoryWhite}></p>
              </GridItem>
              <GridItem md={3}>
                <Button onClick={handleOpen} color="info" round>
                  <i class="material-icons">add</i> Add Employee
                </Button>
              </GridItem>
            </GridContainer>
          </CardHeader>
          <CardBody>
            {isLoading && (
              <GridContainer
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: "50vh" }}
              >
                <GridItem item xs={3}>
                  <CircularProgress />
                </GridItem>
              </GridContainer>
            )}

            {employees.length > 0 && !isLoading &&  (
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "First Name",
                  "Last Name",
                  "Email",
                  "Job Title",
                  "Join Date",
                  "Salary",
                ]}
                tableData={employees}
                onEmployeeDelete={onEmployeeDelete}
                onEdit={() => {
                  onAddition()
                }}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>

      {/* <GridItem xs={12} sm={12} md={12}>
        <Card plain>
          <CardHeader plain color="primary">
            <h4 className={classes.cardTitleWhite}>
              Table on Plain Background
            </h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["ID", "Name", "Country", "City", "Salary"]}
              tableData={[
                ["1", "Dakota Rice", "$36,738", "Niger", "Oud-Turnhout"],
                ["2", "Minerva Hooper", "$23,789", "Curaçao", "Sinaai-Waas"],
                ["3", "Sage Rodriguez", "$56,142", "Netherlands", "Baileux"],
                [
                  "4",
                  "Philip Chaney",
                  "$38,735",
                  "Korea, South",
                  "Overland Park"
                ],
                [
                  "5",
                  "Doris Greene",
                  "$63,542",
                  "Malawi",
                  "Feldkirchen in Kärnten"
                ],
                ["6", "Mason Porter", "$78,615", "Chile", "Gloucester"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem> */}
    </GridContainer>
  );
}
