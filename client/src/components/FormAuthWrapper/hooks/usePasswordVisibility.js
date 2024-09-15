import { useState } from 'react';
import IconSentinel from "../../../utils/IconSentinel.jsx";

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
