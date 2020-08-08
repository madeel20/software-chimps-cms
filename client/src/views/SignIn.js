import React, { useState, useEffect } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import { Redirect } from "react-router-dom";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import GridItem from "components/Grid/GridItem.js";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import firebase, { adminRef } from "../firebase";
import { CircularProgress } from "@material-ui/core";
import { useHistory } from "react-router-dom";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Software Chimps
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
    const history = useHistory();
  const classes = useStyles();
  const [signingIn, setSigning] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("admin@softwarechimps.com");
  const [password, setPassword] = useState("softwarechimps");
  const [error, setError] = useState("");
  useEffect(()=>{
    const user = firebase.auth().currentUser;
    if (user) {
      adminRef
        .where("email", "==", user.email)
        .get()
        .then((res) => {
            if(res.docs.length>0){
                // move to admin panel
                alert('here')
                history.push("/admin");
                setLoading(false);
                return;
            }
            else {
                // move to employee panel
                history.push("/admin");
                setLoading(false);
                return;
            }
        }).catch(err=>{ setLoading(false);});
    } else {
      setLoading(false);
    }
  },[])
  const onSubmit = (e) => {
    e.preventDefault();
    setSigning(true);
    setError("");
    firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        adminRef
          .where("email", "==", email)
          .get()
          .then((res) => {
            if (res.size > 0) {
                history.push("/admin");
                return;
            }
            setError('Invalid User!')
          }).catch((err) => {
            setError(err.message);
            setSigning(false);
          });;
      })
      .catch((err) => {
        setError(err.message);
        setSigning(false);
      });
  };
  if (isLoading) {
    return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "80vh" }}
      >
        <GridItem item xs={12} sm={12} md={12}>
          <CircularProgress />
        </GridItem>
      </Grid>
    );
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h3">
          Software Chimps
        </Typography>
        <br />
        <br />
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} onSubmit={onSubmit} noValidate>
          {error !== "" && <Alert severity="error">{error}</Alert>}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me" 
          /> */}

          {signingIn && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              ...{" "}
            </Button>
          )}
          {!signingIn && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In{" "}
            </Button>
          )}

          <Grid container>
            {/* <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid> */}
            {/* <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid> */}
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
