import { useLocalStorage } from './useLocalStorage';

export const useForm = (key, initialValues, cb) => {
  // inputs - handleChange, state (dynamically manage any number of inputs)
  const [values, setValues] = useLocalStorage(key, initialValues);

  const handleChanges = e => {
    console.log(e.target.name);
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  // form/buttons - submit, clear
  const handleSubmit = e => {
    if (e) e.preventDefault();
    cb();
  };

  const clearForm = e => {
    e.preventDefault();
    setValues(initialValues);
  };

  return [values, clearForm, handleSubmit, handleChanges];
};

// Protip:
/*

this function can control multiple inputs in a class component:

  const handleChanges = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

*/
