import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebWorkerService {
  worker: Worker;
  constructor() {}

  initAnalyticsWorker() {
    this.worker = new Worker('analytics.worker.js');
  }

  sendMessage(data: any) {
    this.worker.postMessage(data);
  }
}
