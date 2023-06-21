import { Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

// --------------------------------------------------------------------------------------------

interface IProps {
  title: string;
  [key: string]: string | Function | object;
}

// --------------------------------------------------------------------------------------------

export default function SectionTitle({ title = '', ...others }: IProps) {
  return (
    <Typography component="h2" fontSize={48} color={grey[100]} my={1} {...others}>{title}</Typography>
  )
}