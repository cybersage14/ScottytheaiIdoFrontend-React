import { lazy } from 'react'
import { useTheme, Stack, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

// --------------------------------------------------------------------------------------------------

const Header = lazy(() => import('./Header'))

// --------------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()

  return (
    <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
      <Header />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  )
}