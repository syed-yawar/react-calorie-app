import { toast } from "react-toastify";

export const prepareGenericResponse = response => {
  /**
   * Prepares a generic response to be sent to Action Layer
   * Purpose is to handle all API response inconsistencies at this level
   * */
  const { data } = response;
  if (response?.status === 200 && data?.status === 200) {
    return {
      data: data.body,
      statusCode: data.status,
      statusMessage: data.message,
      success: true,
    };
  }

  // error case
  return {
    data: data?.body,
    statusCode: data?.status || 500,
    statusMessage: data.message || "something went wrong",
    success: false,
  };
};

export const decodeJwt = token => {
  try {
    // const token = localStorage.getItem("token");
    const decodedJwt = JSON.parse(atob(token.split(".")[1]));

    return decodedJwt;
  } catch (e) {
    return null;
  }
};
export const openToast = (type, msg) => {
  try {
    toast[type](msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } catch (e) {
    return null;
  }
};
