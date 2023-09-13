import React, { useState } from 'react';
import {
  Collapse,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';

export interface MenuItem {
  name: string;
  icon: string;
  path?: string;
  sublist?: MenuItem[];
}

const TwoLevelMenu: React.FC<{ items: MenuItem[] }> = ({ items }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (openItem === index) {
      setOpenItem(null);
    } else {
      setOpenItem(index);
    }
  };

  if (!Array.isArray(items)) {
    console.error('items is not an array:', items);
    return null; // Handle the case where items is not an array
  }

  return (
    <div>
      <List component="nav">
        {items.map((item, index) => (
          <div key={index}>
            <ListItemButton onClick={() => handleClick(index)}>
              {item.sublist?.length > 0 ? (
                openItem === index ? (
                  <ExpandLess /> // Display collapse icon
                ) : (
                  <ExpandMore /> // Display expand icon
                )
              ) : (
                <div style={{ width: '24px' }} /> // Empty space for alignment when no icon is shown
              )}
              {item.sublist?.length > 0 && (
                <ListItemIcon>{item.icon}</ListItemIcon>
              )}
              <ListItemText primary={item.name} />
            </ListItemButton>
            <Collapse in={openItem === index} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {item.sublist?.map((subItem, subIndex) => (
                  <ListItemButton
                    key={subIndex}
                    sx={{ pl: 4 }}
                    component="a"
                    href={subItem.path}
                  >
                    <ListItemIcon>{subItem.icon}</ListItemIcon>
                    <ListItemText primary={subItem.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </div>
        ))}
      </List>
    </div>
  );
};

export default TwoLevelMenu;
