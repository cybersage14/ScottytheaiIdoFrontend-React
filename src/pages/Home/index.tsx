import { lazy } from 'react'
import { Box } from '@mui/material'

// ----------------------------------------------------------------------------------------------

const AboutSection = lazy(() => import('./AboutSection'))
const TokenSaleSection = lazy(() => import('./TokenSaleSection'))

// ----------------------------------------------------------------------------------------------

export default function Home() {
  return (
    <Box>
      <AboutSection />
      <TokenSaleSection />
    </Box>
  )
}