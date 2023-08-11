import { Box, Container, Grid, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import SectionTitle from "../../components/SectionTitle";

// -------------------------------------------------------------------------------------------------------

// interface IFaq {
//   id: number;
//   question: string;
//   answer: string;
// }

// -------------------------------------------------------------------------------------------------------

// const FAQS: Array<IFaq> = [
//   {
//     id: 1,
//     question: 'Create a Wallet',
//     answer: 'Download metamask or your wallet of choice from the app store or google play store for free. Desktop users, download the google chrome extension by going to metamask.io.'
//   },
//   {
//     id: 2,
//     question: 'Get Some ETH',
//     answer: 'Have ETH in your wallet to switch to $SCOTTY. If you don’t have any ETH, you can buy directly on metamask, transfer from another wallet, or buy on another exchange and send it to your wallet.'
//   },
//   {
//     id: 3,
//     question: 'Go to Uniswap',
//     answer: 'Connect to Uniswap. Go to app.uniswap.org in google chrome or on the browser inside your Metamask app. Connect your wallet. Paste the $SCOTTY token address into Uniswap, select Scotty, and confirm. When Metamask prompts you for a wallet signature, sign.'
//   },
//   {
//     id: 4,
//     question: 'Switch ETH for $SCOTTY',
//     answer: 'Switch ETH for $SCOTTY. We have ZERO taxes so you don’t need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility.'
//   }
// ]

// -------------------------------------------------------------------------------------------------------

const TOKENOMICS = [
  {
    id: 1,
    label: 'Private Round',
    tokenAmount: '54,567,890',
    status: 2
  },
  {
    id: 2,
    label: 'Public 1',
    tokenAmount: '150,000,000',
    status: 2
  },
  {
    id: 3,
    label: 'Public 2',
    tokenAmount: '150,000,000',
    status: 2
  },
  {
    id: 4,
    label: 'Public 3',
    tokenAmount: '180,000,000',
    status: 2
  },
  {
    id: 5,
    label: 'Public 4',
    tokenAmount: '200,000,000',
    status: 2
  },
  {
    id: 6,
    label: 'Public 5',
    tokenAmount: '200,000,000',
    status: 2
  },
  {
    id: 7,
    label: 'Exchange Listings',
    tokenAmount: '123,456,789',
    status: 2
  },
  {
    id: 8,
    label: 'Scotty Development',
    tokenAmount: '123,456,789',
    status: 1
  },
  {
    id: 9,
    label: 'Burned by Scotty',
    tokenAmount: '53,086,422',
    status: 0
  }
]

// -------------------------------------------------------------------------------------------------------

export default function SupplySection() {
  const theme = useTheme()

  return (
    <Box component="section" py={{ xs: 6, md: 12 }}>
      <Container maxWidth="xl" sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 16 } }}>
        {/* Supply */}
        <Stack spacing={4}>
          <SectionTitle variant="h2" sx={{ textAlign: 'center' }}>
            Supply is <Typography component="span" fontWeight={700} variant="inherit">1,234,567,890</Typography>
          </SectionTitle>

          <Box>
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={1}>
                  <Typography component="span" fontWeight={700} fontSize={{ xs: 32, md: 48 }} color={grey[100]}>75%</Typography>
                  <Typography fontSize={14} color={grey[100]}>Public Sale = 934,567,890</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack height={48} direction="row" alignItems="stretch" width="100%" bgcolor={grey[900]} borderRadius={9999}>
                  <Box bgcolor={theme.palette.primary.main} width="75%" sx={{ borderTopLeftRadius: 9999, borderBottomLeftRadius: 9999 }} />
                  <Box bgcolor="#DC640C" width="9%" />
                  <Box bgcolor="#793300" width="9%" />
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack alignItems="center" spacing={1}>
                  <Typography component="span" fontWeight={700} fontSize={{ xs: 32, md: 48 }} color={grey[100]}>25%</Typography>
                  <Typography fontSize={14} color={grey[100]} textAlign="center">Exchange Listings, Development & Burn = 123456789</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Box>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }}>
                <Box
                  component="img"
                  src="/assets/images/tokenomics.png"
                  alt="Tokenomics"
                  width="70%"
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={4} alignItems={{ xs: 'center', md: 'start' }}>
                <SectionTitle sx={{ textAlign: { xs: 'center', md: 'left' } }}>Tokenomics</SectionTitle>
                <Box display={{ xs: 'none', md: 'block' }}>
                  <Grid container spacing={4}>
                    {TOKENOMICS.map(tokenomic => (
                      <Grid key={tokenomic.id} item xs={12} md={6}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box
                            component={Icon}
                            icon="mdi:paw"
                            sx={{
                              fontSize: 36,
                              color: tokenomic.status === 2 ? theme.palette.primary.main : tokenomic.status === 1 ? '#793300' : grey[800],
                            }}
                          />
                          <Stack>
                            <Typography component="span" color={grey[100]} fontSize={16}>{tokenomic.label}</Typography>
                            <Typography component="span" color={theme.palette.primary.main} fontSize={16}>{tokenomic.tokenAmount}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>

                <Stack width="fit-content" spacing={3} display={{ xs: 'flex', md: 'none' }}>
                  {TOKENOMICS.map(tokenomic => (
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Box
                        component={Icon}
                        icon="mdi:paw"
                        sx={{
                          fontSize: 36,
                          color: tokenomic.status === 2 ? theme.palette.primary.main : tokenomic.status === 1 ? '#793300' : grey[800],
                        }}
                      />
                      <Stack>
                        <Typography component="span" color={grey[100]} fontSize={16}>{tokenomic.label}</Typography>
                        <Typography component="span" color={theme.palette.primary.main} fontSize={16}>{tokenomic.tokenAmount}</Typography>
                      </Stack>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}