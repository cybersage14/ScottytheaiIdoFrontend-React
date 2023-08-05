import { useContext } from "react";
import { InitLoadingContext } from "../contexts/InitLoadingContext";

const useInitLoading = () => useContext(InitLoadingContext);

export default useInitLoading;
