import { Box, Button, Container, IconButton, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Icon } from '@iconify/react';
import { PY_OF_SECTION } from "../../utils/constants";

export default function CommunitySection() {
  return (
    <Box component="section" py={PY_OF_SECTION}>
      <Container maxWidth="md">
        <Typography component="h2" fontSize={{ xs: 20, md: 32 }} color={grey[100]} textAlign="center">
          Unleash the Scotty Army! Join the Crypto Revolution!
        </Typography>
        <Typography color={grey[100]} fontSize={14} textAlign="center" sx={{ mt: 2, lineHeight: 2 }}>
          The team actively engages with the community through social media and other channels, making it a truly community-driven project.
        </Typography>
        <Stack direction="row" justifyContent="center" mt={{ xs: 4, md: 8 }}>
          <Button variant="contained" sx={{ borderRadius: 9999 }} component={Link} href="https://t.me/Scotty_The_Ai" target="_blank">
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