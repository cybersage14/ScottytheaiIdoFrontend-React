import { useState, useEffect } from 'react'
import { useTheme, Stack, Box, useMediaQuery, Drawer, List, MenuItem, Link } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Outlet } from 'react-router-dom'
import useInitLoading from '../../hooks/useInitLoading'
import InitLoading from '../../components/InitLoading'
import Topbar from './Topbar'
import Header from './Header'
import Footer from './Footer'
import MobileNavbar from './MobileNavbar'
import { SCROLL_LINKS, THIRD_PARTY_LINKS } from '../../utils/constants'
import { Link as ScrollLink } from 'react-scroll'

// --------------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()
  const { isLoading: isInitLoading } = useInitLoading()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false)

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpened(false)
    }
  }, [isMobile])

  return (
    <>
      {isInitLoading ? (
        <InitLoading />
      ) : (
        <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
          <Topbar />
          <Header />
          {isMobile ? <MobileNavbar setMobileMenuOpened={setMobileMenuOpened} /> : <></>}
          <Box flexGrow={1}>
            <Outlet />
          </Box>
          <Footer />
        </Stack>
      )}
      <Drawer
        open={mobileMenuOpened}
        onClose={() => setMobileMenuOpened(false)}
      >
        <Stack spacing={4} maxWidth={240} height="100%" p={2} bgcolor={grey[900]}>
          <Box
            component="img"
            src="/assets/images/hero-logo.png"
            alt="Logo"
            width="90%"
          />
          <List>
            {SCROLL_LINKS.map(scrollLink => (
              <MenuItem
                key={scrollLink.id}
                sx={{ fontSize: 16 }}
              >
                <ScrollLink
                  to={scrollLink.to}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                >
                  {scrollLink.label}
                </ScrollLink>
              </MenuItem>
            ))}
            {THIRD_PARTY_LINKS.map(thirdPartyLink => (
              <MenuItem
                key={thirdPartyLink.id}
                component={Link}
                href={thirdPartyLink.href}
                target="_blank"
                sx={{ fontSize: 16 }}
              >
                {thirdPartyLink.label}
              </MenuItem>
            ))}
          </List>
        </Stack>
      </Drawer>
    </>
  )
}