import fetch, { Headers, RequestInit, Response } from "node-fetch";
import AuthPayload from "./applover.foodsi/a/a/b/AuthPayload";
import UserSignUpResponse from "./applover.foodsi/api.model.response/UserSignUpResponse";
import ResponseRateReasons from "./applover.foodsi/api.model.response/ResponseRateReasons";
import OrdersResponse from "./applover.foodsi/f/OrdersResponse";
import UserSignInResponse from "./applover.foodsi/api.model.response/UserSignInResponse";
import FacebookCallbackPayload from "./applover.foodsi/a/a/b/FacebookCallbackPayload";
import DayAttribute from "./applover.foodsi/a/a/b/DayAttribute";
import ReferralCodeUpdatePayload from "./applover.foodsi/a/a/b/ReferralCodeUpdatePayload";
import FileDetails from "./applover.foodsi/a/a/b/FileDetails";
import OrderPickup from "./applover.foodsi/a/a/b/OrderPickup";
import OrderPostPayload from "./applover.foodsi/a/a/b/OrderPostPayload";
import PromoCodeDetails from "./applover.foodsi/a/a/PromoCodeDetails";
import PostRatePayload from "./applover.foodsi/a/a/b/PostRatePayload";
import PostDevicePayload from "./applover.foodsi/a/a/b/PostDevicePayload";
import RestaurantFilterV1Payload from "./applover.foodsi/a/a/b/RestaurantFilterV1Payload";
import RestaurantesFilterV2Payload from "./applover.foodsi/a/a/b/RestaurantFilterV2Payload";
import PasswordPayload from "./applover.foodsi/a/a/b/PasswordPayload";
import StatusIndicatingResponseWrapper from "./applover.foodsi/api.model.response/StatusIndicatingResponseWrapper";
import PasswordUpdatePayload from "./applover.foodsi/a/a/b/PasswordUpdatePayload";
import PhoneUpdatePayload from "./applover.foodsi/a/a/b/PhoneUpdatePayload";
import RestaurantSchedulePatchPayload from "./applover.foodsi/a/a/b/RestaurantSchedulePatchPayload";

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
    // this.headers['expiry'] = headers.get('expiry') ?? "";
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

const sendValidation = (): Promise<any> => {
  // doesn't work
  return api.get("/api/v2/users/send_validation").then((res) => res.text());
};

const getUserOrders = (): Promise<OrdersResponse> => {
  return api.get("/api/v1/users/orders").then((res) => res.json());
};

const getUserFavourites = (): Promise<any> => {
  return api.get("/api/v1/users/favourites").then((res) => res.text());
};

const getOrder = (id: string): Promise<any> => {
  return api.get(`/api/v1/users/order/${id}`).then((res) => res.json());
};

const getOrderPaymentUrl = (id: string): Promise<any> => {
  return api.get(`/api/v2/orders/${id}/payment_url`).then((res) => res.text());
};

const showRestaurantStats = (id: string): Promise<any> => {
  return api
    .get(`/api/v2/restaurants/${id}/show_stats`)
    .then((res) => res.text());
};

const showRestaurantOrders = (id: string): Promise<any> => {
  return api.get(`/api/v2/restaurants/${id}/orders`).then((res) => res.json());
};

const showRestaurant = (id: string): Promise<any> => {
  return api.get(`/api/v1/restaurants/${id}/show`).then((res) => res.text());
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

const updateUserPicture = (): Promise<any> => {
  // doesn't work for neither v1 nor v2
  const payload: FileDetails = {
    file: "meow",
  };

  return api.post("/api/v2/users/picture", payload).then((res) => res.text());
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

const getRestaurantsV1 = (): Promise<any> => {
  const payload: RestaurantFilterV1Payload = {
    per_page: 100,
    page: 0,
    sort: "cheapest",
    user_favourites: 0,
    query: {
      name: null,
      types: ["vegan", "bakery", "restaurant", "shop"],
      open: {
        from: "00:00:00",
        until: "23:59:59",
      },
      distance: {
        lat: "51.768054",
        lng: "19.409435",
        range: 49000,
      },
      sold_out: 1,
    },
  };

  // int i = param1SharedPreferences.getInt("searchRange", 50);
  //   if (1 <= i && 50 > i) {
  //     Integer integer = Integer.valueOf(i * 1000);
  //   } else {
  //     param1SharedPreferences = null;
  //   }
  //   return (Integer)param1SharedPreferences;

  return api.post("/api/v1/restaurants", payload).then((res) => res.text());
};

const getRestaurantsV2 = (): Promise<any> => {
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

const postPasswordPayload = (): Promise<any> => {
  const payload: PasswordPayload = {
    email: "alama@kota.com",
    redirect_url: "https://meow.com",
  };

  return api.post("/api/v1/auth/password", payload).then((res) => res.json());
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
  const payload: AuthPayload = {
    email: email,
    password: password,
  };

  return api
    .post("/api/v1/restaurant/sign_in", payload)
    .then((res) => res.json());
};

const refreshToken = (): Promise<any> => {
  // doesn't work for neither v1 nor v2
  return api.post("/api/v1/refresh_token").then((res) => res.text());
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

const updateReferralCode = (): Promise<any> => {
  // doesn't work for neither v1 nor v2
  const payload: ReferralCodeUpdatePayload = {
    referral_code: "2137",
  };

  return api
    .patch("/api/v1/users/referral_code", payload)
    .then((res) => res.text());
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

const updatePhone = (newPhone: string): Promise<any> => {
  // doesn't work for neither v1 nor v2
  const payload: PhoneUpdatePayload = {
    phone: newPhone,
  };

  return api.patch("/api/v2/users/phone", payload).then((res) => res.text());
};

const updateRestaurantSchedule = (id: string): Promise<any> => {
  const payload: RestaurantSchedulePatchPayload = {
    days_attributes: [],
  };

  return api
    .patch(`/api/v2/restaurants/${id}/schedule`, payload)
    .then((res) => res.json());
};

export {
  auth,
  signIn,
  sendValidation,
  getRatesReasons,
  getUserOrders,
  getUserFavourites,
  getOrder,
  getOrderPaymentUrl,
  showRestaurantStats,
  showRestaurantOrders,
  showRestaurant,
  facebookCallback,
  addToFavourites,
  updateUserPicture,
  collectOrder,
  postOrder,
  postRate,
  postDevice,
  getRestaurantsV1, // !TODO: https://github.com/kacpi2442/am_bot/blob/main/watch_script.py#L281
  getRestaurantsV2,
  postPasswordPayload,
  postPasswordPayloadRestaurant,
  signInRestaurant,
  refreshToken,
  updateUser,
  updateReferralCode,
  updatePassword,
  updatePhone,
  updateRestaurantSchedule,
};
