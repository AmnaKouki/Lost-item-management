import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemsService {
  constructor(private httpClient: HttpClient) {}

  getAll() {
    return this.httpClient.get(
      `http://${window.location.hostname + environment.backendPort}/api/items`
    );
  }

  getMyItems() {
    return this.httpClient.get(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/my-items`
    );
  }

  getOne(id: string) {
    return this.httpClient.get(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/items/${id}`
    );
  }

  create(data: any) {
    return this.httpClient.post(
      `http://${window.location.hostname + environment.backendPort}/api/items`,
      data
    );
  }

  update(id: string, data: any) {
    return this.httpClient.put(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/items/${id}`,
      data
    );
  }

  delete(id: string) {
    return this.httpClient.delete(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/items/${id}`
    );
  }

  updateStatus(id: string, data: any) {
    return this.httpClient.put(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/item-status/${id}`,
      data
    );
  }

  getStats() {
    return this.httpClient.get(
      `http://${window.location.hostname + environment.backendPort}/api/stats`
    );
  }

  getItemByUUID(uuid: string) {
    return this.httpClient.get(
      `http://${
        window.location.hostname + environment.backendPort
      }/api/uuid/${uuid}`
    );
  }
}
