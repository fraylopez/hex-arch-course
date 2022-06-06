import { expect } from "chai";
import { Post } from "../../src/models/Post";
import { TestUtils } from "../../../utils/TestUtils";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getUnitTestPath(__dirname, Post)}`, () => {
    it('should a unique id', () => {
      const post = new Post("John", "Hellow blog");
      const post2 = new Post("John", "Hellow blog");
      expect(post.id).not.deep.equal(post2.id);
    });

    it('should set the creation date', () => {
      const post = new Post("John", "Hellow blog");
      expect(post.date).to.be.instanceOf(Date);
    });
  });
});