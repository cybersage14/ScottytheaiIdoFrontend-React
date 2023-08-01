import { SyntheticEvent, useState } from "react";
import { Box, Button, Container, Grid, Paper, Stack, Tab, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import TimePiece from "./TimePiece";
import ProgressBar from "../../../components/ProgressBar";
import { INVESTED_TOKENS } from "../../../utils/constants";
import TabEthereum from "./TabEthereum";
import TabUsdt from "./TabUsdt";

//  ---------------------------------------------------------------------------------------------------------

export default function TokenSaleSection2() {
  const theme = useTheme()
  const [currentTab, setCurrentTab] = useState<number>(1)

  const handleCurrentTab = (e: SyntheticEvent, tabValue: string) => {
    setCurrentTab(Number(tabValue))
  }

  return (
    <Box component="section" py={12} bgcolor={grey[900]}>
      <Container maxWidth="xl">
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
            <Paper sx={{ bgcolor: theme.palette.primary.main, py: 6, px: 4, borderRadius: 4 }}>
              <Stack alignItems="center" spacing={3}>
                <Stack alignItems="center" spacing={3} width="100%">
                  {/* Title */}
                  <Typography component="h3" color={grey[900]} fontSize={44} fontWeight={600}>Presale Stage 3</Typography>

                  {/* Time */}
                  <Stack direction="row" spacing={1} alignItems="center" justifyContent="center">
                    <TimePiece timeValue={14} timeUnit="Days" />
                    <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
                    <TimePiece timeValue={14} timeUnit="Hours" />
                    <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
                    <TimePiece timeValue={14} timeUnit="Minutes" />
                    <Typography component="span" color={grey[100]} fontSize={28}>:</Typography>
                    <TimePiece timeValue={14} timeUnit="Seconds" />
                  </Stack>

                  {/* Price */}
                  <Stack>
                    <Typography color={grey[100]} fontWeight={600}>
                      1 SCOTTY = <Typography color={grey[900]} component="span">0.1 USDT</Typography>
                    </Typography>
                    <Typography color={grey[100]} fontWeight={600}>
                      USDT Raised <Typography color={grey[900]} component="span">0.0033</Typography>
                    </Typography>
                  </Stack>
                </Stack>

                <ProgressBar value={96} />

                <Stack alignItems="center" spacing={4}>
                  <Typography color={grey[900]} fontWeight={600}>
                    50.00 <Typography color={grey[100]} component="span">Tokens Remaining</Typography>
                  </Typography>

                  <TabContext value={`${currentTab}`}>
                    <TabList onChange={handleCurrentTab}>
                      {INVESTED_TOKENS.map(token => (
                        <Tab
                          key={token.id}
                          label={
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Box
                                component="img"
                                src={token.img_src}
                                alt={token.token_symbol}
                                width={24}
                              />
                              <Typography
                                component="span"
                                color={currentTab === token.id ? grey[900] : grey[100]}
                              >{token.token_name}</Typography>
                            </Stack>
                          }
                          value={token.id}
                          sx={{ borderBottom: `2px solid ${currentTab === token.id ? grey[900] : theme.palette.primary.main}` }}
                        />
                      ))}
                    </TabList>
                    {INVESTED_TOKENS.map(token => (
                      <TabPanel key={token.id} value={`${token.id}`}>
                        {token.id === 1 ? (
                          <TabEthereum remainedTokenAmount={100} />
                        ) : (
                          <TabUsdt remainedTokenAmount={100} />
                        )}
                      </TabPanel>
                    ))}
                  </TabContext>
                </Stack>
              </Stack>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}