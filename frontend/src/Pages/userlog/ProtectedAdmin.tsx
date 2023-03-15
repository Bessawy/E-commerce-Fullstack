import React, { ReactElement } from "react";
import { Navigate} from "react-router-dom";

import { useAppSelector } from "../../reduxhook/hooks";

type propsType = {
  children?: ReactElement<any|any>
}

const ProtectAdmin = (props: propsType) => {
  const user = useAppSelector((state) => state.userReducer);
  if(user.role !== "admin")
  {
    return <Navigate to='/'/>
  }
  return props.children ? props.children : <Navigate to='/'/>
};

export default ProtectAdmin;