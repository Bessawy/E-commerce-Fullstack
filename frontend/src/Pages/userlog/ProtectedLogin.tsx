import React, { ReactElement } from "react";
import { Navigate} from "react-router-dom";

import { useAppSelector } from "../../reduxhook/hooks";

type propsType = {
  children?: ReactElement<any|any>
}

const ProtectLogin = (props: propsType) => {
  const user = useAppSelector((state) => state.userReducer);
  if(!user.id)
  {
    return <Navigate to='/signin'/>
  }
  return props.children ? props.children : <Navigate to='/signin'/>
};

export default ProtectLogin;
