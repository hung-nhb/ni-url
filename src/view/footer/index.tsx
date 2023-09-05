// ** Import Next
import Link from "next/link"

// ** Import MUI
import { Grid } from "@mui/material"

const Footer = () => {
  return (
    <Grid container spacing={2} component="footer">
      <Grid item container xs={12} justifyContent="center">
        Made with ❤️ by&nbsp;
        <Link href="https://linkedin.hungnhb.dev">
          Hùng Nguyễn Hoàng Bảo
        </Link>
      </Grid>
      <Grid item container xs={12} justifyContent="center">
        Contact me:&nbsp;
        <Link href="mailto:niurl@hungnhb.dev">
          niurl@hungnhb.dev
        </Link>
      </Grid>
    </Grid>
  )
}

export default Footer