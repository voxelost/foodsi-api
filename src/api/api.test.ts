import { FetchError } from "node-fetch";
import {
  addToFavourites,
  auth,
  collectOrder,
  facebookCallback,
  getRatesReasons,
  getRestaurantsV2,
  getUserOrders,
  updatePassword,
  postDevice,
  postOrder,
  postPasswordPayloadRestaurant,
  postRate,
  signIn,
  signInRestaurant,
  updateUser,
  removeFromFavourites,
} from "./api";
import StatusIndicatingResponseWrapper from "./applover.foodsi/api.model.response/StatusIndicatingResponseWrapper";
import { Chance } from "chance";
import OrdersResponse from "./applover.foodsi/api.model.response/OrdersResponse";
import ResponseRateReasons from "./applover.foodsi/api.model.response/ResponseRateReasons";

const TEST_USER = {
  email: "alama@kota.com",
  password: "new_pass",
};

describe("auth", () => {
  it("should register a new user", () => {
    const generatedEmail = Chance().email();
    expect(auth(generatedEmail, TEST_USER.password)).resolves.toMatchObject({
      data: {
        uid: generatedEmail,
        email: generatedEmail,
      },
    });
  });

  it("shouldn't register a known user", () => {
    let expectedResponse: StatusIndicatingResponseWrapper<{ email: string }> = {
      status: "error",
      data: {
        email: TEST_USER.email,
      },
      errors: {
        email: ["został już zajęty"],
        full_messages: ["Adres e-mail został już zajęty"],
      },
    };
    expect(auth(TEST_USER.email, TEST_USER.password)).resolves.toMatchObject(
      expectedResponse
    );
  });
});

describe("signIn", () => {
  it("should sign in as registered user", () => {
    expect(signIn(TEST_USER.email, TEST_USER.password)).resolves.toMatchObject({
      data: {
        id: 953969,
        uid: TEST_USER.email,
        email: TEST_USER.email,
      },
    });
  });
});

describe("signInRestaurant", () => {
  it("should not sign in as a normal user", () => {
    const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
      success: false,
      errors: ["Nieprawidłowe dane logowania. Proszę spróbować ponownie."],
    };

    expect(
      signInRestaurant(TEST_USER.email, TEST_USER.password)
    ).resolves.toMatchObject(expectedResponse);
  });
});

describe("API method", () => {
  beforeAll(() => signIn(TEST_USER.email, TEST_USER.password));

  describe("getRatesReasons", () => {
    it("should return response rate reasons", () => {
      let expectedResponse: ResponseRateReasons = {
        content_reasons: [
          { id: 1, value: "Spodziewałem/am się większej porcji" },
          { id: 2, value: "Jedzenie nie było świeże" },
          { id: 3, value: "Spodziewałem/am się innej zawartości paczki" },
          { id: 7, value: "Coś innego" },
        ],
        collection_reasons: [
          { id: 4, value: "Personel nie wiedział o Foodsi" },
          { id: 5, value: "Nie czułem/am się mile widziany/a" },
          { id: 6, value: "Długo czekałem/am na zamówienie" },
          { id: 7, value: "Coś innego" },
        ],
      };

      expect(getRatesReasons()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("getUserOrders", () => {
    it("should return an empty orders response", () => {
      const expectedResponse: OrdersResponse = {
        orders: [],
      };

      expect(getUserOrders()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("facebookCallback", () => {
    it("should return an internal server error for invalid input", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        status: 500,
        error: "Internal Server Error",
      };
      expect(facebookCallback("")).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("addToFavourites", () => {
    it("should fail for zero package ID", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        errors: "Requested object not found",
      };
      expect(addToFavourites(0)).resolves.toMatchObject(expectedResponse);
    });

    it("should return an API error for a nonexistent package", () => {
      expect(addToFavourites(28)).resolves.toMatchObject({
        package: ["musi istnieć"],
      });
    });

    it("should return an empty string for a valid ID", () => {
      // ?TODO: if this is valid, change the response logic to accept and unmarshal an empty string
      expect(addToFavourites(2137)).rejects.toThrowError(FetchError);
    });
  });

  describe("collectOrder", () => {
    it("should work", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {};
      expect(collectOrder()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("postOrder", () => {
    it("should inform about incorrect promo code", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        errors: "Nieprawidłowy kod promocyjny.",
      };
      expect(postOrder()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("postRate", () => {
    it("should work", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {};
      expect(postRate()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("postDevice", () => {
    it("should work", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        status: "SUCCESS",
      };
      expect(postDevice()).resolves.toMatchObject(expectedResponse);
    });
  });

  describe("getRestaurantsV2", () => {
    it("should work", () => {
      expect(getRestaurantsV2()).resolves.toMatchObject({
        total_pages: 0,
        current_page: 0,
        data: [],
      });
    });
  });

  describe("postPasswordPayloadRestaurant", () => {
    it("should work", () => {
      expect(postPasswordPayloadRestaurant()).resolves.toMatchObject({
        success: true,
        message: `Wiadomość wysłana na adres '${TEST_USER.email}' zawiera instrukcje dotyczące zmiany hasła.`,
      });
    });
  });

  describe("updateUser", () => {
    it("should return 404", () => {
      expect(updateUser()).resolves.toContain(
        "<title>The page you were looking for doesn't exist (404)</title>"
      );
    });
  });

  describe("updatePassword", () => {
    it("should update password", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        success: "password changed.",
      };

      expect(updatePassword("new_pass")).resolves.toMatchObject(
        expectedResponse
      );
    });
  });

  describe("removeFromFavourites", () => {
    it("should return 'object not found' for zero ID", () => {
      const expectedResponse: StatusIndicatingResponseWrapper<undefined> = {
        errors: "Requested object not found",
      };

      expect(removeFromFavourites("0")).resolves.toMatchObject(
        expectedResponse
      );
    });

    it("should remove package from favourites", () => {
      // ?TODO: if this is valid, change the response logic to accept and unmarshal an empty string
      expect(removeFromFavourites("2137")).rejects.toThrowError(FetchError);
    });
  });
});
