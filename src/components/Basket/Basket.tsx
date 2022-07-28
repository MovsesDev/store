import React, { SetStateAction, useEffect, useState } from "react";
import * as s from "./BasketStyled";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import CartItem from "../CartItem/CartItem";
import { useQuery } from "@apollo/client";
import { Item, ItemList } from "../../types/cartItem";
import { ALL_CARTS, AUTHOR, GET_CARTS } from "../../apollo/requests";

interface BasketProps {
  active: Boolean;
  setActive: React.Dispatch<SetStateAction<boolean>>;
}

const Basket: React.FC<BasketProps> = ({ active, setActive }) => {
  const [total, setTotal] = useState(0)
  const [arr1, setArr1] = useState([])
  const [arr2, setArr2] = useState([])
  const { error, loading, data } = useQuery<ItemList>(ALL_CARTS);
  const {
    error: authorError,
    loading: authorLoading,
    data: authorData,
  } = useQuery(AUTHOR,{variables: {
    email: localStorage.getItem('user') 
  },skip: localStorage.getItem('user') === null});
  const cartItems = authorData?.authors[0].itemInfo?.map((i: { itemId: string; }) => i.itemId)
  const {
    data: cartsData
  } = useQuery(GET_CARTS, {
    variables: {
      ids: cartItems
    }
  })
  useEffect(() => {

    if(authorData && cartsData) {
      const findItemTotal = (id: any, quantity: number, itemsArr: any) => {
        return itemsArr.find((i: { id: any; }) => i.id === id)?.price * quantity || 0;
    }
    
    const findTotal = (cartItemArr: any[], itemsArr: any) => {
       return cartItemArr.reduce((sum, curr) =>  {
           return sum + findItemTotal(curr.itemId, curr.quantity, itemsArr) 
        }, 0)
    }
    setTotal(findTotal(authorData.authors[0].itemInfo, cartsData.stores))
    console.log(authorData.authors[0].itemInfo, cartsData.stores);
    
  }
     }, [authorData, cartsData])

  
  if (error) return <div>Error</div>;
  if (!data) return <div>no data</div>;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setActive(false);
  };

  return (
    <s.BasketS>
      <s.BackGround active={active} onClick={handleClick}>
        <s.Modal
          active={active}
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.stopPropagation();
          }}
        >
          <h1 style={{ padding: "20px", fontSize: "34px" }}>Cart</h1>
          {cartsData?.stores.map((item: Item) => {  
            return <CartItem key={item.id} item={item} />;
          })}
          <p>Total :${total}</p>
          <s.CloseBtn onClick={() => setActive(false)} active={active}>
            X
          </s.CloseBtn>
        </s.Modal>
      </s.BackGround>
    </s.BasketS>
  );
};

export default Basket
