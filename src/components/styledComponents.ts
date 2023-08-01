import { Typography, styled, TextField as MuiTextField } from "@mui/material";
import { grey } from "@mui/material/colors";

export const SectionTitle = styled(Typography)`
  font-size: 48px;
  color: ${grey[100]};
`;

export const TextField = styled(MuiTextField)({
  "& .MuiFormLabel-root": {
    color: grey[900],
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: grey[900],
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: grey[900],
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: grey[900],
  },
  "& .MuiInputBase-input": {
    color: grey[900],
  },
});
