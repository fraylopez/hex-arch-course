
import { expect } from "chai";
import { MemoryUserRepository } from "../src/adapters/secondary/MemoryUserRepository";
import { App } from "../src/hexagon/App";
import { ForCreatingUsers } from "../src/hexagon/ports/primary/ForCreatingUsers";

describe('TestAdapter', () => {
  let testAdapter: ForCreatingUsers;
  let repositoryAdapter: MemoryUserRepository;
  before(() => {
    repositoryAdapter = new MemoryUserRepository();
    testAdapter = new App(repositoryAdapter);
  });

  it('should store a user', async () => {
    await testAdapter.create('John', 42);
    const user = await repositoryAdapter.findByName('John');
    expect(user?.age).to.equal(42);
  });
});