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