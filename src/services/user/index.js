import { RESTfulService } from "../rest";
import { prepareGenericResponse, REST_ENDPOINTS } from "../utils";

export class UserService extends RESTfulService {
  login = async data => {
    try {
      const url = `${REST_ENDPOINTS.LOGIN}`;
      const response = await this.post(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  register = async data => {
    try {
      const url = `${REST_ENDPOINTS.REGISTER}`;
      const response = await this.post(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  allMeals = async data => {
    try {
      const url = `${REST_ENDPOINTS.MEAL}`;
      const response = await this.get(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  saveMeal = async data => {
    try {
      const url = `${REST_ENDPOINTS.MEAL}`;
      const response = await this.post(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  inviteFriend = async data => {
    try {
      const url = `${REST_ENDPOINTS.INVITE}`;
      const response = await this.post(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
}
