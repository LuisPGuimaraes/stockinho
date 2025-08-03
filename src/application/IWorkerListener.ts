export interface IWorkerListener {
  onMessage(message: Record<string, any>): Promise<void>;
}
