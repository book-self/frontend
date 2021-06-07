import React, { Fragment, useEffect, useState } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { forgotPassword, selectUser, clearUser } from '../../store/User/UserSlice';

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [success, setSuccessStatus] = useState(false);

  const { isFetching, isSuccess, isError, error } = useSelector(
    selectUser
  );

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required')
  });

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: (payload, actions) => {
      dispatch(forgotPassword(payload));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      if (error.status === 404) {
        formik.setErrors({
          email: "Email address could not be found"
        });
      }
      dispatch(clearUser());
    }

    if (isSuccess) {
      dispatch(clearUser());
      setSuccessStatus(true);
      history.push('/forgot-password');
    }
  }, [dispatch, history, formik, isError, isSuccess, error]);

  return (
    <Fragment>
      {
        success ? (
          <Alert severity="success" style={{ marginBottom: '1rem' }}>
            <AlertTitle>Success</AlertTitle>
            A password reset link has been emailed to you!
          </Alert>
        ) : (
          <form noValidate onSubmit={formik.handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="email"
              label="Email"
              type="email"
              id="email"
              autoComplete="email"
              onChange={formik.handleChange}
              value={formik.values.email}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              autoFocus
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
                Send Reset Link
              </Button>
            </Box>
          </form>
        )
      }
    </Fragment>
  );
}
