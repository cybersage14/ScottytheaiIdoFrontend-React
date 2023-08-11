import { useState, useEffect } from 'react'
import { useTheme, Stack, Box, useMediaQuery, Drawer, List, MenuItem, Link, Container } from '@mui/material'
import { grey } from '@mui/material/colors'
import { Outlet } from 'react-router-dom'
import { Link as ScrollLink } from 'react-scroll'
import useInitLoading from '../../hooks/useInitLoading'
import InitLoading from '../../components/InitLoading'
import Topbar from './Topbar'
import Header from './Header'
import Footer from './Footer'
import MBNavbar from './MBNavbar'
// import DPNavbar from './DPNavbar'
import { SCROLL_LINKS, THIRD_PARTY_LINKS } from '../../utils/constants'

// --------------------------------------------------------------------------------------------------

export default function LandingLayout() {
  const theme = useTheme()
  const { isLoading: isInitLoading } = useInitLoading()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const [mobileMenuOpened, setMobileMenuOpened] = useState<boolean>(false)
  const [navbarVisible, setNavbarVisible] = useState<boolean>(false)

  useEffect(() => {
    if (!isMobile) {
      setMobileMenuOpened(false)
    }
  }, [isMobile])

  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop;
    if (scrolled > 770) {
      setNavbarVisible(true)
    } else {
      setNavbarVisible(false)
    }
  });

  return (
    <>
      {isInitLoading ? (
        <InitLoading />
      ) : (
        <Stack sx={{ minHeight: '100vh' }} bgcolor={theme.palette.background.default}>
          <Topbar />
          {isMobile ? (
            <Box component="nav" bgcolor="black" py={2} position="relative" zIndex={20}>
              <Container>
                <Stack component="nav" direction="row" justifyContent="end" alignItems="center">
                  {/* <Box
                    component="img"
                    src="/assets/images/hero-logo.png"
                    alt="Logo"
                    width="50%"
                  /> */}

                  <Box pt={1} px={1} borderRadius={1} bgcolor={grey[900]} onClick={() => setMobileMenuOpened(true)}>
                    <Box
                      component="img"
                      src="/assets/images/mobile-menu-icon.png"
                    />
                  </Box>
                </Stack>
              </Container>
            </Box>
          ) : (
            <></>
          )}
          <Header />
          {navbarVisible ? isMobile ? (
            <MBNavbar setMobileMenuOpened={setMobileMenuOpened} />
          ) : (
            // <DPNavbar />
            <></>
          ) : (
            <></>
          )}
          <Box flexGrow={1}>
            <Outlet />
          </Box>
          <Footer />
        </Stack>
      )}

      {/* Mobile Menu */}
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