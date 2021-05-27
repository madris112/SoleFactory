import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}))(Badge);

export default function Badges() {
  var badge=JSON.parse(localStorage.getItem(localStorage.getItem("curUser")));
  console.log(badge);
  var len=Object.keys(badge).length;
  return (
    <IconButton aria-label="cart">
      <StyledBadge badgeContent={len} color="secondary" showZero style={{color: "white" , height: "2px"}}>
        <ShoppingCartIcon />
      </StyledBadge>
    </IconButton>
  );
}
