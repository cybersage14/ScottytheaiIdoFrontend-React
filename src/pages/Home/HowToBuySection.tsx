import { Box, Container, Grid, LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Icon } from "@iconify/react";
import SectionTitle from "../../components/SectionTitle";

// -------------------------------------------------------------------------------------------------------

interface IFaq {
  id: number;
  question: string;
  answer: string;
}

// -------------------------------------------------------------------------------------------------------

const FAQS: Array<IFaq> = [
  {
    id: 1,
    question: 'Create a Wallet',
    answer: 'Download metamask or your wallet of choice from the app store or google play store for free. Desktop users, download the google chrome extension by going to metamask.io.'
  },
  {
    id: 2,
    question: 'Get Some ETH',
    answer: 'Have ETH in your wallet to switch to $SCOTTY. If you don’t have any ETH, you can buy directly on metamask, transfer from another wallet, or buy on another exchange and send it to your wallet.'
  },
  {
    id: 3,
    question: 'Go to Uniswap',
    answer: 'Connect to Uniswap. Go to app.uniswap.org in google chrome or on the browser inside your Metamask app. Connect your wallet. Paste the $SCOTTY token address into Uniswap, select Scotty, and confirm. When Metamask prompts you for a wallet signature, sign.'
  },
  {
    id: 4,
    question: 'Switch ETH for $SCOTTY',
    answer: 'Switch ETH for $SCOTTY. We have ZERO taxes so you don’t need to worry about buying with a specific slippage, although you may need to use slippage during times of market volatility.'
  }
]

// -------------------------------------------------------------------------------------------------------

const TOKENOMICS = [
  {
    id: 1,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 2,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 3,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 4,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 5,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 6,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 7,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 8,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 9,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  },
  {
    id: 10,
    label: 'Public Pool 30%',
    tokenAmount: '3,000,000,000'
  }
]

// -------------------------------------------------------------------------------------------------------

export default function HowToBuySection() {
  const theme = useTheme()

  return (
    <Box component="section" py={{ xs: 6, md: 12 }}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 8, md: 16 } }}>
        {/* How to buy */}
        <Box>
          <SectionTitle variant="h2" sx={{ textAlign: 'center' }}>How to Buy?</SectionTitle>

          <Stack spacing={3} sx={{ mt: { xs: 1, md: 0 } }}>
            {FAQS.map(faqItem => (
              <Stack key={faqItem.id} spacing={1}>
                <Typography component="h3" color={theme.palette.primary.main} fontSize={24}>{faqItem.question}</Typography>
                <Typography color={grey[100]} fontSize={15} lineHeight={2}>{faqItem.answer}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Supply */}
        <Stack spacing={4}>
          <SectionTitle variant="h2" sx={{ textAlign: 'center' }}>
            Supply is <Typography component="span" fontWeight={700} variant="inherit">1,234,567,890</Typography>
          </SectionTitle>

          <Box>
            <Grid container spacing={{ xs: 4, md: 8 }} alignItems="center">
              <Grid item xs={12} md={4}>
                <Stack alignItems="center">
                  <Typography component="span" fontWeight={700} fontSize={{ xs: 32, md: 48 }} color={grey[100]}>90%</Typography>
                  <Typography fontSize={14} color={grey[100]}>Supply to Liquidity Pool = 1111111101</Typography>
                </Stack>
              </Grid>

              <Grid item xs={12} md={4}>
                <LinearProgress
                  value={90}
                  variant="determinate"
                  sx={{ height: 56, borderRadius: 9999 }}
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <Stack alignItems="center">
                  <Typography component="span" fontWeight={700} fontSize={{ xs: 32, md: 48 }} color={grey[100]}>10%</Typography>
                  <Typography fontSize={14} color={grey[100]} textAlign="center">Supply for Exchange Listings = 123456789</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Box>
          <Grid container alignItems="center" spacing={8}>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/assets/images/tokenomics.png"
                alt="Tokenomics"
                width="70%"
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <SectionTitle sx={{ textAlign: { xs: 'center', md: 'left' } }}>Tokenomics</SectionTitle>
                <Box>
                  <Grid container spacing={4}>
                    {TOKENOMICS.map(tokenomic => (
                      <Grid key={tokenomic.id} item xs={12} md={6}>
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <Box component={Icon} icon="mdi:paw" sx={{ fontSize: 36, color: theme.palette.primary.main }} />
                          <Stack>
                            <Typography component="span" color={grey[100]} fontSize={16}>{tokenomic.label}</Typography>
                            <Typography component="span" color={theme.palette.primary.main} fontSize={16}>{tokenomic.tokenAmount}</Typography>
                          </Stack>
                        </Stack>
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}