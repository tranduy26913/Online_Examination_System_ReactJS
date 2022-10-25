import { styled } from "@mui/material";
export default styled((theme) => ({
  toolbarMargin: {
    transition: 'transform 50ms,box-shadow 1s',
    '&:hover': {
      transform: 'scale(1.02) perspective(0px)',
      boxShadow: theme.shadows[4]
    }
  }
}));