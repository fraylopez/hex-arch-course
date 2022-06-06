import { AnalyticsCLIView } from "./AnalyticsCLIView";
import { TrackOnAccountCreatedEventHandler } from "../../contexts/analytics/application/TrackOnAccountCreatedEventHandler";
import { AnalyticsRepository } from "../../contexts/analytics/domain/AnalyticsRepository";
import { MemoryAnalyticsRepository } from "../../contexts/analytics/infrastructure/memory/MemoryAnalyticsRepository";
import { Tracker } from "../../contexts/analytics/application/Tracker";
import { DomainEventMapper } from "../_core/DomainEventMapper";

export class AnalyticsCLIApp {
  private ui!: AnalyticsCLIView;
  private repositoryAdapter!: AnalyticsRepository;
  private eventMapper!: DomainEventMapper;
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
    const hexagon = new Tracker(this.repositoryAdapter);
    this.ui = new AnalyticsCLIView(hexagon);
  }

  private busBindings() {
    this.eventMapper = new DomainEventMapper();
    this.eventMapper.subscribe(new TrackOnAccountCreatedEventHandler(this.repositoryAdapter));
  }
}
