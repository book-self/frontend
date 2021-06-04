import React, { Fragment, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { signIn, selectUser, clearUser } from '../../store/User/UserSlice';

export const SignInForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const { isFetching, isSuccess, isError, error } = useSelector(
    selectUser
  );

  const validationSchema = yup.object({
    username: yup
      .string('Enter your username')
      .required('Username is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      username: `${process.env.REACT_APP_TEST_USERNAME}`,
      password: `${process.env.REACT_APP_TEST_PASSWORD}`
    },
    validationSchema: validationSchema,
    onSubmit: (payload, actions) => {
      dispatch(signIn(payload));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      if (error.status === 401) {
        formik.touched.password = true;
        formik.errors.password = "Invalid username or password"
      }
      dispatch(clearUser());
    }

    if (isSuccess) {
      dispatch(clearUser());
      history.push('/profile');
    }
  }, [dispatch, history, formik, isError, isSuccess, error]);

  return (
    <Fragment>
      <form noValidate onSubmit={formik.handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="username"
          label="Username"
          type="username"
          id="username"
          autoComplete="username"
          onChange={formik.handleChange}
          value={formik.values.username}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
          autoFocus
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <Box mt={2} mb={2}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={isFetching}
          >
            {isFetching ? (<CircularProgress color="inherit" size={20} style={{marginRight: '6px'}} />) : null}
            Sign In
          </Button>
        </Box>
      </form>
    </Fragment>
  );
}
