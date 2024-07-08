import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './LeftSideBar.scss';
import { styled } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import { Box } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import { IRootState } from '../../../store/index';
import { useSelector } from 'react-redux';
import IconComp from '../../../utils/IconComp';

const drawerWidth = 240;

const openedMixin = (theme: Theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'initial',
});

const closedMixin = (theme: Theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'initial',
  [theme.breakpoints.up('md')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const CustomListItem = styled(ListItem)<any>(({ theme, open }) => ({
  transition: 'all ease 0.4s',
  ...(open
    ? {
        '&:hover': {
          background: 'rgba(140, 205, 47, 0.08) !important',
          color: '#8acd2f',
          borderRadius: '8px',
          boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 25%)',
          transition: 'all ease 0.4s',
        },
      }
    : {
        '&:hover': {
          background: 'rgba(140, 205, 47, 0.3) !important',
          color: '#8acd2f',
          borderRadius: '0',
          boxShadow: '0',
        },
      }),
  '&.Mui-selected': {
    background: 'rgba(140, 205, 47, 0.08) !important',
    color: '#8acd2f',
    borderRadius: '8px',
    boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 25%)',
    transition: 'all ease 0.4s',
  },
}));

type DrawerProps = {
  open: any;
};

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<DrawerProps>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  zIndex: '9999',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
  '& .MuiPaper-root': {
    overflowY: 'initial !important',
  },
}));

interface LeftSideBarProps {
  showMenu: boolean;
  setShowMenu: () => void;
}

const LeftSideBar: React.FC<LeftSideBarProps> = ({ showMenu, setShowMenu }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      id: 1,
      name: t('events'),
      disabled: false,
      path: '/home',
      iconName: 'calendar',
    },
  ];

  return (
    <Drawer variant="permanent" open={showMenu}>
      <DrawerHeader sx={{ position: 'relative' }}>
        {showMenu && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link to="/home" style={{ display: 'flex', textDecoration: 'none', fontSize: '32px', alignItems: 'center' }}>
              <IconComp icon="peopleandteams" size="35" />
              Events
            </Link>
          </Box>
        )}
        {!showMenu && (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link to="/home" style={{ display: 'flex' }}>
              <IconComp icon="peopleandteams" size="22" />
            </Link>
          </Box>
        )}
        <IconButton
          sx={{
            position: 'absolute',
            right: '-10px',
            bottom: '-12px',
            zIndex: '9999',
            width: '25px',
            height: '25px',
            border: '1px solid #D2DCE0',
            background: 'rgb(248, 250, 251)',
            '&:hover': { background: 'rgb(248, 250, 251)' },
          }}
          onClick={setShowMenu}
        >
          {!showMenu ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List sx={{ padding: showMenu ? '16px;' : '', overflowY: 'auto' }}>
        {menuItems.map((item, index) => (
          <CustomListItem
            key={index}
            disablePadding
            sx={{
              display: 'block',
              ...(location.pathname === item.path &&
                !showMenu && {
                  backgroundColor: 'rgba(140, 205, 47, 0.22) !important',
                  borderRadius: '0',
                  boxShadow: 'none',
                }),
            }}
            selected={location.pathname === item.path && showMenu}
            open={showMenu}
          >
            <ListItemButton
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 'inherit',
              }}
              onClick={() => navigate(item.path)}
              disabled={item.disabled}
            >
              <IconComp icon={item.iconName} size="25" />
              <ListItemText primary={item.name} sx={{ display: showMenu ? 'block' : 'none', marginLeft:'10px' }} />
            </ListItemButton>
          </CustomListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default LeftSideBar;
