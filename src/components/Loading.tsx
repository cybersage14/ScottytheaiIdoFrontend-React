import { CircularProgress, Stack, Typography, useTheme } from "@mui/material";

// ---------------------------------------------------------------------------------------------

export default function Loading() {
  const theme = useTheme()

  return (
    <Stack height="100vh" width="100vw" justifyContent="center" alignItems="center" bgcolor={theme.palette.background.default} spacing={1}>
      <CircularProgress sx={{ color: theme.palette.primary.main }} />
      <Typography component="span">Loading...</Typography>
    </Stack>
  )
}