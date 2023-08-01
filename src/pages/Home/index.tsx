import { lazy } from 'react'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------------------------------

// const AboutSection = lazy(() => import('./AboutSection'))
const TokenSaleSection2 = lazy(() => import('./TokenSaleSection2'))
const AdventureSection = lazy(() => import('./AdventureSection'))
const CompanionsSection = lazy(() => import('./CompanionsSection'))
const HowToBuySection = lazy(() => import('./HowToBuySection'))
const PlanSection = lazy(() => import('./PlanSection'))
const CommunitySection = lazy(() => import('./CommunitySection'))

// ----------------------------------------------------------------------------------------------

export default function Home() {
  return (
    <Box>
      {/* <Container id="about" sx={{ mt: { xs: 6, md: 12 } }}>
        <Grid container spacing={12}>
          <Grid item xs={12} md={6}>
            <AboutSection />
          </Grid>
          <Grid item xs={12} md={6}>
            <TokenSaleSection />
          </Grid>
        </Grid>

        <Typography fontSize={15} color={grey[100]} lineHeight={{ xs: 'none', md: 2 }} textAlign={{ xs: 'justify', md: 'start' }} mt={4}>
          In a vast and complex world of cryptocurrency, there existed the legend of a dog named Scotty the AI. He was a Scottish Terrier with shaggy, jet-black fur that shimmered like the night sky, making him both an enigma and a sight to behold. It wasn’t just his appearance that set him apart. Scotty possessed a rare combination of intelligence and cunning that made him a force to be reckoned with. Many believed that he was a guardian of sorts, a protector of the secrets of the crypto universe. With his advanced AI capabilities, he roamed the endless expanse of code and algorithms that made up the digital world, always staying one step ahead of those who sought to catch him.
        </Typography>
      </Container> */}
      <TokenSaleSection2 />
      <AdventureSection />
      <CompanionsSection />
      <HowToBuySection />
      <PlanSection />
      <CommunitySection />
    </Box>
  )
}