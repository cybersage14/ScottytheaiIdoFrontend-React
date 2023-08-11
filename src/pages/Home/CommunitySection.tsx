import { Box, Button, Container, IconButton, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Icon } from '@iconify/react';
import { PY_OF_SECTION } from "../../utils/constants";

export default function CommunitySection() {
  return (
    <Box component="section" pb={PY_OF_SECTION} id="community">
      <Box position="relative">
        <Box
          component="img"
          src="/assets/images/rockets.png"
          width="100%"
        />
        <Box
          position="absolute"
          width="100%"
          bottom={0}
          sx={{
            backgroundImage: 'linear-gradient(to bottom, rgba(17,17,17,0), rgba(17,17,17,1))'
          }}
          pt={{ xs: 20, md: 50 }}
          pb={3}
        >
          <Container maxWidth="md">
            <Typography component="h2" fontSize={{ xs: 28, md: 32 }} color={grey[100]} textAlign="center">
              Unleash the Scotty Army! Join the Crypto Revolution!
            </Typography>
          </Container>
        </Box>
      </Box>

      <Container maxWidth="md">
        <Typography color={grey[100]} fontSize={16} textAlign="center" sx={{ mt: 2, lineHeight: 2 }}>
          The team actively engages with the community through social media and other channels, making it a truly community-driven project.
        </Typography>
        <Stack direction="row" justifyContent="center" mt={{ xs: 4, md: 4 }}>
          <Button variant="contained" sx={{ borderRadius: 9999, fontSize: { xs: 14, md: 18 } }} component={Link} href="https://t.me/Scotty_The_Ai" target="_blank">
            Click Here to Join
          </Button>
        </Stack>
        <Stack direction="row" justifyContent="center" spacing={1} mt={4}>
          <IconButton component={Link} href="https://t.me/Scotty_The_Ai" target="_blank">
            <Icon icon="mingcute:telegram-fill" />
          </IconButton>
          <IconButton component={Link} href="https://twitter.com/ScottyThe_Ai" target="_blank">
            <Icon icon="mdi:twitter" />
          </IconButton>
        </Stack>
      </Container>
    </Box>
  )
}