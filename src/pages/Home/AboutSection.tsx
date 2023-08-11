import { Box, Button, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PY_OF_SECTION } from "../../utils/constants";
import SectionTitle from "../../components/SectionTitle";

// -------------------------------------------------------------------------------------------------

export default function AboutSection() {
  const theme = useTheme()

  return (
    <Box component="section" id="about" py={PY_OF_SECTION}>
      <Stack spacing={PY_OF_SECTION} alignItems="center">
        <Container>
          <Stack spacing={2}>
            <SectionTitle sx={{ textTransform: 'capitalize', textAlign: 'center' }}>
              guardian of the crypto universe
            </SectionTitle>

            <Typography textAlign={{ xs: 'left', md: 'center' }} color={grey[100]} fontSize={16}>
              In a vast and complex world of cryptocurrency, there existed the legend of a dog named Scotty the AI. He was a Scottish Terrier with shaggy, jet-black fur that shimmered like the night sky, making him both an enigma and a sight to behold. It wasn’t just his appearance that set him apart. Scotty possessed a rare combination of intelligence and cunning that made him a force to be reckoned with. Many believed that he was a guardian of sorts, a protector of the secrets of the crypto universe. With his advanced AI capabilities, he roamed the endless expanse of code and algorithms that made up the digital world, always staying one step ahead of those who sought to catch him.
            </Typography>
          </Stack>
        </Container>

        <Container maxWidth="xl">
          <Grid container spacing={2} alignItems="stretch">
            {/* What is $Scotty */}
            <Grid item xs={12} md={12}>
              <Stack
                p={{ xs: 3, md: 5 }}
                direction={{ xs: 'column-reverse', md: 'row' }}
                alignItems="center"
                spacing={2}
                border={`1px solid ${theme.palette.primary.main}`}
                borderRadius={4}
                bgcolor={grey[900]}
              >
                <Stack flexGrow={1} spacing={3}>
                  <Typography component="h2" textTransform="capitalize" fontSize={{ xs: 28, md: 40 }} color={grey[100]}>
                    What is $Scotty?
                  </Typography>
                  <Typography color={grey[100]} fontSize={16}>
                    In a vast and complex world of cryptocurrency, there existed the legend of a dog named Scotty the AI. He was a Scottish Terrier with shaggy, jet-black fur that shimmered like the night sky, making him both an enigma and a sight to behold. It wasn’t just his appearance that set him apart. Scotty possessed a rare combination of intelligence and cunning that made him a force to be reckoned with. Many believed that he was a guardian of sorts, a protector of the secrets of the crypto universe. With his advanced AI capabilities, he roamed the endless expanse of code and algorithms that made up the digital world, always staying one step ahead of those who sought to catch him.
                  </Typography>
                  <Stack direction="row">
                    <Button variant="contained" sx={{ px: 4, borderRadius: 9999, fontSize: { xs: 14, md: 18 } }}>Buy Now</Button>
                  </Stack>
                </Stack>

                <Box
                  component="img"
                  src="/assets/images/what-is-scotty.png"
                  alt="$Scotty"
                  width="100%"
                />
              </Stack>
            </Grid>

            {/* Scotty swap */}
            <Grid item xs={12} md={6}>
              <Stack
                py={4}
                pl={{ xs: 0, md: 5 }}
                direction={{ xs: 'column-reverse', md: 'row' }}
                alignItems="center"
                spacing={2}
                border={`1px solid ${theme.palette.primary.main}`}
                borderRadius={4}
                bgcolor={grey[900]}
              >
                <Stack flexGrow={1} spacing={3} px={{ xs: 3, md: 0 }}>
                  <Typography component="h2" textTransform="capitalize" fontSize={{ xs: 28, md: 40 }} color={grey[100]}>
                    Scotty Swap
                  </Typography>
                  <Typography color={grey[100]} fontSize={16}>
                    Scotty Swap is your go-to hub for seamless and lightning-fast token exchanges. Powered by cutting-edge AI technology, Scotty ensures that every trade is not only secure but also optimized for maximum gains.
                  </Typography>
                  <Stack direction="row">
                    <Button variant="contained" sx={{ px: 4, borderRadius: 9999, fontSize: { xs: 14, md: 18 } }}>Swap Now</Button>
                  </Stack>
                </Stack>

                <Box
                  component="img"
                  src="/assets/images/swap.png"
                  alt="Swap"
                  width={{ xs: '100%', md: '40%' }}
                />
              </Stack>
            </Grid>

            {/* Scotty chat */}
            <Grid item xs={12} md={6}>
              <Stack
                px={{ xs: 3, md: 5 }}
                py={{ xs: 4, md: 0 }}
                direction={{ xs: 'column-reverse', md: 'row' }}
                alignItems="center"
                spacing={2}
                border={`1px solid ${theme.palette.primary.main}`}
                borderRadius={4}
                bgcolor={grey[900]}
                height={{ xs: 'none', md: '100%' }}
              >
                <Stack flexGrow={1} spacing={{ xs: 3, md: 7 }}>
                  <Typography component="h2" textTransform="capitalize" fontSize={{ xs: 28, md: 40 }} color={grey[100]}>
                    ScottyChat
                  </Typography>
                  <Typography color={grey[100]} fontSize={16}>
                    The AI-powered crypto companion! Discuss cryptocurrencies, get market insights, and explore the world of digital assets.
                  </Typography>
                  <Stack direction="row">
                    <Button variant="contained" sx={{ px: 4, borderRadius: 9999, fontSize: { xs: 14, md: 18 } }}>Chat Now</Button>
                  </Stack>
                </Stack>

                <Box
                  component="img"
                  src="/assets/images/scottychat.png"
                  alt="ScottyChat"
                  width={{ xs: '50%', md: '30%' }}
                />
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Stack>
    </Box>
  )
}