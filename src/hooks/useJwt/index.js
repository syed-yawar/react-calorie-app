import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { decodeJwt } from "../../services/utils";

export const useJwtData = () => {
  const token = useSelector(state => state.user.token);
  //   const [jwt, setJwt] = useState(null);
  const [isValid, setIsValid] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      setIsLoading(false);
      setIsValid(false);
    } else {
      const decodedData = decodeJwt(token);
      //   setJwt(decodedData);
      decodedData && decodedData.exp * 1000 < Date.now() ? setIsValid(false) : setIsValid(true);
      setIsLoading(false);
    }
  }, [token]);
  useEffect(() => {}, [isLoading, isValid]);

  return [isLoading, isValid];
};
