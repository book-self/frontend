import React, { Fragment, useEffect } from 'react';
import { Box, Button, CircularProgress, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { resetPassword, selectUser, clearUser } from '../../store/User/UserSlice';

export const ResetPasswordForm = ({ token }) => {
  const dispatch = useDispatch();

  const { isFetching, isSuccess, isError, error } = useSelector(
    selectUser
  );

  const validationSchema = yup.object({
    password: yup
      .string('Enter your password')
      .min(8, 'Password must be at least 8 characters in length')
      .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
      .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/^.*[!@#$%^&*()_+\-=[\]{};':'\\|,.<>\\/?].*$/, 'Password must contain at least one special character')
      .required('Password is required'),
    passwordConfirm: yup
      .string('Re-enter your password')
      .when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("password")],
          "Passwords do not match"
        )
      })
      .required('Password confirmation is required'),
  });

  const formik = useFormik({
    initialValues: {
      token: token,
      password: '',
      passwordConfirm: ''
    },
    validationSchema: validationSchema,
    onSubmit: (payload, actions) => {
      dispatch(resetPassword(payload));
    },
  });

  useEffect(() => {
    return () => {
      dispatch(clearUser());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isError) {
      if (error.status === 403) {
        formik.touched.password = true;
        formik.errors.password = "The reset link has expired"
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
        <input type="hidden" name="token" value={formik.values.token} />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.password}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="passwordConfirm"
          label="Confirm Password"
          type="password"
          id="passwordConfirm"
          autoComplete="new-password"
          onChange={formik.handleChange}
          value={formik.values.passwordConfirm}
          error={formik.touched.passwordConfirm && Boolean(formik.errors.passwordConfirm)}
          helperText={formik.touched.passwordConfirm && formik.errors.passwordConfirm}
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
            Reset Password
          </Button>
        </Box>
      </form>
    </Fragment>
  );
}
