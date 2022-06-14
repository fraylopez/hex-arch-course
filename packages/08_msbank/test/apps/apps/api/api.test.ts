import { BankAPI } from "../../../../src/apps/api/BankAPI";
import { expect } from "chai";
import { TestUtils } from "../../../../../utils/TestUtils";
import * as uuid from 'uuid';

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getAcceptanceTestPath(__dirname, "BankAPI")}`, () => {

    let api: BankAPI;
    before(() => {
      api = new BankAPI();
      api.run();
    });

    after(() => {
      api.stop();
    });

    describe('/account/:accountId', () => {
      it('should respond with 200 on POST', async () => {
        const accountId = uuid.v4();
        const response = await TestUtils.localRequest(
          `/account/${accountId}`,
          "POST",
          { name: "John", currency: "EUR" },
        );
        expect(response.status).to.equal(200);
      });
      it('should respond with 200 and account on GET', async () => {
        const accountId = uuid.v4();
        await TestUtils.localRequest(`/account/${accountId}`, "POST", { name: "John", currency: "EUR" });
        const response = await TestUtils.localRequest(
          `/account/${accountId}`,
          "GET",
        );
        expect(response.status).to.equal(200);
        expect(response.data).to.deep.equal({
          accountId,
          holder: "John",
          balance: "0 EUR",
        });
      });
    });

    describe('/deposit', () => {
      it('should respond with 200 on POST /deposit', async () => {
        const accountId = uuid.v4();
        await TestUtils.localRequest(`/account/${accountId}`, "POST", { name: "John", currency: "EUR" });

        const depositResponse = await TestUtils.localRequest(
          "/deposit",
          "POST",
          { accountId, amount: 100, currency: "EUR" },
        );
        expect(depositResponse.status).to.equal(200);
      });
    });
  });
});

