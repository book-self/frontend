import React, { Fragment, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { forgotPassword, selectUser, clearUser } from '../../store/User/UserSlice';

export const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

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
        formik.touched.email = true;
        formik.errors.email = "Email address could not be found"
      }
      dispatch(clearUser());
    }

    if (isSuccess) {
      dispatch(clearUser());
    }
  }, [dispatch, formik, isError, isSuccess, error]);

  return (
    <Fragment>
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
    </Fragment>
  );
}
