import { Box, Container, Grid, Stack, Typography, Icon as MuiIcon, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Icon } from '@iconify/react';
import SectionTitle from "../../components/SectionTitle";

// ----------------------------------------------------------------------------------------------

interface IText {
  id: number;
  text: string;
}

// ----------------------------------------------------------------------------------------------

const TEXTS_OF_PHASE_1: Array<IText> = [
  {
    id: 1,
    text: 'Scotty Community Launch'
  },
  {
    id: 2,
    text: 'Scotty AI Contract Audit'
  },
  {
    id: 3,
    text: 'Token Generation'
  },
  {
    id: 4,
    text: '$Scotty takes on the high road with a robust marketing campaign.'
  },
  {
    id: 5,
    text: 'Presale Launch'
  }
]

const TEXTS_OF_PHASE_2: Array<IText> = [
  {
    id: 1,
    text: 'Scotty Swap Launch'
  },
  {
    id: 2,
    text: 'Chat With Scotty Beta'
  },
  {
    id: 3,
    text: 'Blockchain Takeover'
  },
  {
    id: 4,
    text: 'Scotty Awareness Campaign'
  },
  {
    id: 5,
    text: 'Scotty Picks Beta'
  }
]

const TEXTS_OF_PHASE_3: Array<IText> = [
  {
    id: 1,
    text: 'Token Listings: Launch $Scotty token on popular DEXs with ample liquidity and accessibility. Public Launch of $Scotty'
  },
  {
    id: 2,
    text: 'CEX Listings'
  },
  {
    id: 3,
    text: 'Community Partnerships Scotty Times digital newsletter'
  },
  {
    id: 4,
    text: 'CoinGecko/Coinmarketcap Listings'
  },
  {
    id: 5,
    text: 'Uniswap & Bitmart Listing'
  }
]

// ----------------------------------------------------------------------------------------------

export default function PlanSection() {
  const theme = useTheme()

  return (
    <Box component="section" bgcolor="#222222" py={{ xs: 6, md: 12 }}>
      <Container id="plans">
        <SectionTitle variant="h2" sx={{ textAlign: 'center' }}>Scotty AI's Plan</SectionTitle>

        <Box mt={{ xs: 2, md: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: grey[800] }} height="100%">
                <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
                  <Typography component="h3" color={grey[100]} textAlign="center" fontSize={{ xs: 24, md: 32 }} fontWeight={700}>Phase 1</Typography>
                  <Stack spacing={2} mt={2}>
                    {TEXTS_OF_PHASE_1.map(textItem => (
                      <Stack key={textItem.id} direction="row" spacing={2}>
                        <MuiIcon component={Icon} icon="formkit:radio" sx={{ fontSize: 12, color: theme.palette.primary.main, mt: 1 }} />
                        <Typography fontSize={{ xs: 16, md: 18 }} color={grey[100]}>{textItem.text}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box sx={{ bgcolor: grey[800] }} height="100%">
                <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
                  <Typography component="h3" textAlign="center" fontSize={{ xs: 24, md: 32 }} fontWeight={700} color={grey[100]}>Phase 2</Typography>
                  <Stack spacing={2} mt={2}>
                    {TEXTS_OF_PHASE_2.map(textItem => (
                      <Stack key={textItem.id} direction="row" spacing={2}>
                        <MuiIcon component={Icon} icon="formkit:radio" sx={{ fontSize: 12, color: theme.palette.primary.main, mt: 1 }} />
                        <Typography fontSize={{ xs: 16, md: 18 }} color={grey[100]}>{textItem.text}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box bgcolor={theme.palette.primary.main}>
                <Box sx={{ py: 6, px: { xs: 2, md: 4 } }}>
                  <Typography component="h3" textAlign="center" fontSize={{ xs: 24, md: 32 }} fontWeight={700}>Phase 3</Typography>
                  <Stack spacing={2} mt={2}>
                    {TEXTS_OF_PHASE_3.map(textItem => (
                      <Stack key={textItem.id} direction="row" spacing={2}>
                        <MuiIcon component={Icon} icon="formkit:radio" sx={{ fontSize: 12, color: grey[100], mt: 1 }} />
                        <Typography fontSize={{ xs: 16, md: 18 }}>{textItem.text}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}