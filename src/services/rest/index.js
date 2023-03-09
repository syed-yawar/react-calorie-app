import axios from "axios";
import queryString from "query-string";

export class RESTfulService {
  /**
   * Generic client to interact with RESTful endpoints
   */

  async getHeaders(options) {
    let headers = {};
    if (options && options.headers) {
      // customise headers
      const { headers: customHeaders } = options;
      headers = customHeaders;
      return headers;
    }
    const token = localStorage.getItem("token");
    if (token && typeof token === "string") headers.Authorization = `bearer ${token.replace(/['"]+/g, "")}`;
    headers["Content-Type"] = "application/json";
    headers = { ...headers };
    return headers;
  }

  async get(url, queryParams = null, options = null) {
    const headers = await this.getHeaders(options);
    return axios.get(url, {
      headers,
      params: queryParams,
      paramsSerializer: params => queryString.stringify(params),
    });
  }

  async post(url, data, options = null) {
    const headers = await this.getHeaders(options);
    return axios.post(url, data, { headers });
  }

  async put(url, data, queryParams = null, options = null) {
    const headers = await this.getHeaders(options);

    return axios.put(url, data, {
      headers,
      params: queryParams,
      paramsSerializer: params => queryString.stringify(params),
    });
  }

  async patch(url, data, options = null) {
    const headers = await this.getHeaders(options);

    return axios.patch(url, data, { headers });
  }

  async delete(url, options) {
    const headers = await this.getHeaders(options);

    return axios.delete(url, { headers });
  }
}
