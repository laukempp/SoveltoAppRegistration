import React from "react";

// Input feedback
const InputFeedback = ({ error }) =>
  error ? <div className="input-feedback">{error}</div> : null;

const CheckboxGroup = ({
  field: { name, value },
  form: { errors, setFieldTouched, setFieldValue },
  label,
  options,
  ...props
}) => {
  const handleChange = checkedValues => {
    setFieldTouched(name);
    setFieldValue(name, checkedValues);
  };

  return (
    <div className="form-group">
      <label>{label}</label> <br />
      <br />
      <input
        name={name}
        type="checkbox"
        value={value} // could be something else for output?
        onChange={handleChange}
        options={options}
      />
      <InputFeedback error={errors[name]} />
    </div>
  );
};

export default CheckboxGroup;