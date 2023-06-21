import { lazy } from 'react'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------------------------------

const AboutSection = lazy(() => import('./AboutSection'))
const TokenSaleSection = lazy(() => import('./TokenSaleSection'))
const AdventureSection = lazy(() => import('./AdventureSection'))
const CompanionsSection = lazy(() => import('./CompanionsSection'))
const HowToBuySection = lazy(() => import('./HowToBuySection'))
const PlanSection = lazy(() => import('./PlanSection'))
const CommunitySection = lazy(() => import('./CommunitySection'))

// ----------------------------------------------------------------------------------------------

export default function Home() {
  return (
    <Box>
      <AboutSection />
      <TokenSaleSection />
      <AdventureSection />
      <CompanionsSection />
      <HowToBuySection />
      <PlanSection />
      <CommunitySection />
    </Box>
  )
}