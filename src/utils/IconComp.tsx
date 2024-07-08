import React from 'react';
import IcoMoon, { IconProps } from 'react-icomoon';
import iconSet from "./selection.json"; 

const IconComp: React.FC<IconProps> = ({ ...props }) => {
  return <IcoMoon iconSet={iconSet} {...props} />;
};

export default IconComp;
