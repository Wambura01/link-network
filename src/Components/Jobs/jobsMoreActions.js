import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

import { Menu, IconButton } from "@mui/material";
import CloseJob from "./closeJob";

export default function JobsMoreMenu({ jobId }) {
  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <IconButton ref={ref} onClick={() => setOpen(true)}>
        <MoreVertOutlinedIcon width={20} height={20} />
      </IconButton>
      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { width: 200, maxWidth: "100%" },
        }}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <CloseJob jobId={jobId} />
      </Menu>
      <Outlet />
    </>
  );
}
