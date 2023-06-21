import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

// ---------------------------------------------------------------------------------------------

export default function Footer() {
  return (
    <Box component="footer" bgcolor={grey[900]}>
      <Container>
        <Typography textAlign="center" color={grey[100]} fontSize={{ xs: 12, md: 14 }} py={3}>
          © {new Date().getFullYear()} by Scotty Ai. All rights reserved!
        </Typography>
      </Container>
    </Box>
  )
}