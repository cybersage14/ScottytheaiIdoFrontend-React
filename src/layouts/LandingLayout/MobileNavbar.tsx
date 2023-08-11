import { Box, Stack, Container } from '@mui/material'
import { grey } from '@mui/material/colors'

interface IProps {
  setMobileMenuOpened: (newStatus: boolean) => void
}

export default function MobileNavbar({ setMobileMenuOpened }: IProps) {
  return (
    <Box component="nav" bgcolor="black" py={2}>
      <Container>
        <Stack component="nav" direction="row" justifyContent="space-between" alignItems="center">
          <Box
            component="img"
            src="/assets/images/hero-logo.png"
            alt="Logo"
            width="50%"
          />

          <Box pt={1} px={1} borderRadius={1} bgcolor={grey[900]} onClick={() => setMobileMenuOpened(true)}>
            <Box
              component="img"
              src="/assets/images/mobile-menu-icon.png"
            />
          </Box>
        </Stack>
      </Container>
    </Box>

  )
}