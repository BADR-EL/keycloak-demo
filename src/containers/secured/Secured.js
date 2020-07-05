import React from "react";

import Keycloak from "../keycloak/Keycloak";
import Secured from "../../components/secured/Secured";

export default Keycloak(() => {
  return <Secured />;
});
