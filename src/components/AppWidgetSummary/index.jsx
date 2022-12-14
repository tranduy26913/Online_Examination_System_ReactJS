// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import {Paper, Card, darken, lighten, Typography } from '@mui/material';
// utils
import { fShortenNumber } from 'utils/formatNumber';
// components

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
}));

// ----------------------------------------------------------------------

AppWidgetSummary.propTypes = {
  color: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  //total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, Icon, text, color = 'primary', sx, ...other }) {
  return (
    <Paper elevation={6}>

      <Card
        sx={{
          py: 5,
          boxShadow: 0,
          textAlign: 'center',
          color: (theme) => darken(theme.palette[color].main, 0.4),
          bgcolor: (theme) => lighten(theme.palette[color].main, 0.4),
          ...sx,
        }}
        {...other}
      >
        <IconWrapperStyle
          sx={{
            color: (theme) => theme.palette[color].dark,
            backgroundImage: (theme) =>
              `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0)} 0%, ${darken(theme.palette[color].dark, 0.25)} 100%)`,
          }}
        >
          {Icon && <Icon sx={{ color: '#fff', fontSize: '3rem' }} />}
        </IconWrapperStyle>

        <Typography variant="h4">{text ? text : fShortenNumber(total)}</Typography>

        <Typography variant="h6">
          {title}
        </Typography>
      </Card>
    </Paper>
  );
}
