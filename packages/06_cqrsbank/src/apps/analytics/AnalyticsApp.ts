import { AnalyticsCLIView } from "./AnalyticsCLIView";
import { TrackOnAccountCreatedEventHandler } from "../../contexts/analytics/application/TrackOnAccountCreatedEventHandler";
import { AnalyticsRepository } from "../../contexts/analytics/domain/AnalyticsRepository";
import { MemoryAnalyticsRepository } from "../../contexts/analytics/infrastructure/memory/MemoryAnalyticsRepository";
import { Tracker } from "../../contexts/analytics/application/Tracker";
import { DomainEventHandlerMap } from "../../contexts/_core/domain/DomainEventMapper";

export class AnalyticsCLIApp {
  private ui!: AnalyticsCLIView;
  private repositoryAdapter!: AnalyticsRepository;
  private eventMapper!: DomainEventHandlerMap;
  private hexagon!: Tracker;
  constructor() {
    this.createBindings();
  }

  public run(): void {
    this.ui.render();
  }

  private createBindings(): void {
    this.hexagonBindings();
    this.busBindings();
  }

  private hexagonBindings() {
    this.repositoryAdapter = new MemoryAnalyticsRepository();
    this.hexagon = new Tracker(this.repositoryAdapter);
    this.ui = new AnalyticsCLIView(this.hexagon);
  }

  private busBindings() {
    this.eventMapper = new DomainEventHandlerMap();
    this.eventMapper.subscribe(new TrackOnAccountCreatedEventHandler(this.hexagon));
  }
}
