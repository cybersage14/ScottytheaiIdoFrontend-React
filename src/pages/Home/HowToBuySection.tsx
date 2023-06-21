import { Box, Container, Grid, LinearProgress, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { SectionTitle } from "../../components/styledComponents";

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

export default function HowToBuySection() {
  const theme = useTheme()

  return (
    <Box component="section" py={12}>
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* How to buy */}
        <Box>
          <SectionTitle variant="h2" textAlign="center">How to Buy?</SectionTitle>

          <Stack spacing={3}>
            {FAQS.map(faqItem => (
              <Stack key={faqItem.id} spacing={1}>
                <Typography variant="h3" color={theme.palette.primary.main} fontSize={24}>{faqItem.question}</Typography>
                <Typography color={grey[100]} fontSize={15} lineHeight={2}>{faqItem.answer}</Typography>
              </Stack>
            ))}
          </Stack>
        </Box>

        {/* Supply */}
        <Stack spacing={4}>
          <SectionTitle variant="h2" textAlign="center">
            Supply is <Typography component="span" fontWeight={700} variant="inherit">1,234,567,890</Typography>
          </SectionTitle>

          <Box>
            <Grid container spacing={8} alignItems="center">
              <Grid item md={4}>
                <Stack alignItems="center">
                  <Typography component="span" fontWeight={700} fontSize={48} color={grey[100]}>90%</Typography>
                  <Typography fontSize={14} color={grey[100]}>Supply to Liquidity Pool = 1111111101</Typography>
                </Stack>
              </Grid>

              <Grid item md={4}>
                <LinearProgress
                  value={90}
                  variant="determinate"
                  sx={{ height: 56, borderRadius: 9999 }}
                />
              </Grid>

              <Grid item md={4}>
                <Stack alignItems="center">
                  <Typography component="span" fontWeight={700} fontSize={48} color={grey[100]}>10%</Typography>
                  <Typography fontSize={14} color={grey[100]}>Supply for Exchange Listings = 123456789</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Stack>

        <Grid container>
          <Grid item md={6}>
            <Stack alignItems="center" spacing={4}>
              <Typography color={grey[100]} fontSize={28} fontWeight={700}>Liquidity Keys Burned Forever</Typography>
              <Typography color={theme.palette.primary.main} fontSize={28} fontWeight={700}>ERC20</Typography>
            </Stack>
          </Grid>
          <Grid item md={6}>
            <Stack alignItems="center" spacing={4}>
              <Typography color={theme.palette.primary.main} fontSize={28} fontWeight={700}>Contract Renounced</Typography>
              <Typography color={grey[100]} fontSize={28} fontWeight={700}>No Team Tokens</Typography>
            </Stack>
          </Grid>
        </Grid>

      </Container>
    </Box>
  )
}