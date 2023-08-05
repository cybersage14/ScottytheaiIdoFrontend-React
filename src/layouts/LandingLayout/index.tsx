import { useTheme, Stack, Box } from '@mui/material'
import { Outlet } from 'react-router-dom'
import useInitLoading from '../../hooks/useInitLoading'
import InitLoading from '../../components/InitLoading'
import Topbar from './Topbar'
import Header from './Header'
import Footer from './Footer'

// --------------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()
  const { isLoading: isInitLoading } = useInitLoading()
  return (
    <>
      {isInitLoading ? (
        <InitLoading />
      ) : (
        <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
          <Topbar />
          <Header />
          <Box flexGrow={1}>
            <Outlet />
          </Box>
          <Footer />
        </Stack>
      )}
    </>
  )
}