// LoginWrapper.jsx
import React from "react";
import LoginForm from "./Login";
import ImageSection from "./ImageSection";

const LoginWrapper = () => {
  const [isRequestingAccess, setIsRequestingAccess] = React.useState(false);



  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <LoginForm
        isRequestingAccess={isRequestingAccess}
        setIsRequestingAccess={setIsRequestingAccess}
      />
      <ImageSection isRequestingAccess={isRequestingAccess} />
    </div>
  );
};

export default LoginWrapper;
