import { Box, Button, Link, Stack, useMediaQuery, useTheme } from "@mui/material";
import { Link as ScrollLink } from 'react-scroll';
import { SCOTTY_CHAT_URL, SCROLL_LINKS, THIRD_PARTY_LINKS } from "../../utils/constants";

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
        loop
        playsInline
        src="/assets/videos/scotty_bg.mp4"
        position="absolute"
        right={0}
        bottom={0}
        minWidth="100%"
        minHeight="100%"
        sx={{ objectFit: 'cover' }}
      />

      <Box sx={{ background: 'rgba(0, 0, 0, 0.7)' }} pt={{ xs: 16, md: 36 }} pb={{ xs: 16, md: 0 }} position="relative" zIndex={10} px={2}>
        <Stack alignItems="center" gap={{ xs: 8, md: 36 }}>
          <Box
            component="img"
            src="/assets/images/hero-logo.png"
            alt="ascii-logo"
            width={{ xs: '90%', md: '60%' }}
          />
          <Stack
            direction={{ xs: 'column', md: 'row' }}
            justifyContent="space-between"
            alignItems="center"
            width="100%"
            spacing={{ xs: 2, md: 0 }}
          >
            {isMobile ? (
              <></>
            ) : (
              <Stack
                direction="row"
                justifyContent={{ xs: 'center', md: 'start' }}
                flexWrap="wrap"
                alignItems="center"
                gap={2}
              >
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
                {THIRD_PARTY_LINKS.map(thirdPartyLink => (
                  <Button
                    key={thirdPartyLink.id}
                    variant="text"
                    sx={{ fontWeight: 500 }}
                    component={Link}
                    href={thirdPartyLink.href}
                    target="_blank"
                  >
                    {thirdPartyLink.label}
                  </Button>
                ))}
              </Stack>
            )}
            <Button
              variant="contained"
              component={Link}
              sx={{ borderRadius: 9999, px: 4, fontSize: { xs: 14, md: 18 } }}
              href={SCOTTY_CHAT_URL}
              target="_blank"
            >ScottyChat</Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  )
}