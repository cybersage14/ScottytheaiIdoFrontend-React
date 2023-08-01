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
        width={56}
        height={56}
      >
        <Typography component="span" fontWeight={700} color={grey[100]} fontSize={28}>{timeValue}</Typography>
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