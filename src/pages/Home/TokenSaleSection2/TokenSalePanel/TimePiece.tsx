import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

interface IProps {
  timeValue: string | number;
  timeUnit: string;
}

export default function TimePiece({ timeValue, timeUnit }: IProps) {
  return (
    <Box position="relative">
      <Stack
        justifyContent="center"
        alignItems="center"
        border={`1px solid ${grey[100]}`}
        borderRadius={2}
        borderBottom="none"
        width={{ xs: 48, md: 56 }}
        height={{ xs: 48, md: 56 }}
      >
        <Typography component="span" fontWeight={700} color={grey[100]} fontSize={{ xs: 20, md: 28 }}>{timeValue}</Typography>
      </Stack>
      <Stack
        position="absolute"
        direction="row"
        width="100%"
        justifyContent="center"
        bottom="-14%"
      >
        <Typography
          component="span"
          color={grey[100]}
          fontSize={12}
        >{timeUnit}</Typography>
      </Stack>
    </Box>
  )
}