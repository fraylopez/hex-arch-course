/* eslint-disable max-classes-per-file */
import { expect } from "chai";
import sinon from "sinon";
import { TestUtils } from "../../../../../../../utils/TestUtils";
import { Command } from "../../../../../../src/contexts/_core/domain/Command";
import { CommandBus } from "../../../../../../src/contexts/_core/domain/CommandBus";
import { CommandHandler } from "../../../../../../src/contexts/_core/domain/CommandHandler";
import { CommandHandlerMap } from "../../../../../../src/contexts/_core/domain/CommandHandlerMap";
import { MessageClass } from "../../../../../../src/contexts/_core/domain/MessageClass";
import { MemoryCommandBus } from "../../../../../../src/contexts/_core/infrastructure/bus/memory/MemoryCommandBus";

describe(`${TestUtils.getPackagePath(__dirname)}`, () => {
  describe(`${TestUtils.getUnitTestPath(__dirname, MemoryCommandBus)}`, () => {
    let sandbox: sinon.SinonSandbox;
    let commandBus: CommandBus;
    let map: CommandHandlerMap;
    before(() => {
      sandbox = sinon.createSandbox();
      map = new CommandHandlerMap();
      commandBus = new MemoryCommandBus();
      commandBus.setMap(map);
    });

    afterEach(() => {
      sandbox.restore();
    });

    it('should publish command', async () => {
      const command = new SomeCommand();
      commandBus.publish(command);
    });

    it('should bind a handler to a command', () => {
      const spy = sandbox.spy(SomeCommandHandler.prototype, "handle");
      map.subscribe(new SomeCommandHandler());
      commandBus.publish(new SomeCommand());
      sinon.assert.calledOnce(spy);
      expect(spy.firstCall.args[0]).to.be.instanceOf(SomeCommand);
    });

    it('should retry handling', async () => {
      const stub = sandbox.stub(SomeCommandHandler.prototype, "handle");
      stub.onCall(0).rejects(new Error("error"));
      stub.onCall(1).resolves();
      map.subscribe(new SomeCommandHandler());
      commandBus.publish(new SomeCommand());
      await new Promise((resolve) => setTimeout(resolve, MemoryCommandBus.REDELIVERY_DELAY));
      await new Promise((resolve) => setTimeout(resolve, 0)); // safe delay async/await
      sinon.assert.calledTwice(stub);
    });

    it('should stop retrying on max retry attempts', async () => {
      const stub = sandbox.stub(SomeCommandHandler.prototype, "handle");
      const spyDeadLetter = sandbox.stub(console, "error");
      stub.rejects(new Error("error"));
      map.subscribe(new SomeCommandHandler());
      commandBus.publish(new SomeCommand());
      await new Promise((resolve) => setTimeout(resolve, MemoryCommandBus.DELIVERY_ATTEMPTS * MemoryCommandBus.REDELIVERY_DELAY));
      await new Promise((resolve) => setTimeout(resolve, 0)); // safe delay async/await
      sinon.assert.calledThrice(stub);
      sinon.assert.calledOnce(spyDeadLetter);
      sinon.assert.calledWith(spyDeadLetter, "Dead lettering", sinon.match.any, sinon.match.any);
    });
  });
});

class SomeCommand extends Command {
  constructor() {
    super(SomeCommand.name);
  }
}

class SomeCommandHandler implements CommandHandler {
  getSubscriptions(): MessageClass<Command>[] {
    return [SomeCommand];
  }
  handle(_command: SomeCommand): void | Promise<void> {/*  */ }
}