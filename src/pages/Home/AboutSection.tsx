import { Box, Button, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import SectionTitle from "../../components/SectionTitle";

// -------------------------------------------------------------------------------------------------

export default function AboutSection() {
  const theme = useTheme()
  return (
    <Box component="section">
      <Typography fontSize={14} color={theme.palette.primary.main} letterSpacing={{ xs: 0, md: 2 }}>
        GUARDIAN OF THE CRYPTO UNIVERSE
      </Typography>
      <SectionTitle sx={{ my: 1 }}>Scotty the AI</SectionTitle>
      <Box
        component="img"
        src="/assets/images/scotty-dog.webp"
        alt=""
        width="90%"
        borderRadius={9999}
        my={2}
      />
      <Typography fontSize={15} color={grey[100]} lineHeight={{ xs: 'none', md: 2 }} textAlign={{ xs: 'justify', md: 'start' }}>
        Join the future of AI-powered technology today and sign up for Scotty.
      </Typography>
      <Button variant="contained" sx={{ borderRadius: 9999, fontSize: 16, px: 4, mt: 4 }}>Learn More</Button>
    </Box>
  )
}