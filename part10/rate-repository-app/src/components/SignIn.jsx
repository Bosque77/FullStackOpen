// Formik x React Native example
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Formik } from 'formik';
import { Box, Button } from 'native-base'
import * as yup from 'yup';
import FormikTextInput from './FormikTextInput';


const validationSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup.string().required('Password is required'),
});

// const styles = StyleSheet.create({

// });


const onSubmit = (values) => {
  console.log(values);
};

const SignIn = () => {


  return (
    <>
      <Formik
        initialValues={{
          username: 'Username',
          password: 'Password',
        }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >

        {({ handleSubmit }) => {
          return (
            <Box alignItems="center">
              <FormikTextInput name="username" placeholder="Username" />
              <FormikTextInput name="password" placeholder="Password" />
              <Button style={{ marginTop: 15 }} onPress={handleSubmit}>Submit</Button>
            </Box>
          )

        }}

      </Formik>
    </>
  )

};



export default SignIn