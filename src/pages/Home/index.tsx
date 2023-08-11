import { Box } from '@mui/material'
import TokenSaleSection from './TokenSaleSection'
import AboutSection from './AboutSection'
import AdventureSection from './AdventureSection'
import CompanionsSection from './CompanionsSection'
import HowToBuySection from './HowToBuySection'
import PlanSection from './PlanSection'
import CommunitySection from './CommunitySection'

// ----------------------------------------------------------------------------------------------

export default function Home() {
  return (
    <Box>
      <TokenSaleSection />
      <AboutSection />
      <AdventureSection />
      <CompanionsSection />
      <HowToBuySection />
      <PlanSection />
      <CommunitySection />
    </Box>
  )
}