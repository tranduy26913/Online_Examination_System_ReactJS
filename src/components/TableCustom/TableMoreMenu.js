import { useRef, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from 'react-router-dom'

// ----------------------------------------------------------------------

export default function UserMoreMenu({ menu,id }) {
  const ref = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <MoreVertIcon width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {
          menu.map((item,index) => {
            if (item.isLink) {
              return (
                <Link to={item.link} key={index}>
                  <MenuItem sx={{ color: 'text.secondary' }}>
                    <ListItemIcon>
                      <item.icon width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={item.display} primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
                </Link>
              )
            }
            else
              return (
                <MenuItem key={index} sx={{ color: 'text.secondary' }} onClick={()=>item.func(id)}>
                    <ListItemIcon>
                      <item.icon width={24} height={24} />
                    </ListItemIcon>
                    <ListItemText primary={item.display} primaryTypographyProps={{ variant: 'body2' }} />
                  </MenuItem>
              )
          }
          )
        }


        {/* <MenuItem sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <EditIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem component={RouterLink} to="#" sx={{ color: 'text.secondary' }}>
          <ListItemIcon>
            <DeleteForeverIcon width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xoá" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem> */}
      </Menu>
    </>
  );
}
