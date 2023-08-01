import { lazy } from 'react'
import { useTheme, Stack, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'

// --------------------------------------------------------------------------------------------------

const Navbar = lazy(() => import('./Navbar'))
const Header = lazy(() => import('./Header'))
const Footer = lazy(() => import('./Footer'))

// --------------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()

  return (
    <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
      <Navbar />
      <Header />
      <Box flexGrow={1}>
        <Outlet />
      </Box>
      <Footer />
    </Stack>
  )
}