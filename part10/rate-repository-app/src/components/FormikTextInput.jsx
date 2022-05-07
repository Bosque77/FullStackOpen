// import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import { Input, FormControl, WarningOutlineIcon } from 'native-base';

// const styles = StyleSheet.create({
// });

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <FormControl isInvalid={showError} w="75%" maxW="300px">
        <FormControl.Label>{props.placeholder}</FormControl.Label>
        <Input
          onChangeText={value => helpers.setValue(value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
          {meta.error}
        </FormControl.ErrorMessage>
      </FormControl>
    </>
  );
};

export default FormikTextInput;