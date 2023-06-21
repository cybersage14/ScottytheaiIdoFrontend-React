import { Box, Container, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

// ---------------------------------------------------------------------------------------------

export default function Footer() {
  return (
    <Box component="footer">
      <Container>
        <Typography textAlign="center" color={grey[100]} fontSize={14} py={3}>
          © {new Date().getFullYear()} by Scotty Ai. All rights reserved!
        </Typography>
      </Container>
    </Box>
  )
}