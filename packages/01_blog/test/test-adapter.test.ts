
import { expect } from "chai";
import { MemoryPostRepository } from "../src/hexagon/adapters/driven/MemoryBlogRepository";
import { BlogController } from "../src/hexagon/application/BlogController";
import { BlogRepository } from "../src/hexagon/ports/driven/BlogRepository";
import { ForPosting } from "../src/hexagon/ports/driver/ForPosting";
import { TestUtils } from "./../../utils/TestUtils";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe('Blog TestAdapter', () => {
    let testAdapter: ForPosting;
    let repositoryAdapter: BlogRepository;
    beforeEach(() => {
      repositoryAdapter = new MemoryPostRepository();
      testAdapter = new BlogController(repositoryAdapter);
    });

    it('should store a post', async () => {
      await testAdapter.post('John', "Hellow blog");
      const posts = await testAdapter.read('John');
      expect(posts.pop()?.content).to.equal("Hellow blog");
    });

    it('should retrieve all author posts ', async () => {
      await testAdapter.post('John', "Hellow blog");
      await testAdapter.post('John', "Hellow blog 2");
      const posts = await testAdapter.read('John');
      expect(posts.length).eq(2);
    });

    it('should retrieve all author posts sorted by descending date', async () => {
      await testAdapter.post('John', "Hellow blog");
      await new Promise(resolve => setTimeout(resolve, 10));
      await testAdapter.post('John', "Hellow blog 2");
      const posts = await testAdapter.read('John');
      expect(posts.shift()!.date).to.be.greaterThan(posts.pop()!.date);
    });
  });
});