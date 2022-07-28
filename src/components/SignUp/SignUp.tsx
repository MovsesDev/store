import { useMutation } from "@apollo/client";
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { CREATE_AUTHOR, PUBLISH_AUTHOR } from "../../apollo/requests";
import { useShoppingCart } from "../../context/ShoppingCartContext";
import useOnClickOutside from "../../hooks/outsikdeClick";
import { Author } from "../../types/cartItem";
import { Form, Input, LoginBtn } from "./SignUpStyled";

interface SignUpProps {
  setLocation: Dispatch<SetStateAction<boolean>>;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SignUp: React.FC<SignUpProps> = ({ setLocation, setIsOpen }) => {
  const navigate = useNavigate();
  const { setIsAuth } = useShoppingCart();
  const [createAuthor, { error, loading, data }] =
    useMutation<Author>(CREATE_AUTHOR);

  if (error) console.log(error);
  const [
    publishAuthor,
    { error: publishError, loading: publishLoading, data: publishData },
  ] = useMutation<Author>(PUBLISH_AUTHOR);

  if (publishError) console.log(publishError);
  const handleSignUp = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    createAuthor({
      variables: {
        email,
        password,
      },
    });
  };

  if (data?.createAuthor.id) {
    publishAuthor({
      variables: {
        id: data?.createAuthor.id,
      },
    });
    data.createAuthor.id = "";
  }

  
  
  useEffect(() => {
    if (data?.createAuthor.email) {
      navigate("/");
      setIsOpen(false);
      localStorage.setItem("user", data.createAuthor.email);
    }
  }, [data?.createAuthor.email]);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const squareBoxRef = useRef<HTMLFormElement>(null);
  useOnClickOutside(squareBoxRef, () => setIsOpen(false));

  return (
    <Form ref={squareBoxRef}>
      Sign up
      <Input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      ></Input>
      <Input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      ></Input>
      <LoginBtn onClick={handleSignUp}>Sign up</LoginBtn>
      <p>
        Already have an account?{" "}
        <button
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: "17px",
          }}
          onClick={() => setLocation(true)}
        >
          Sign in
        </button>
      </p>
    </Form>
  );
};

export default SignUp;
