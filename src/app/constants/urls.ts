import {environment} from "../../environments/environment";

let {API} = environment;

export const urls = {
  login: `${API}/auth/login`,
  register: `${API}/auth/register`,
  logout: `${API}/auth/logout`,
  refresh: `${API}/auth/refresh`,
  role: `${API}/auth/role`,

  users: `${API}/users`,



  fuel_card: `${API}/fuel_card`,

  sim_card: `${API}/sim_card`,
  position: `${API}/position`,
  observation: `${API}/observation`,
  fire_resistant_impregnation: `${API}/fire_resistant_impregnation`,
  fire_hydrant: `${API}/fire_hydrant`,
  fire_extinguishers: `${API}/fire_extinguishers`,
  contact_person: `${API}/contact_person`,
  client: `${API}/client`,


}
