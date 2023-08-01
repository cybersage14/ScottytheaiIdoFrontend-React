import { Fragment } from "react";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { grey } from "@mui/material/colors";
import Marquee from "react-fast-marquee";
import { Icon } from '@iconify/react';

//  ------------------------------------------------------------------------------------------------

const INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

//  ------------------------------------------------------------------------------------------------

export default function Navbar() {
  const theme = useTheme()

  return (
    <Box component="nav" bgcolor={theme.palette.primary.main} py={1}>
      <Marquee>
        <Stack direction="row" alignItems="center" spacing={4}>
          {INDEXES.map(index => (
            <Fragment key={index}>
              <Typography component="span" color={grey[100]}>{index % 2 === 1 ? 'Scotty' : 'Private Sale'}</Typography>
              <Box component={Icon} icon="ph:star" color={grey[100]} fontSize={18} pr={index === INDEXES.length - 1 ? 4 : 0} />
            </Fragment>
          ))}
        </Stack>
      </Marquee>
    </Box>
  )
}