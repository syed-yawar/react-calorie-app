import { RESTfulService } from "../rest";
import { prepareGenericResponse, REST_ENDPOINTS } from "../utils";

export class AdminService extends RESTfulService {
  allMeals = async data => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_MEAL}`;
      const response = await this.get(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  getAllUsers = async () => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_USER}`;
      const response = await this.get(url);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  saveMeal = async data => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_MEAL}`;
      const response = await this.post(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  deleteMeal = async id => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_MEAL}/${id}`;
      const response = await this.delete(url);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  updateMeal = async data => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_MEAL}/${data._id}`;
      const response = await this.put(url, data);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
  getDashboard = async () => {
    try {
      const url = `${REST_ENDPOINTS.ADMIN_DASHBOARD}`;
      const response = await this.get(url);
      return prepareGenericResponse(response);
    } catch (error) {
      return prepareGenericResponse(error);
    }
  };
}
