import sinon, { SinonStubbedInstance } from "sinon";
import { PostController } from "../../src/controllers/PostController";
import { Blog } from "../../src/models/Blog";
import { BlogDAO } from "../../src/models/dao/BlogDAO";

describe('PostController', () => {
  let postController: PostController;
  let dao: SinonStubbedInstance<BlogDAO>;
  let sandbox: sinon.SinonSandbox;
  before(() => {
    sandbox = sinon.createSandbox();
    dao = sandbox.createStubInstance(BlogDAO);
    dao.persist.resolves();
    dao.get.resolves(new Blog());
    postController = new PostController(dao as any);
  });
  afterEach(() => {
    sandbox.reset();
  });
  it('should store a new post', async () => {
    await postController.post('John', 'Hello world');
    sinon.assert.calledOnce(dao.persist);
  });
});