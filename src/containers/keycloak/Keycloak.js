import React, { useState, useEffect } from "react";

import AuthError from "../../components/public/AuthError";
import Loader from "../../components/public/Loader";
import Logout from "../../components/public/Logout";

export default (WrappedComponent) => {
  return (props) => {
    const [isAutenticated, setIsAutenticated] = useState(false);
    const [keycloak, setKeycloak] = useState();

    useEffect(() => {
      const script = document.createElement("script");

      script.src = process.env.REACT_APP_ADAPTER_URL;

      script.async = true;

      document.body.appendChild(script);

      script.onload = () => {
        const keycloak = new window.Keycloak("/keycloak.json");
        keycloak
          .init({ onLoad: "login-required", promiseType: "native" })
          .then((authenticated) => {
            setKeycloak(keycloak);
            setIsAutenticated(authenticated);
          });
      };
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    if (keycloak) {
      if (isAutenticated) {
        return (
          <div>
            <Logout onClick={() => keycloak.logout()} />
            <WrappedComponent {...props} keycloak={keycloak} />
          </div>
        );
      } else return <AuthError message="Unable to authenticate" />;
    }
    return <Loader />;
  };
};
