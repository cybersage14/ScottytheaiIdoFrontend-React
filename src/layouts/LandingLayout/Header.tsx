import { Box, Button, Container, Grid, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Link as ScrollLink } from 'react-scroll';
import { IScrollLink } from "../../utils/interfaces";

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

  return (
    <Box component="header" position="relative">
      <Box
        component="video"
        autoPlay
        muted
        src="https://scottytheai.com/wp-content/uploads/2023/05/scotty_bg.mp4"
        position="absolute"
        right={0}
        bottom={0}
        minWidth="100%"
        maxWidth="100%"
        minHeight="100%"
      />

      <Box sx={{ background: 'rgba(0, 0, 0, 0.7)' }} pt={{ xs: 16, md: 24 }} pb={4} position="relative" zIndex={99}>
        <Container maxWidth="lg">
          <Stack alignItems="center" gap={{ xs: 2, md: 24 }}>
            <Box
              component="img"
              src="/assets/images/ascii-logo.webp"
              alt="ascii-logo"
              position="relative"
              width="100%"
            />

            <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center" width="100%" spacing={{ xs: 2, md: 0 }}>
              {isMobile ? (
                <Grid container spacing={6} direction="row-reverse">
                  <Grid item xs={6}>
                    <Stack alignItems="start" gap={1}>
                      {SCROLL_LINKS.slice(0, 2).map(scrollLink => (
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
                  </Grid>

                  <Grid item xs={6}>
                    <Stack alignItems="end" gap={1}>
                      {SCROLL_LINKS.reverse().slice(0, 2).map(scrollLink => (
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

              <Button variant="contained" sx={{ borderRadius: 9999, px: 4 }}>Buy $SCOTTY</Button>
            </Stack>
          </Stack>
        </Container>
      </Box>
    </Box >
  )
}