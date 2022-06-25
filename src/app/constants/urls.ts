import {environment} from "../../environments/environment";

let {API} = environment;

export const urls = {
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
  logout: `${API}/auth/logout`,
  refresh: `${API}/auth/refresh`,
  fuel_card: `${API}/fuel_card`,
}
