import { Box, Button, Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Link as ScrollLink } from 'react-scroll';
import { Icon } from "@iconify/react";
import { useAccount, useDisconnect, useNetwork, useSwitchNetwork } from "wagmi";
import { useWeb3Modal } from "@web3modal/react";
import { IScrollLink } from "../../utils/interfaces";
import { CHAIN_ID } from "../../utils/constants";

// ---------------------------------------------------------------------------------------------

const SCROLL_LINKS: Array<IScrollLink> = [
  {
    id: 1,
    label: 'About',
    to: 'about'
  },
  {
    id: 2,
    label: 'Adventures',
    to: 'adventures'
  },
  {
    id: 3,
    label: 'Community',
    to: 'community'
  },
  {
    id: 4,
    label: 'Plans',
    to: 'plans'
  }
]

// ---------------------------------------------------------------------------------------------

export default function Header() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const { isConnected, address } = useAccount()
  const { open } = useWeb3Modal()
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()
  const { disconnect } = useDisconnect()

  return (
    <Box component="header" position="relative">
      <Box
        component="video"
        autoPlay
        muted
        loop
        playsInline
        src="/assets/videos/scotty_bg.mp4"
        position="absolute"
        right={0}
        bottom={0}
        minWidth="100%"
        maxWidth="100%"
        minHeight="100%"
        sx={{ objectFit: 'cover' }}
      />

      <Box sx={{ background: 'rgba(0, 0, 0, 0.7)' }} pt={{ xs: 16, md: 24 }} pb={4} position="relative" zIndex={10}>
        <Container maxWidth="lg">
          <Stack alignItems="center" gap={{ xs: 2, md: 24 }}>
            <Box
              component="img"
              src="/assets/images/hero-logo.png"
              alt="ascii-logo"
              position="relative"
              width={{ xs: '90%', md: '60%' }}
            />

            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" width="100%" spacing={{ xs: 2, md: 0 }}>
              {isMobile ? (
                <Grid container spacing={3} direction="row-reverse">
                  <Grid item xs={6}>
                    <Stack alignItems="start">
                      {SCROLL_LINKS.slice(0, 2).map(scrollLink => (
                        <Button key={scrollLink.id} variant="text" sx={{ fontWeight: 500, fontSize: 16 }}>
                          <ScrollLink
                            to={scrollLink.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                          >
                            {scrollLink.label}
                          </ScrollLink>
                        </Button>
                      ))}
                    </Stack>
                  </Grid>

                  <Grid item xs={6}>
                    <Stack alignItems="end">
                      {SCROLL_LINKS.reverse().slice(0, 2).map(scrollLink => (
                        <Button key={scrollLink.id} variant="text" sx={{ fontWeight: 500, fontSize: 16 }}>
                          <ScrollLink
                            to={scrollLink.to}
                            spy={true}
                            smooth={true}
                            offset={-70}
                            duration={500}
                          >
                            {scrollLink.label}
                          </ScrollLink>
                        </Button>
                      ))}
                    </Stack>
                  </Grid>
                </Grid>
              ) : (
                <Stack direction="row" justifyContent={{ xs: 'center', md: 'start' }} flexWrap="wrap" alignItems="center" gap={2}>
                  {SCROLL_LINKS.map(scrollLink => (
                    <Button key={scrollLink.id} variant="text" sx={{ fontWeight: 500 }}>
                      <ScrollLink
                        to={scrollLink.to}
                        spy={true}
                        smooth={true}
                        offset={-70}
                        duration={500}
                      >
                        {scrollLink.label}
                      </ScrollLink>
                    </Button>
                  ))}
                </Stack>
              )}
              {isConnected ? chain?.id === CHAIN_ID ? (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, px: 4, fontSize: { xs: 14, md: 18 } }}
                  endIcon={<Icon icon="heroicons-outline:logout" />}
                  onClick={() => disconnect?.()}
                >{address?.slice(0, 7)}...{address?.slice(-5)}</Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, px: 4, fontSize: { xs: 14, md: 18 } }}
                  onClick={() => switchNetwork?.()}
                >Switch to Ethereum</Button>
              ) : (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 9999, px: 4, fontSize: { xs: 14, md: 18 } }}
                  onClick={() => open?.()}
                >Connect Wallet</Button>
              )}

            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box >
  )
}