import fetch, { Headers } from "node-fetch";
import AuthPayload from "./applover.foodsi/a/a/b/AuthPayload";
import UserSignUpResponse from "./applover.foodsi/api.model.response/UserSignUpResponse";
import ResponseRateReasons from "./applover.foodsi/api.model.response/ResponseRateReasons";
import OrdersResponse from "./applover.foodsi/f/OrdersResponse";
import UserSignInResponse from "./applover.foodsi/api.model.response/UserSignInResponse";
import FacebookCallbackPayload from "./applover.foodsi/a/a/b/FacebookCallbackPayload";
import DayAttribute from "./applover.foodsi/a/a/b/DayAttribute";
import OrderPickup from "./applover.foodsi/a/a/b/OrderPickup";
import OrderPostPayload from "./applover.foodsi/a/a/b/OrderPostPayload";
import PromoCodeDetails from "./applover.foodsi/a/a/PromoCodeDetails";
import PostRatePayload from "./applover.foodsi/a/a/b/PostRatePayload";
import PostDevicePayload from "./applover.foodsi/a/a/b/PostDevicePayload";
import RestaurantesFilterV2Payload from "./applover.foodsi/a/a/b/RestaurantFilterV2Payload";
import PasswordPayload from "./applover.foodsi/a/a/b/PasswordPayload";
import StatusIndicatingResponseWrapper from "./applover.foodsi/api.model.response/StatusIndicatingResponseWrapper";
import PasswordUpdatePayload from "./applover.foodsi/a/a/b/PasswordUpdatePayload";

class API {
  accessToken: string | undefined;
  headers: { [name: string]: string } = {
    "Content-type": "application/json",
    "system-version": "android_3.0.0",
    "user-agent": "okhttp/3.12.0",
    "api-version": "2", // enforced
  };

  get(url: string): Promise<any> {
    return fetch(`https://api.foodsi.pl${url}`, {
      method: "GET",
      headers: this.headers,
    });
  }

  post(url: string, body?: any): Promise<any> {
    return fetch(`https://api.foodsi.pl${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: this.headers,
    });
  }

  put(url: string, body?: any): Promise<any> {
    return fetch(`https://api.foodsi.pl${url}`, {
      method: "PUT",
      body: JSON.stringify(body!),
      headers: this.headers,
    });
  }

  patch(url: string, body?: any): Promise<any> {
    return fetch(`https://api.foodsi.pl${url}`, {
      method: "PATCH",
      body: JSON.stringify(body),
      headers: this.headers,
    });
  }

  _delete(url: string, body?: any): Promise<any> {
    return fetch(`https://api.foodsi.pl${url}`, {
      method: "DELETE",
      body: JSON.stringify(body),
      headers: this.headers,
    });
  }

  updateAuthInfo(headers: Headers) {
    this.headers["Access-Token"] = headers.get("access-token") ?? "";
    this.headers["Client"] = headers.get("client") ?? "";
    this.headers["Uid"] = headers.get("uid") ?? "";
  }
}

const api = new API();

const auth = (email: string, password: string): Promise<UserSignUpResponse> => {
  // this endpoint seems to be working the same for v2
  const payload: AuthPayload = {
    email,
    password,
  };
  return api.post("/api/v1/auth", payload).then((res) => res.json());
};

const signIn = (
  email: string,
  password: string
): Promise<UserSignInResponse> => {
  const payload: AuthPayload = {
    email,
    password,
  };
  return api
    .post("/api/v2/auth/sign_in", payload)
    .then((resp) => {
      api.updateAuthInfo(resp.headers);
      return resp;
    })
    .then((resp) => resp.json());
};

const getRatesReasons = (): Promise<ResponseRateReasons> => {
  return api.get("/api/v1/rates/reasons").then((resp) => resp.json());
};

const getUserOrders = (): Promise<OrdersResponse> => {
  return api.get("/api/v1/users/orders").then((res) => res.json());
};

const facebookCallback = (accessToken: string): Promise<any> => {
  const payload: FacebookCallbackPayload = {
    uid: api.headers["uid"],
    facebook_access_token: accessToken,
  };

  return api
    .post("/api/v1/facebook/callback", payload)
    .then((res) => res.json());
};

const addToFavourites = (restaurantId: number): Promise<any> => {
  const payload: DayAttribute = {
    restaurant_id: restaurantId,
  };

  return api
    .post("/api/v1/users/add_to_favourites", payload)
    .then((res) => res.json());
};

const collectOrder = (): Promise<any> => {
  const payload: OrderPickup = {
    order_id: 2137,
    collection_time: "",
  };

  return api.post("/api/v1/orders/collect", payload).then((res) => res.json());
};

const postOrder = (): Promise<any> => {
  const promoCodeDetails: PromoCodeDetails = {
    restaurant_id: 2137,
    amount: 1,
    promocode: "meow",
    referral_discount: true,
  };

  const payload: OrderPostPayload = {
    order: promoCodeDetails,
  };

  return api.post("/api/v1/orders", payload).then((res) => res.json());
};

const postRate = (): Promise<any> => {
  // returns an empty object for a test payload
  const payload: PostRatePayload = {
    rate: {
      order_id: 2137,
      overall: 2137,
      content: 2137,
      collection: 2137,
      collection_reason_id: 2137,
      content_reason_id: 2137,
    },
  };

  return api.post("/api/v1/rates", payload).then((res) => res.json());
};

const postDevice = (): Promise<any> => {
  const payload: PostDevicePayload = {
    device: {
      platform: "android",
      token: "meow",
    },
  };

  return api.post("/api/v2/devices", payload).then((res) => res.json());
};

const getRestaurants = (): Promise<any> => {
  const payload: RestaurantesFilterV2Payload = {
    page: 0,
    per_page: 15,
    distance: {
      lat: 51.768054,
      long: 19.409435,
      range: 30 * 1000,
    },
    hide_unavailable: false,
    food_type: [],
    // food_type: [
    //     "vegan",
    //     "bakery",
    //     "restaurant",
    //     "shop",
    // ],
    collection_time: {
      from: "00:00:00",
      to: "23:59:59",
    },
  };

  return api.post("/api/v2/restaurants", payload).then((res) => res.json());
};

const postPasswordPayloadRestaurant = (): Promise<
  StatusIndicatingResponseWrapper<undefined> | { message: string }
> => {
  // apparently works for non-restaurant accounts too
  const payload: PasswordPayload = {
    email: "alama@kota.com",
    redirect_url: "https://meow.com",
  };

  return api
    .post("/api/v1/restaurant/password", payload)
    .then((res) => res.json());
};

const signInRestaurant = (
  email: string,
  password: string
): Promise<
  StatusIndicatingResponseWrapper<undefined> | { message: string }
> => {
  // !TODO: api version changed, JSON model did too, most likely
  const payload: AuthPayload = {
    email: email,
    password: password,
  };

  return api
    .post("/api/v2/restaurant/sign_in", payload)
    .then((res) => res.json());
};

const updateUser = (): Promise<any> => {
  // doesn't work for neither v1 nor v2
  const payload: AuthPayload = {
    email: "alama@kota.com",
    name: "newname",
    password: "alamakota123",
  };
  return api.put("/api/v1/auth", payload).then((res) => res.text());
};

/**
 * This api method returns an HTML document containing form data for password change.
 * FORM DATA: -> URL: /api/v1/auth/password.${user.id}
    user[reset_password_token] -> provided in HTML
    user[password]
    user[password_confirmation] -> same as user[password]
 *
 */
const updatePassword = (
  newPassword: string
): Promise<StatusIndicatingResponseWrapper<undefined>> => {
  const payload: PasswordUpdatePayload = {
    user: {
      password: newPassword,
      password_confirmation: newPassword,
    },
  };

  return api.patch("/api/v1/auth/password", payload).then((res) => res.json());
};

const removeFromFavourites = (restaurantId: string): Promise<any> => {
  const payload = {
    restaurant_id: restaurantId,
  };

  return api
    ._delete(`/api/v1/users/remove_from_favourites`, payload)
    .then((res) => res.json());
};

export {
  auth,
  signIn,
  getRatesReasons,
  getUserOrders,
  facebookCallback,
  addToFavourites,
  collectOrder,
  postOrder,
  postRate,
  postDevice,
  getRestaurants as getRestaurantsV2,
  postPasswordPayloadRestaurant,
  signInRestaurant,
  updateUser,
  updatePassword,
  removeFromFavourites,
};
