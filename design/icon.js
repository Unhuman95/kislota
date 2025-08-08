import React from 'react';

const TabIcon = ({ Icon, focused }) => (
  <Icon
    width={35}
    height={35}
    stroke={focused ? 'grey' : 'white'}
    fill={focused ? 'grey' : 'white'}
    strokeWidth={8}
  />
);

export default TabIcon;