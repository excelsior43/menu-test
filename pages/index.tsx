import React from 'react';
import data from './menuData.json';

import TwoLevelDynamicMenu, { MenuItem } from './TwoLevelDynamicMenu';

const App: React.FC = () => {
  const menuItem: MenuItem[] = data
  return <div><TwoLevelDynamicMenu items={menuItem} /></div>;
};

export default App;
