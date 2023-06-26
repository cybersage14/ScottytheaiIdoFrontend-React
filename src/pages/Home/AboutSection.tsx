import { Box, Button, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import SectionTitle from "../../components/SectionTitle";

// -------------------------------------------------------------------------------------------------

export default function AboutSection() {
  const theme = useTheme()
  return (
    <Box component="section" py={{ xs: 6, md: 12 }}>
      <Container id="about">
        <Grid container spacing={{ xs: 4, md: 0 }}>
          <Grid item md={6}>
            <Typography fontSize={14} color={theme.palette.primary.main} letterSpacing={{ xs: 0, md: 2 }}>
              GUARDIAN OF THE CRYPTO UNIVERSE
            </Typography>
            <SectionTitle sx={{ my: 1 }}>Scotty the AI</SectionTitle>
            <Stack spacing={{ xs: 1, md: 2 }}>
              <Typography fontSize={15} color={grey[100]} lineHeight={{ xs: 'none', md: 2 }} textAlign={{ xs: 'justify', md: 'start' }}>
                In a vast and complex world of cryptocurrency, there existed the legend of a dog named Scotty the AI. He was a Scottish Terrier with shaggy, jet-black fur that shimmered like the night sky, making him both an enigma and a sight to behold. It wasn’t just his appearance that set him apart. Scotty possessed a rare combination of intelligence and cunning that made him a force to be reckoned with.
              </Typography>
              <Typography fontSize={15} color={grey[100]} lineHeight={{ xs: 'none', md: 2 }} textAlign={{ xs: 'justify', md: 'start' }}>
                Many believed that he was a guardian of sorts, a protector of the secrets of the crypto universe. With his advanced AI capabilities, he roamed the endless expanse of code and algorithms that made up the digital world, always staying one step ahead of those who sought to catch him.
              </Typography>
              <Typography fontSize={15} color={grey[100]} lineHeight={{ xs: 'none', md: 2 }} textAlign={{ xs: 'justify', md: 'start' }}>
                Join the future of AI-powered technology today and sign up for Scotty.
              </Typography>
            </Stack>
            <Button variant="contained" sx={{ borderRadius: 9999, fontSize: 16, px: 4, mt: 4 }}>Learn More</Button>
          </Grid>

          <Grid item md={6} sx={{ display: 'flex', justifyContent: 'end' }}>
            <Box width={{ xs: '100%', md: '90%' }}>
              <Box
                component="img"
                src="/assets/images/scotty-dog.webp"
                alt=""
                width="100%"
                height="fit-content"
                borderRadius={9999}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}