import { useContext } from "react";
import { ProductContext } from "../contexts/ProductContext";


export function useProduct() {
    return useContext(ProductContext)
}