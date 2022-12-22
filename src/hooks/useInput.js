import { useEffect, useState } from 'react';

const useInput = (initValue, validationParam, inputDependencyValue) => {
  const [value, setValue] = useState(initValue);
  const [valid, setValid] = useState({
    isInputValidated: false,
    message: '',
  });

  useEffect(() => {
    return () => {
      setValue(initValue);
      setValid({
        isInputValidated: false,
        message: '',
      });
    };
  }, []);

  useEffect(() => {
    if (value !== initValue) {
      validate();
    }
  }, [value, inputDependencyValue]);

  const validate = () => {
    if (!validationParam) {
      return;
    }
    if (
      validationParam.REGEX &&
      !value.match(
        typeof validationParam.REGEX === 'function'
          ? validationParam.REGEX(inputDependencyValue)
          : validationParam.REGEX,
      )
    ) {
      setValid({ isInputValidated: false, message: validationParam.WARNING });
      return;
    }
    setValid({
      isInputValidated: true,
      message: validationParam.SUCCESS,
    });
  };

  const onChange = e => {
    setValue(e.target.value);
    return;
  };

  const reset = () => {
    setValue(initValue);
    setValid({
      isInputValidated: false,
      message: '',
    });
  };

  return [value, valid, onChange, reset];
};

export default useInput;
