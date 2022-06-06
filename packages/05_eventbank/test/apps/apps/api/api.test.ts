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

    it('should respond with 200 on POST account', async () => {
      const response = await TestUtils.localRequest(
        "/accounts",
        "POST",
        { name: "John", currency: "EUR" },
      );
      expect(response.status).to.equal(200);
    });
  });
});

