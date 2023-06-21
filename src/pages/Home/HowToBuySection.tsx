import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import { SectionTitle } from "../../components/styledComponents";
import { grey } from "@mui/material/colors";

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
      <Container>
        <SectionTitle textAlign="center">How to Buy?</SectionTitle>

        <Stack spacing={3}>
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