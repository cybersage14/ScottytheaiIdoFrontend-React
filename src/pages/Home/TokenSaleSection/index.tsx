import { Box, Container } from "@mui/material";
import { SectionTitle } from "../../../components/styledComponents";

export default function TokenSaleSection() {
  return (
    <Box component="section">
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SectionTitle variant="h2" my={1}>Presale Stage 1</SectionTitle>

      </Container>
    </Box>
  )
}