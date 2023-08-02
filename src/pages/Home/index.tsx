import { lazy } from 'react'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------------------------------

const AboutSection = lazy(() => import('./AboutSection'))
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
      <TokenSaleSection2 />
      <AboutSection />
      <AdventureSection />
      <CompanionsSection />
      <HowToBuySection />
      {/* <PlanSection /> */}
      {/* <Box
        component="img"
        src="/assets/images/rockets.png"
        width="100%"
      /> */}
      {/* <CommunitySection /> */}
    </Box>
  )
}