
import { expect } from "chai";
import { MemoryPostRepository } from "../src/hexagon/adapters/driven/MemoryPostRepository";
import { Blog } from "../src/hexagon/application/Blog";
import { ForPosting } from "../src/hexagon/ports/primary/ForPosting";

describe('Blog TestAdapter', () => {
  let testAdapter: ForPosting;
  before(() => {
    const repositoryAdapter = new MemoryPostRepository();
    testAdapter = new Blog(repositoryAdapter);
  });

  it('should store a post', async () => {
    await testAdapter.post('John', "Hellow blog");
    const posts = await testAdapter.read('John');
    expect(posts.pop()?.content).to.equal("Hellow blog");
  });

  it('should retrieve all author posts sorted by descending date', async () => {
    await testAdapter.post('John', "Hellow blog");
    await testAdapter.post('John', "Hellow blog 2");
    const posts = await testAdapter.read('John');
    expect(posts).to.have.lengthOf(2);
  });
});