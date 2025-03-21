import {useState} from "react";
import IconSentinel from "../../../utils/IconSentinel.jsx";

/**
 * A custom React hook that manages the visibility of a password input field.
 * It provides an icon to toggle the visibility of the password and a boolean flag to indicate the current visibility state.
 *
 * @returns {Array} An array containing the following items:
 * - iconPassword: The current icon representing the password visibility state.
 * - showPassword: A boolean flag indicating whether the password is currently visible.
 * - togglePasswordVisibility: A function to toggle the password visibility state.
 */
const usePasswordVisibility = () => {
  const [iconPassword, setIconPassword] = useState(IconSentinel.getIcon("eye-closed.svg"));
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setIconPassword( !showPassword ? IconSentinel.getIcon( "eye-open.svg" ) : IconSentinel.getIcon( "eye-closed.svg" ));
  };

  return [iconPassword, showPassword, togglePasswordVisibility];
};

export default usePasswordVisibility;