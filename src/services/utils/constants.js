import { ENV } from "../../configs";

export const REST_ENDPOINTS = {
  LOGIN: `${ENV.RESTFUL_BASE_URL}/api/user/login`,
  REGISTER: `${ENV.RESTFUL_BASE_URL}/api/user/register`,
  MEAL: `${ENV.RESTFUL_BASE_URL}/api/user/meals`,
  ADMIN_MEAL: `${ENV.RESTFUL_BASE_URL}/api/admin/meals`,
  ADMIN_USER: `${ENV.RESTFUL_BASE_URL}/api/admin/users`,
  ADMIN_DASHBOARD: `${ENV.RESTFUL_BASE_URL}/api/admin/dashboard`,
  INVITE: `${ENV.RESTFUL_BASE_URL}/api/user/invite`,
};
