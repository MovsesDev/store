import { useMutation, useQuery } from "@apollo/client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  ALL_CARTS,
  AUTHOR,
  PUBLISH_UPDATE_AUTHOR,
  UPDATE_AUTHOR,
} from "../apollo/requests";
import Basket from "../components/Basket/Basket";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Author2, ItemList } from "../types/cartItem";

type ShoppingCartProviderProps = {
  children: ReactNode;
};

type ShoppingCartContext = {
  increaseCartQuantity: (id: string) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  setBasketOpen: Dispatch<SetStateAction<boolean>>;
  isAuth: boolean;
  setIsAuth: Dispatch<SetStateAction<boolean>>;
  loadingAll: boolean
};

const ShoppingCartContext = createContext({} as ShoppingCartContext);

export function useShoppingCart() {
  return useContext(ShoppingCartContext);
}

export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [isBasketOpen, setBasketOpen] = useState<boolean>(false);

  const { refetch } = useQuery(AUTHOR, {
    variables: {
      email: localStorage.getItem("user"),
    },
    skip: localStorage.getItem("user") === null,
  });

  const [updateAuthor, { error, loading, data }] = useMutation(UPDATE_AUTHOR);
  const [
    publishUpdateAuthor,
    { error: publishError, loading: publishLoading, data: publishData },
  ] = useMutation(PUBLISH_UPDATE_AUTHOR);

  const {
    error: authorError,
    loading: authorLoading,
    data: authorData,
  } = useQuery(AUTHOR, {
    variables: {
      email: localStorage.getItem("user"),
    },
  });

  const loadingAll = authorLoading || publishLoading || loading;

  useEffect(() => {
    if (data) {
      (async () => {
        await publishUpdateAuthor({
          variables: {
            email: localStorage.getItem("user"),
          },
        });
        refetch();
      })();
    }
  }, [data]);

  function increaseCartQuantity(id: string) {
    let postIds = authorData.authors[0].itemInfo;
    const item = postIds?.find((i: { itemId: string }) => i.itemId === id);

    const addItem = () => {
      if (postIds === null) {
        postIds = [{ itemId: id, quantity: 1 }];

        return postIds;
      } else {
        if (item) {
          console.log("2");
          const pos = postIds
            .map((i: { itemId: string }) => i.itemId)
            .indexOf(id);
          const postIdsCopy = [...postIds];
          postIdsCopy[pos] = { itemId: id, quantity: item.quantity + 1 };
          console.log(postIdsCopy);

          return postIdsCopy;
        } else {
          console.log("3");
          postIds = [...postIds, { itemId: id, quantity: 1 }];

          return postIds;
        }
      }
    };

    updateAuthor({
      variables: {
        email: localStorage.getItem("user"),
        items: addItem(),
      },
    });
  }

  function decreaseCartQuantity(id: string) {
    let postIds = authorData.authors[0].itemInfo;
    const item = postIds?.find((i: { itemId: string }) => i.itemId === id);
    const decreaseItem = () => {
      if (item && item.quantity >= 1) {
        console.log("2");
        const pos = postIds
          .map((i: { itemId: string }) => i.itemId)
          .indexOf(id);
        const postIdsCopy = [...postIds];
        postIdsCopy[pos] = { itemId: id, quantity: item.quantity - 1 };
        console.log(postIdsCopy);

        return postIdsCopy;
      } else if (item && item.quantity === 0) {
        const pos = postIds
          .map((i: { itemId: string }) => i.itemId)
          .indexOf(id);
        const postIdsCopy = [...postIds];
        postIdsCopy[pos] = { itemId: id, quantity: 0 };

        return postIdsCopy;
      }
    };

    updateAuthor({
      variables: {
        email: localStorage.getItem("user"),
        items: decreaseItem(),
      },
    });
  }

  function removeFromCart(id: string) {
    let postIds = authorData?.authors[0].itemInfo;
    let items = postIds.filter((i: { itemId: string }) => i.itemId !== id);

    updateAuthor({
      variables: {
        email: localStorage.getItem("user"),
        items: items,
      },
    });
  }

  return (
    <ShoppingCartContext.Provider
      value={{
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        setBasketOpen,
        isAuth,
        setIsAuth,
        loadingAll
      }}
    >
      {children}
      <Basket active={isBasketOpen} setActive={setBasketOpen} />
    </ShoppingCartContext.Provider>
  );
}
