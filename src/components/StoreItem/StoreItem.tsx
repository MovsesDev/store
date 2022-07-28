import { useQuery } from "@apollo/client";
import React, { useEffect, useMemo, useState } from "react";
import { AUTHOR } from "../../apollo/requests";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { Item } from "../../types/cartItem";
import * as s from "./StoreItemStyled";
import Loading from "../common/Loading";

interface StoreItemProps {
  item: Item;
}

const StoreItem: React.FC<StoreItemProps> = ({ item }) => {
  const { increaseCartQuantity, decreaseCartQuantity, removeFromCart, loadingAll } =
    useShoppingCart();
  const { data, loading } = useQuery(AUTHOR, {
    variables: {
      email: localStorage.getItem("user"),
    },
    skip: localStorage.getItem("user") === null,
  });

  const quantity =       data?.authors[0].itemInfo?.find(
        (i: { itemId: string }) => i.itemId === item.id
      )?.quantity
 
  return (
    <s.Card>
      <Loading loading={loadingAll} />
      <s.Image src={item.imgUrl.url} />
      <s.ImageTop>
        <s.ImageName>{item.name}</s.ImageName>
        <s.ImagePrice>${item.price}</s.ImagePrice>
      </s.ImageTop>
      {quantity ? (
        <s.ImageMid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <s.Button onClick={() => decreaseCartQuantity(item.id)}>-</s.Button>
            <s.Text>{quantity} in cart</s.Text>
            <s.Button onClick={() => increaseCartQuantity(item.id)}>+</s.Button>
          </div>
          <div style={{ padding: "10px" }}>
            <s.RemoveButton onClick={() => removeFromCart(item.id)}>
              Remove Cart
            </s.RemoveButton>
          </div>
        </s.ImageMid>
      ) : (
        <s.ImageBottom>
          <s.AddButton onClick={() => increaseCartQuantity(item.id)}>
            + Add to Cart
          </s.AddButton>
        </s.ImageBottom>
      )}
    </s.Card>
  );
};

export default StoreItem;
