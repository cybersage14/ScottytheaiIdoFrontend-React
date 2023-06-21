import { Box, Container, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import SectionTitle from "../../components/SectionTitle";

// -----------------------------------------------------------------------------------------------------

interface IImage {
  id: number;
  src: string;
  alt: string;
}

// -----------------------------------------------------------------------------------------------------

const IMAGES: Array<IImage> = [
  {
    id: 1,
    src: '/assets/images/white-uniswap.webp',
    alt: 'Uniswap'
  },
  {
    id: 2,
    src: '/assets/images/coinmarketcap-logo.webp',
    alt: 'CoinMarketCap'
  },
  {
    id: 3,
    src: '/assets/images/etherium-logo.webp',
    alt: 'Ethereum'
  },
  {
    id: 4,
    src: '/assets/images/coingecko-logo.webp',
    alt: 'CoinGecko'
  }
]

// -----------------------------------------------------------------------------------------------------

export default function CompanionsSection() {
  return (
    <Box component="section" bgcolor={grey[900]} py={8}>
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: { xs: 4, md: 8 } }}>
        <SectionTitle variant="h2" sx={{ textAlign: { xs: 'center', md: 'start' } }}>Scotty AI's Companions</SectionTitle>
        <Grid container spacing={{ xs: 2, md: 8 }}>
          {IMAGES.map(imageItem => (
            <Grid key={imageItem.id} item xs={6} md={3}>
              <Box
                component="img"
                src={imageItem.src}
                alt={imageItem.alt}
                width="100%"
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}