import { Icon } from "@iconify/react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";

//  ------------------------------------------------------------------------------------------------

interface IProps {
  value: number;
}

//  ------------------------------------------------------------------------------------------------

const INDEXES_OF_ARROWS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74]

//  ------------------------------------------------------------------------------------------------

export default function InitLoadProgressBar({ value }: IProps) {
  const theme = useTheme()

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={2}
      py={2}
      px={4}
      borderRadius={9999}
      bgcolor="#111111"
      width="100%"
      border={`1px solid ${theme.palette.primary.main}`}
    >
      <Stack direction="row" flexGrow={1} overflow="hidden">
        {INDEXES_OF_ARROWS.map(index => (
          <Box
            key={index}
            component={Icon}
            icon="ep:arrow-right-bold"
            color={100 / INDEXES_OF_ARROWS.length * index <= value ? grey[200] : grey[800]}
            sx={{ fontSize: 36 }}
          />
        ))}
      </Stack>
      <Typography component="span" color={grey[100]} fontSize={20}>
        {value}%
      </Typography>
    </Stack>
  )
}