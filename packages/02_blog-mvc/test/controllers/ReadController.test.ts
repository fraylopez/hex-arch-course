import { expect } from "chai";
import sinon, { SinonStubbedInstance } from "sinon";
import { ReadController } from "../../src/controllers/ReadController";
import { Blog } from "../../src/models/Blog";
import { BlogDAO } from "../../src/models/dao/BlogDAO";
import { Post } from "../../src/models/Post";

describe('ReadController', () => {
  let readController: ReadController;
  let dao: SinonStubbedInstance<BlogDAO>;
  let sandbox: sinon.SinonSandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    dao = sandbox.createStubInstance(BlogDAO);
    readController = new ReadController(dao as any);
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('should read blog posts', async () => {
    const blog = new Blog();
    blog.post(new Post('John', "Hellow blog"));
    dao.get.resolves(blog);
    const posts = await readController.read('John');
    expect(posts.length).eq(1);
  });
});