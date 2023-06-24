import { CircularProgress, Dialog, DialogContent } from "@mui/material";
import useLoading from "../hooks/useLoading";

// ---------------------------------------------------------------------------------------------

export default function Loading() {
  const { isLoading } = useLoading()

  return (
    <Dialog open={isLoading}>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  )
}