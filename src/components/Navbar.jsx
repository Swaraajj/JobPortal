import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  Stack,
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Add Job', to: '/create' },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backdropFilter: 'blur(14px)',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        borderBottom: '1px solid rgba(148, 163, 184, 0.18)',
      }}
    >
      <Toolbar sx={{ minHeight: { xs: 68, md: 76 }, px: { xs: 2, md: 0 } }}>
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: '14px',
              display: 'grid',
              placeItems: 'center',
              background: 'linear-gradient(135deg, #4f46e5 0%, #0ea5e9 100%)',
              color: 'white',
              boxShadow: '0 10px 24px rgba(79, 70, 229, 0.24)',
            }}
          >
            <WorkOutlineIcon fontSize="small" />
          </Box>
          <Box>
            <Typography variant="h6" sx={{ lineHeight: 1.1 }}>
              Job Portal
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Find your next opportunity
            </Typography>
          </Box>
        </Box>

        <Stack direction="row" spacing={1}>
          {navLinks.map(({ label, to }) => {
            const isActive = location.pathname === to;

            return (
              <Button
                key={to}
                component={RouterLink}
                to={to}
                variant={isActive ? 'contained' : 'text'}
                color={isActive ? 'primary' : 'inherit'}
                sx={{
                  color: isActive ? 'white' : 'text.primary',
                  px: 2,
                }}
              >
                {label}
              </Button>
            );
          })}
          <Button
            variant="outlined"
            href="https://github.com/Swaraajj"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ borderColor: 'divider', color: 'text.primary' }}
          >
            Contact
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
