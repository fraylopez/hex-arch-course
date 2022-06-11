import { DomainEventMapper } from "../../../../src/contexts/_core/domain/DomainEventMapper";
import { EventBusFactory } from "../../../../src/apps/_shared/SharedServices";
import { Tracker } from "../../../../src/contexts/analytics/application/Tracker";
import { TrackOnAccountCreatedEventHandler } from "../../../../src/contexts/analytics/application/TrackOnAccountCreatedEventHandler";
import { AnalyticsRepository } from "../../../../src/contexts/analytics/domain/AnalyticsRepository";
import { MemoryAnalyticsRepository } from "../../../../src/contexts/analytics/infrastructure/memory/MemoryAnalyticsRepository";
import { DomainEvent } from "../../../../src/contexts/_core/domain/DomainEvent";
import { EventBus } from "../../../../src/contexts/_core/domain/EventBus";

export class AnalyticsTestApp {
  public hexagon!: Tracker;
  private repositoryAdapter!: AnalyticsRepository;
  private bus!: EventBus;
  constructor() {
    this.createBindings();
  }

  public publish(event: DomainEvent) {
    this.bus.publish(event);
  }

  private createBindings(): void {
    this.hexagonBindings();
    this.busBindings();
  }

  private hexagonBindings() {
    this.repositoryAdapter = new MemoryAnalyticsRepository();
    this.hexagon = new Tracker(this.repositoryAdapter);
  }

  private busBindings() {
    const eventMapper = new DomainEventMapper();
    eventMapper.subscribe(new TrackOnAccountCreatedEventHandler(this.hexagon));
    this.bus = EventBusFactory.get();
    this.bus.setMap(eventMapper);
  }
}
