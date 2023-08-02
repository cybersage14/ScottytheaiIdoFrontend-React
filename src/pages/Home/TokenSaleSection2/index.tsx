import { lazy } from "react";
import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { PY_OF_SECTION } from "../../../utils/constants";

//  ---------------------------------------------------------------------------------------------------------

const TokenSalePanel = lazy(() => import('./TokenSalePanel'))

//  ---------------------------------------------------------------------------------------------------------

export default function TokenSaleSection2() {


  return (
    <Box component="section" py={PY_OF_SECTION} bgcolor={grey[900]}>
      {/* Desktop */}
      <Container maxWidth="xl" sx={{ display: { xs: 'none', md: 'block' } }}>
        <Grid container alignItems="center">
          <Grid item md={7}>
            <Stack alignItems="center" spacing={2}>
              <Box
                component="img"
                src="/assets/images/developer-scotty.png"
                alt="Developer Scotty"
                width="100%"
              />
              <Typography textAlign="center" color={grey[100]} px={16}>
                Join the future of AI-powered technology today and sign up for Scotty.
              </Typography>
              <Button variant="contained" sx={{ borderRadius: 9999 }}>
                Learn More
              </Button>
            </Stack>
          </Grid>

          <Grid item md={5}>
            <TokenSalePanel />
          </Grid>
        </Grid>
      </Container>

      {/* Mobile */}
      <Container sx={{ display: { xs: 'block', md: 'none' } }}>
        <Stack spacing={4}>
          <Box
            component="img"
            src="/assets/images/developer-scotty.png"
            alt="Developer Scotty"
            width="100%"
          />
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
    </Box>
  )
}