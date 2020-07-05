import React, { useState, useEffect, useCallback } from "react";

import Keycloak from "../keycloak/Keycloak";
import UserInfo from "../../components/secured/User";
import Loader from "../../components/public/Loader";
import AuthError from "../../components/public/AuthError";

const User = (props) => {
  const [phone, setPhone] = useState();
  const [familyName, setFamilyName] = useState();
  const [givenName, setGivenName] = useState();
  const [email, setEmail] = useState();
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [error, setError] = useState(null);

  const { keycloak } = props;

  const loadUserInfo = useCallback(async () => {
    try {
      const response = await keycloak.loadUserInfo();
      setPhone(response.Phone);
      setFamilyName(response.family_name);
      setGivenName(response.given_name);
      setEmail(response.email);
    } catch (err) {
      setError(err.message);
    }
  }, [keycloak]);

  useEffect(() => {
    setIsInfoLoading(true);
    loadUserInfo().then(() => {
      setIsInfoLoading(false);
    });
  }, [loadUserInfo]);

  if (isInfoLoading) return <Loader />;

  if (!(isInfoLoading || error === null)) return <AuthError message={error} />;

  return <UserInfo {...{ phone, email, familyName, givenName }} />;
};

export default Keycloak(User);
