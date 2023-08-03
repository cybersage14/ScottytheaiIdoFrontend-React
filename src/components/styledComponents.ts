import {
  styled,
  TextField as MuiTextField,
  Tabs as MuiTabs
} from "@mui/material";
import { grey } from "@mui/material/colors";

export const TextField = styled(MuiTextField)({
  "& .MuiFormLabel-root": {
    color: grey[900]
  },
  "& .MuiFormLabel-root.Mui-focused": {
    color: grey[900]
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: grey[900]
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: grey[900]
  },
  "& .MuiInputBase-input": {
    color: grey[900]
  }
});

export const Tabs = styled(MuiTabs)({
  "& .MuiTabs-indicator": {
    borderBottom: `2px solid ${grey[900]}`
  }
});
