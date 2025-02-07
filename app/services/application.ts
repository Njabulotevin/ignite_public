import { Iapplication, serverApplication } from "~/models/application";
import { apiInstance } from "./api";
import { AxiosResponse } from "axios";
import { Response } from "~/models/response";


export const sendApplication = async (
  credentials: Iapplication
): Promise<AxiosResponse<
  Response<{ application: serverApplication }>
> | null> => {
  try {
    const response: AxiosResponse<Response<{ application: serverApplication }>> =
      await apiInstance.post("/application/register", credentials);
    console.log("response: ", JSON.stringify(response.data));
    return response;
  } catch (error) {
    console.error("Error logging in:", error);
    return null;
  }
};
