// @mui
import PropTypes from 'prop-types';
import { alpha, styled } from '@mui/material/styles';
import { Card, lighten, SvgIcon, Typography } from '@mui/material';
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
  total: PropTypes.number.isRequired,
  sx: PropTypes.object,
};

export default function AppWidgetSummary({ title, total, icon, text,color = 'primary', sx, ...other }) {
  return (
    <Card
      sx={{
        py: 5,
        boxShadow: 0,
        textAlign: 'center',
        color: (theme) => theme.palette[color].dark,
        bgcolor: (theme) => lighten(theme.palette[color].light,0.6),
        ...sx,
      }}
      {...other}
    >
      <IconWrapperStyle
        sx={{
          color: (theme) => theme.palette[color].dark,
          backgroundImage: (theme) =>
            `linear-gradient(135deg, ${alpha(theme.palette[color].dark, 0.06)} 0%, ${alpha(
              theme.palette[color].dark,
              0.44
            )} 100%)`,
        }}
      >
        <SvgIcon component={icon} width={24} height={24} />
      </IconWrapperStyle>

      <Typography variant="h4">{text ? text : fShortenNumber(total)}</Typography>

      <Typography variant="h6">
        {title}
      </Typography>
    </Card>
  );
}
