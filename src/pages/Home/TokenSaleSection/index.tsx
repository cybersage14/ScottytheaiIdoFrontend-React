import { Box, Container } from "@mui/material";
import SectionTitle from "../../../components/SectionTitle";

export default function TokenSaleSection() {
  return (
    <Box component="section">
      <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <SectionTitle title="Presale Stage 1" />

      </Container>
    </Box>
  )
}