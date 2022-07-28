import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Container } from "../../components/common/Container";
import StoreItem from "../../components/StoreItem/StoreItem";
import { ALL_CARTS } from "../../apollo/requests";
import { ItemList } from "../../types/cartItem";
import * as s from "./StoreStyled";
import Loading from "../../components/common/Loading";
import { useShoppingCart } from "../../context/ShoppingCartContext";
const Store = () => {
  const { loading: cartsLoading, error, data } = useQuery<ItemList>(ALL_CARTS);
  const loading = cartsLoading;

  return (
    <s.Main>
      {data?.stores.map((item) => {
        return <StoreItem key={item.id} item={item} />;
      })}
    </s.Main>
  );
};

export default Store;
