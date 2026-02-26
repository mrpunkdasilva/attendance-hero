import {useState} from "react";
import { Eye, EyeOff } from 'lucide-react'; // Import Lucide icons

/**
 * A custom React hook that manages the visibility of a password input field.
 * It provides an icon to toggle the visibility of the password and a boolean flag to indicate the current visibility state.
 *
 * @returns {Array} An array containing the following items:
 * - IconComponent: The current Lucide icon component representing the password visibility state.
 * - showPassword: A boolean flag indicating whether the password is currently visible.
 * - togglePasswordVisibility: A function to toggle the password visibility state.
 */
const usePasswordVisibility = () => {
  const [IconComponent, setIconComponent] = useState(EyeOff); // Default to EyeOff
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => {
      const newShowPassword = !prevShowPassword;
      setIconComponent(newShowPassword ? Eye : EyeOff);
      return newShowPassword;
    });
  };

  return [IconComponent, showPassword, togglePasswordVisibility];
};

export default usePasswordVisibility;