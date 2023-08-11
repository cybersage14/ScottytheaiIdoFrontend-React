import { Box, Stack, Typography, useTheme, Container } from "@mui/material";
import { grey } from "@mui/material/colors";
import SectionTitle from "../../components/SectionTitle";
import { PY_OF_SECTION } from "../../utils/constants";

//  -----------------------------------------------------------------------------------------------------

const FAQS = [
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

//  -----------------------------------------------------------------------------------------------------

export default function HowToBuySection() {
  const theme = useTheme()

  return (
    <Box bgcolor="#111111" py={PY_OF_SECTION}>
      <Container>
        <SectionTitle variant="h2" sx={{ textAlign: 'center' }}>How to Buy?</SectionTitle>

        <Stack spacing={4} sx={{ mt: { xs: 2, md: 4 } }}>
          {FAQS.map(faqItem => (
            <Stack key={faqItem.id} spacing={1}>
              <Typography component="h3" color={theme.palette.primary.main} fontSize={24}>{faqItem.question}</Typography>
              <Typography color={grey[100]} fontSize={15} lineHeight={2}>{faqItem.answer}</Typography>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Box>
  )
}