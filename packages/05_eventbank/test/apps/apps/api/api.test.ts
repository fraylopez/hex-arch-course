import { BankAPI } from "../../../../src/apps/api/BankAPI";
import { expect } from "chai";
import { TestUtils } from "../../../../../utils/TestUtils";
describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('API', () => {
    let api: BankAPI;
    before(() => {
      api = new BankAPI();
      api.run();
    });

    after(() => {
      api.stop();
    });

    describe('/account', () => {
      it('should respond with 200 on POST', async () => {
        const response = await TestUtils.localRequest(
          "/account",
          "POST",
          { name: "John", currency: "EUR" },
        );
        expect(response.status).to.equal(200);
      });
    });
    describe('/account/:accountId', () => {
      it('should respond with 200 and account on GET', async () => {
        const creationResponse = await TestUtils.localRequest("/account", "POST", { name: "John", currency: "EUR" });
        const response = await TestUtils.localRequest(
          `/account/${creationResponse.data.id}`,
          "GET",
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal({
          accountId: creationResponse.data.id,
          holder: "John",
          balance: "0 EUR",
        });
      });
    });

    describe('/account/deposit', () => {
      it('should respond with 200 on POST /account/deposit', async () => {
        const creationResponse = await TestUtils.localRequest("/account", "POST", { name: "John", currency: "EUR" });
        const depositResponse = await TestUtils.localRequest(
          "/account/deposit",
          "POST",
          { accountId: creationResponse.data.id, amount: 100, currency: "EUR" },
        );
        expect(depositResponse.status).to.equal(200);
      });
    });
  });
});

