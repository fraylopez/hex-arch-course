import { expect } from "chai";
import { Blog } from "../../src/models/Blog";
import { Post } from "../../src/models/Post";
import { TestUtils } from "../../../utils/TestUtils";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getUnitTestPath(__dirname, Blog)}`, () => {
    let blog: Blog;
    beforeEach(() => {
      blog = new Blog();
    });
    it('should add posts', () => {
      blog.post(new Post('John', "Hellow blog"));
      expect(blog.size).eq(1);
    });

    it('should get newer posts first', async () => {
      blog.post(new Post('John', "Hellow blog"));
      await new Promise(resolve => setTimeout(resolve, 10));
      blog.post(new Post('John', "Hellow blog 2"));
      expect(blog.getNewerPosts("John").shift()?.date).greaterThan(blog.getNewerPosts("John").pop()!.date);
    });
  });
});