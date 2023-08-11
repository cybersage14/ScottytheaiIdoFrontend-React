import { Box } from '@mui/material'
import TokenSaleSection from './TokenSaleSection'
import AboutSection from './AboutSection'
import AdventureSection from './AdventureSection'
import CompanionsSection from './CompanionsSection'
import SupplySection from './SupplySection'
import PlanSection from './PlanSection'
import CommunitySection from './CommunitySection'
import HowToBuySection from './HowToBuySection'

// ----------------------------------------------------------------------------------------------

export default function Home() {
  return (
    <Box>
      <TokenSaleSection />
      <AboutSection />
      <AdventureSection />
      <CompanionsSection />
      <SupplySection />
      <PlanSection />
      <HowToBuySection />
      <CommunitySection />
    </Box>
  )
}