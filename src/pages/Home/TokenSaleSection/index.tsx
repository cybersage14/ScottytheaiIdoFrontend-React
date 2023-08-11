import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import TokenSalePanel from "./TokenSalePanel";

//  ---------------------------------------------------------------------------------------------------------

export default function TokenSaleSection() {
  return (
    <Box component="section" bgcolor={grey[900]}>
      {/* Desktop */}
      <Box display={{ xs: 'none', md: 'block' }}>
        <Grid container alignItems="center">
          <Grid item md={8}>
            <Stack alignItems="center" spacing={2}>
              <Box
                component="img"
                src="/assets/images/developer-scotty.png"
                alt="Developer Scotty"
                width="100%"
              />
            </Stack>
          </Grid>

          <Grid item md={4} sx={{ pr: 2 }}>
            <TokenSalePanel />
          </Grid>
        </Grid>
      </Box>

      {/* Mobile */}
      <Box display={{ xs: 'block', md: 'none' }} pb={4}>
        <Stack spacing={4}>
          <Box
            component="img"
            src="/assets/images/developer-scotty.png"
            alt="Developer Scotty"
            width="100%"
          />
          <Container>
            <Stack spacing={4}>
              <TokenSalePanel />
              <Stack alignItems="center" spacing={2}>
                <Typography textAlign="center" color={grey[100]} fontSize={16}>
                  Join the future of AI-powered technology today and sign up for Scotty.
                </Typography>
                <Button variant="contained" sx={{ borderRadius: 9999, fontSize: 14 }}>
                  Learn More
                </Button>
              </Stack>
            </Stack>
          </Container>
        </Stack>
      </Box>
    </Box>
  )
}