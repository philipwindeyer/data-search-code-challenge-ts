import { expect } from "chai";
import { getUser } from "../../../src/data-repository/models";

describe("getUser", () => {
  const sample = {
    _id: 34,
    url: "http://initech.zendesk.com/api/v2/users/34.json",
    external_id: "36dc7f6c-4b66-4a0e-bf0b-1b2b294ca730",
    name: "Gallegos Armstrong",
    alias: "Mr Dale",
    created_at: "2016-02-09T01:34:46 -11:00",
    active: true,
    verified: false,
    shared: true,
    locale: "de-CH",
    timezone: "Papua New Guinea",
    last_login_at: "2015-02-04T06:17:46 -11:00",
    email: "dalearmstrong@flotonic.com",
    phone: "8904-083-951",
    signature: "Don't Worry Be Happy!",
    organization_id: 111,
    tags: ["Munjor", "Kula", "Osage", "Shindler"],
    suspended: true,
    role: "agent",
  };

  describe("#new", () => {
    let user: ReturnType<typeof getUser>;

    beforeEach(() => {
      user = getUser(sample);
    });

    it("build an user object from data", () => {
      const {
        getOrganization,
        getTickets,
        getSearchableFields,
        ...userProps
      } = user;

      expect(userProps).to.deep.equal(sample);
    });
  });
});
