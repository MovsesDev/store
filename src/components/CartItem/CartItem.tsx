import { useQuery } from "@apollo/client";
import React from "react";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import { ALL_CARTS, AUTHOR } from "../../apollo/requests";
import { Item, ItemList } from "../../types/cartItem";
import * as s from "./CartItemStyled";

interface CartItemProps {
  item: Item;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { data } = useQuery<ItemList>(ALL_CARTS);
  const {data:authorData} = useQuery(AUTHOR, {
    variables: {
      email: localStorage.getItem('user') 
    },skip: localStorage.getItem('user') === null
  })
  const { removeFromCart } = useShoppingCart();

  return (
    <s.CardS>
      <img
        src={item.imgUrl.url}
        style={{ width: "125px", height: "75px", objectFit: "cover" }}
      />
      <p>x{authorData?.authors[0].itemInfo?.find((i: { itemId: string; }) => i.itemId === item.id).quantity}</p>
      <div>
        <div>${item.price}</div>
        {item.name}
      </div>
      <s.DeleteBtn onClick={() => removeFromCart(item.id)}>X</s.DeleteBtn>
    </s.CardS>
  );
};

export default CartItem;
