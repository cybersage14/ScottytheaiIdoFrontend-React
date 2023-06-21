import { Box, Button, Container, Grid, Icon as MuiIcon, Stack, Typography, useTheme } from "@mui/material";
import { Icon } from "@iconify/react";
import { grey } from "@mui/material/colors";
import { SectionTitle } from "../../components/styledComponents";

// --------------------------------------------------------------------------------------------------

interface IText {
  id: number;
  text: string;
}

// --------------------------------------------------------------------------------------------------

const TEXTS: Array<IText> = [
  {
    id: 1,
    text: "Scotty stays current on AI, blockchain, and cryptocurrency advancements with his advanced AI system that gives him unparalleled insight into the inner workings of blockchain technology. He analyzes complex algorithms and code with ease, spotting patterns and anomalies that even the most skilled human programmers would miss."
  },
  {
    id: 2,
    text: "With his incredible memory he's able to recall every transaction, every block, and every hash that has ever been recorded on the blockchain. He sifts through vast amounts of data in seconds, searching for clues and connections that others can only dream of."
  },
  {
    id: 3,
    text: "Moving through the digital world with lightning-fast agility, darting through the blockchain like a ghost in the machine. Scotty bypasses security systems with ease, slipping through the tiniest gaps in firewalls and encryption algorithms."
  },
  {
    id: 4,
    text: "His greatest power was his intuition. A sixth sense for detecting fraud and deceit, able to sense when something was off in a transaction or network. When he did, he would spring into action, using his AI abilities to track down the source of the problem and neutralize it before it could do any harm."
  }
]

// --------------------------------------------------------------------------------------------------

export default function AdventureSection() {
  const theme = useTheme()

  return (
    <Box component="section" py={12}>
      <Container id="adventures">
        <Grid container spacing={4}>
          <Grid item md={6} sx={{ display: 'flex' }}>
            <Box
              component="img"
              src="/assets/images/image4.png"
              alt=""
              width="100%"
              height="fit-content"
            />
          </Grid>

          <Grid item md={6}>
            <Typography fontSize={14} color={theme.palette.primary.main} letterSpacing={2}>JOIN SCOTTY’S QUEST FOR KNOWLEDGE</Typography>
            <SectionTitle variant="h2" my={1}>Scotty's Adventures</SectionTitle>
            <Stack gap={2}>
              {TEXTS.map(textItem => (
                <Stack key={textItem.id} direction="row" spacing={2}>
                  <MuiIcon component={Icon} icon="formkit:radio" sx={{ fontSize: 12, color: theme.palette.primary.main, mt: 0.5 }} />
                  <Typography fontSize={16} color={grey[100]}>{textItem.text}</Typography>
                </Stack>
              ))}
            </Stack>
            <Typography fontSize={16} color={grey[100]} mt={4}>
              It is these powers that made Scotty the AI such a force to be reckoned with in the cryptocurrency world. He is a protector, a guardian, and a champion of the people.
            </Typography>
            <Button variant="contained" sx={{ borderRadius: 9999, fontSize: 16, px: 4, mt: 4 }}>Learn More</Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}