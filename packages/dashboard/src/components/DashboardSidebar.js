import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography
} from '@material-ui/core';
import {
  Settings as SettingsIcon,
  User as UserIcon,
  Home
} from 'react-feather';
import NavItem from './NavItem';
import { useAuth } from '../store/auth-context';
import { PermissionEnum } from '../models/user';

const getSidebarItems = (permissionsType) => [
  {
    href: '/admin/dashboard',
    icon: Home,
    title: 'בית'
  },
  {
    href: '/admin/account',
    icon: UserIcon,
    title: 'חשבון',
    hide: permissionsType > PermissionEnum.ACCOUNT_ADMIN
  },
  {
    href: '/admin/groups',
    icon: SettingsIcon,
    title: 'קבוצות'
  },
  {
    href: '/admin/accounts',
    icon: UserIcon,
    title: 'חשבונות',
    hide: permissionsType !== PermissionEnum.SUPER_USER
  },
  {
    href: '/admin/users',
    icon: UserIcon,
    title: 'משתמשים',
    hide: permissionsType > PermissionEnum.ACCOUNT_ADMIN
  },
  {
    href: '/admin/settings',
    icon: SettingsIcon,
    title: 'הגדרות',
    hide: permissionsType > PermissionEnum.ACCOUNT_ADMIN
  }
];

const DashboardSidebar = ({ onMobileClose, openMobile }) => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const items = getSidebarItems(currentUser.permission);

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
      }}
    >
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column',
          p: 2
        }}
      >
        <Avatar
          component={RouterLink}
          src={currentUser.avatar}
          sx={{
            cursor: 'pointer',
            width: 64,
            height: 64
          }}
          to="/admin/account"
        >
          {/* {getInitials(`${currentUser.firstName} ${currentUser.lastName}`)} */}
        </Avatar>
        <Typography
          color="textPrimary"
          variant="h5"
        >
          {`${currentUser.firstName} ${currentUser.lastName}`}
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ p: 2 }}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
              hide={item.hide}
            />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="right"
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
          PaperProps={{
            sx: {
              width: 256
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden lgDown>
        <Drawer
          anchor="right"
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: 256,
              top: 64,
              height: 'calc(100% - 64px)'
            }
          }}
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

DashboardSidebar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

DashboardSidebar.defaultProps = {
  onMobileClose: () => { },
  openMobile: false
};

export default DashboardSidebar;
