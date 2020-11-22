import { expect } from "chai";
import { getOrganization } from "../../../src/data-repository/models";

describe("getOrganization", () => {
  const sample = {
    _id: 125,
    url: "http://initech.zendesk.com/api/v2/organizations/125.json",
    external_id: "42a1a845-70cf-40ed-a762-acb27fd606cc",
    name: "Strezzö",
    domain_names: [
      "techtrix.com",
      "teraprene.com",
      "corpulse.com",
      "flotonic.com",
    ],
    created_at: "2016-02-21T06:11:51 -11:00",
    details: "MegaCorp",
    shared_tickets: false,
    tags: ["Vance", "Ray", "Jacobs", "Frank"],
  };

  describe("#new", () => {
    let organization: ReturnType<typeof getOrganization>;

    beforeEach(() => {
      organization = getOrganization(sample);
    });

    it("build an organization object from data", () => {
      const {
        getUsers,
        getTickets,
        getSearchableFields,
        ...organizationProps
      } = organization;

      expect(organizationProps).to.deep.equal(sample);
    });
  });

  // // the tests container
  // it("checking default options", () => {
  //   // the single test
  //   const options = new Options(); // this will be your class

  //   /* detect retina */
  //   expect(options.detectRetina).to.be.false; // Do I need to explain anything? It's like writing in English!

  //   /* fps limit */
  //   expect(options.fpsLimit).to.equal(30); // As I said 3 lines above

  //   expect(options.interactivity.modes.emitters).to.be.empty; // emitters property is an array and for this test must be empty, this syntax works with strings too
  //   expect(options.particles.color)
  //     .to.be.an("object")
  //     .to.have.property("value")
  //     .to.equal("#fff"); // this is a little more complex, but still really clear
  // });
});
