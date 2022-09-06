import { useEffect } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { fetchProductsAsync, productsSelector } from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog(){

    const products = useAppSelector(productsSelector.selectAll)
    const dispatch = useAppDispatch();
    const {productsLoaded, status} = useAppSelector(state => state.catalog)

    useEffect(() => {
     if(!productsLoaded) dispatch(fetchProductsAsync())
    },[productsLoaded])
  
    if(status.includes('pending')) return <LoadingComponent message="Loading Products..." />

    return (
      <>
      <ProductList products={products} />
      </>
    )
}