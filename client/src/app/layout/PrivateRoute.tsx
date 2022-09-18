import { ComponentType } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import { useAppSelector } from "../store/configureStore";

interface Props extends RouteProps {
    component: ComponentType<any>
}

export default function PrivateRoute({ component: Component, ...rest }: Props) {
    const {user} = useAppSelector(state => state.account);
    return (
      <Route
        {...rest}
        element={
          user ? (
            <CheckoutPage />
          ) : (
            <Navigate
              to={"/login"}
            />
          )
        }
      />
    );
  }