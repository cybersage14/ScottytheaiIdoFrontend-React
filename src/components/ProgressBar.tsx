import { Icon } from "@iconify/react";
import { Box, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

//  ------------------------------------------------------------------------------------------------

interface IProps {
  value: number;
}

//  ------------------------------------------------------------------------------------------------

const INDEXES_OF_ARROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29]

//  ------------------------------------------------------------------------------------------------

export default function ProgressBar({ value }: IProps) {
  return (
    <Stack direction="row" alignItems="center" spacing={2} py={1} px={2} borderRadius={9999} bgcolor={grey[900]} width="95%">
      <Stack direction="row" flexGrow={1} overflow="hidden">
        {INDEXES_OF_ARROWS.map(index => (
          <Box
            key={index}
            component={Icon}
            icon="ep:arrow-right-bold"
            color={100 / INDEXES_OF_ARROWS.length * index <= value ? grey[100] : grey[800]}
          />
        ))}
      </Stack>
      <Typography component="span" color={grey[100]} fontSize={16}>
        {value}%
      </Typography>
    </Stack>
  )
}