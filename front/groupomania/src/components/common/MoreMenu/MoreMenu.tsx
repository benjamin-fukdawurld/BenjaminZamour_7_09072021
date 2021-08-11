import React from "react";
import IconButton from "@material-ui/core/IconButton";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

interface MenuActionProps {
  label: string;
  onClick?: () => void;
}

interface MenuProps {
  label: string;
  actions: MenuActionProps[];
}

export default function MoreMenu(props: MenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      <IconButton
        aria-controls={props.label}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreHorizIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.actions.map((action: any) => (
          <MenuItem
            key={action.label}
            onClick={() => {
              handleClose();
              if (action.onClick) {
                action.onClick();
              }
            }}
          >
            {action.label}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
