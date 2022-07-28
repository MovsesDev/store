import React from "react";
import { RingLoader } from "react-spinners";

const Loading: React.FC<{ loading: boolean }> = ({ loading }) => {
  return loading ? (
    <div
      style={{
        position: "absolute",
        left: "0",
        top: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.4)",
      }}
    >
      <RingLoader color="white" loading />
    </div>
  ) : null;
};

export default Loading;
