import React, { useState, useEffect, useCallback } from "react";

import Keycloak from "../keycloak/Keycloak";
import ResourceInfo from "../../components/secured/Resource";
import Loader from "../../components/public/Loader";
import Error from "../../components/public/AuthError";
import { getResource } from "../../middleware/Api";

const Resource = (props) => {
  const [resource, setResource] = useState();
  const [isInfoLoading, setIsInfoLoading] = useState(true);
  const [error, setError] = useState(null);

  const { keycloak } = props;

  const loadResource = useCallback(async () => {
    try {
      const response = await getResource(keycloak);
      setResource(JSON.stringify(response));
    } catch (err) {
      setError(err.message);
    }
  }, [keycloak]);

  useEffect(() => {
    setIsInfoLoading(true);
    loadResource().then(() => {
      setIsInfoLoading(false);
    });
  }, [loadResource]);

  if (isInfoLoading) return <Loader />;

  if (!(isInfoLoading || error === null)) return <Error message={error} />;

  return <ResourceInfo {...{ resource }} />;
};

export default Keycloak(Resource);
