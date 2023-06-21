import { ReactNode } from "react";
import { Typography, TypographyProps } from "@mui/material";
import { grey } from "@mui/material/colors";

interface IProps extends TypographyProps {
  children: string | ReactNode;
}

export default function SectionTitle({ children, sx }: IProps) {
  return (
    <Typography component="h2" fontSize={{ xs: 32, md: 48 }} color={grey[100]} sx={sx}>
      {children}
    </Typography>
  )
}