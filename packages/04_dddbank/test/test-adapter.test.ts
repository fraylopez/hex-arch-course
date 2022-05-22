
import chai, { expect } from "chai";
import { MemoryAccountRepository } from "../src/contexts/accounting/infrastructure/persistance/memory/MemoryAccountRepository";
import { Bank } from "../src/contexts/accounting/application/Bank";
import { ForUsingAccounts } from "../src/contexts/accounting/domain/ForUsingAccounts";
import { IncompatibleCurrencyError } from "../src/contexts/accounting/domain/IncompatibleCurrencyError";
import { Money } from "../src/contexts/_shared/domain/Money";
import chaiAsPromised from "chai-as-promised";

chai.use(chaiAsPromised);

describe('DDDBank TestAdapter', () => {
  let testAdapter: ForUsingAccounts;
  before(() => {
    testAdapter = new Bank(new MemoryAccountRepository());
  });

  it('should create and retrieve an account', async () => {
    const accountId = await testAdapter.create('John', "EUR");
    const account = await testAdapter.find(accountId);
    expect(account).to.not.equal(undefined);
  });

  it('should deposit same currency amount', async () => {
    const accountId = await testAdapter.create('John', "EUR");
    await testAdapter.deposit(accountId, 100, "EUR");
    const account = await testAdapter.find(accountId);
    expect(account.getBalance()).to.deep.equal(new Money(100, "EUR"));
  });

  it('should reject deposit other currency amount', async () => {
    const accountId = await testAdapter.create('John', "EUR");
    await expect(testAdapter.deposit(accountId, 100, "USD"))
      .to.be.rejectedWith(IncompatibleCurrencyError);
  });

  it('should witdraw same currency amount', async () => {
    const accountId = await testAdapter.create('John', "EUR");
    await testAdapter.deposit(accountId, 100, "EUR");
    await testAdapter.withdraw(accountId, 99, "EUR");
    const account = await testAdapter.find(accountId);
    expect(account.getBalance()).to.deep.equal(new Money(1, "EUR"));
  });

  it('should reject withdraw other currency amount', async () => {
    const accountId = await testAdapter.create('John', "EUR");
    await expect(testAdapter.withdraw(accountId, 99, "USD"))
      .to.be.rejectedWith(IncompatibleCurrencyError);
  });

  it.skip('should reject withdraw more than balance', async () => {
    // TODO
  });
});