import { useState } from "react";
import styles from "./textFieldStyle";
import { TextInput } from "react-native";

const TextField = (props) => {
  const [focus, setFocus] = useState(false);
  const { value, onChange, ...inputProps } = props;
  return (
    <TextInput
      style={
        focus
          ? { ...styles.input, ...styles.active }
          : { ...styles.input, ...styles.default }
      }
      onFocus={() => setFocus(true)}
      onBlur={() => setFocus(false)}
      value={value}
      onChangeText={onChange}
      {...inputProps}
    />
  );
};

export default TextField;
