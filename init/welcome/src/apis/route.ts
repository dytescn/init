import { DxHttp } from "@funxdata/webdx/dxhttp";
const request = new DxHttp({
  baseURL: "/assets/",
  timeout: 3000,
  headers: {
    "Content-Type": "application/html",
  },
});

export const get_asides_info = async () => {
  const route = await request.get(`route.json`);
  const route_data = route.data;
  const new_data = [];
  for (const item of route_data) {
    if (item.hide === false) {
      new_data.push(item);
    }
  }
  return new_data;
};

export const get_router_info = async () => {
  return await request.get(`route.json`);
};
