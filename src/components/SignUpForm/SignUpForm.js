import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { signUp } from '../../store/Token/TokenSlice';

export const SignUpForm = () => {
  const dispatch = useDispatch();

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    username: yup
      .string('Enter your username')
      .min(6, 'Usernames must be at least 6 characters in length')
      .matches(/^[a-z0-9]*$/, 'Usernames must only contain lowercase characters and numbers.')
      .required('Username is required'),
    password_hash: yup
      .string('Enter your password')
      .min(8, 'Password must be at least 8 characters in length')
      .matches(/^(?=.*[A-Z])/, 'Password must contain at least one uppercase character')
      .matches(/^(?=.*[a-z])/, 'Password must contain at least one lowercase character')
      .matches(/^(?=.*[0-9])/, 'Password must contain at least one number')
      .matches(/^.*[!@#$%^&*()_+\-=[\]{};':'\\|,.<>\\/?].*$/, 'Password must contain at least one special character')
      .required('Password is required'),
    password_confirm: yup
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
      email: '',
      username: '',
      password_hash: '',
      password_confirm: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      dispatch(signUp(values));
    },
  });

  return (
    <form noValidate onSubmit={formik.handleSubmit}>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email Address"
        type="email"
        id="email"
        autoComplete="email"
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        autoFocus
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="username"
        label="Username"
        type="text"
        id="username"
        autoComplete="username"
        onChange={formik.handleChange}
        value={formik.values.username}
        error={formik.touched.username && Boolean(formik.errors.username)}
        helperText={formik.touched.username && formik.errors.username}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password_hash"
        label="Password"
        type="password"
        id="password_hash"
        autoComplete="new-password"
        onChange={formik.handleChange}
        value={formik.values.password_hash}
        error={formik.touched.password_hash && Boolean(formik.errors.password_hash)}
        helperText={formik.touched.password_hash && formik.errors.password_hash}
      />

      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="password_confirm"
        label="Confirm Password"
        type="password"
        id="password_confirm"
        autoComplete="new-password"
        onChange={formik.handleChange}
        value={formik.values.password_confirm}
        error={formik.touched.password_confirm && Boolean(formik.errors.password_confirm)}
        helperText={formik.touched.password_confirm && formik.errors.password_confirm}
      />

      <Box mt={2} mb={2}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign Up
        </Button>
      </Box>
    </form>
  );
}
