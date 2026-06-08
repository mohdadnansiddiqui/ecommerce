import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceKey } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private readonly bases: Record<ServiceKey, string> = {
    auth: 'http://localhost:8081/api/v1',
    customers: 'http://localhost:8082/api/v1',
    products: 'http://localhost:8083/api/v1',
    carts: 'http://localhost:8084/api/v1',
    orders: 'http://localhost:8085/api/v1',
    payments: 'http://localhost:8086/api/v1',
    inventory: 'http://localhost:8087/api/v1',
    notifications: 'http://localhost:8088/api/v1',
    reviews: 'http://localhost:8089/api/v1'
  };

  constructor(private readonly http: HttpClient) {}

  get<T>(service: ServiceKey, path: string, params?: Record<string, string | number>) {
    return this.http.get<T>(`${this.bases[service]}${path}`, {
      params: params ? new HttpParams({ fromObject: this.stringify(params) }) : undefined
    });
  }

  post<T>(service: ServiceKey, path: string, body: unknown) {
    return this.http.post<T>(`${this.bases[service]}${path}`, body);
  }

  put<T>(service: ServiceKey, path: string, body: unknown) {
    return this.http.put<T>(`${this.bases[service]}${path}`, body);
  }

  patch<T>(service: ServiceKey, path: string, body: unknown) {
    return this.http.patch<T>(`${this.bases[service]}${path}`, body);
  }

  delete<T>(service: ServiceKey, path: string) {
    return this.http.delete<T>(`${this.bases[service]}${path}`);
  }

  private stringify(params: Record<string, string | number>): Record<string, string> {
    return Object.fromEntries(Object.entries(params).map(([key, value]) => [key, String(value)]));
  }
}
