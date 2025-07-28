import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TemperatureHumidity } from '../models/temperature-humidity.model';

@Injectable({
  providedIn: 'root'
})
export class TemperatureHumidityService {

  private apiUrl = 'http://localhost:8080/temhum';

  constructor(private http: HttpClient) { }

  getTemperaturesHumidities(): Observable<TemperatureHumidity[]> {
    return this.http.get<TemperatureHumidity[]>(`${this.apiUrl}`);
  }

  getTemperatureHumidityById(id: number): Observable<TemperatureHumidity> {
    return this.http.get<TemperatureHumidity>(`${this.apiUrl}/${id}`);
  }

  getLatestTemperatureHumidity(): Observable<TemperatureHumidity> {
    return this.http.get<TemperatureHumidity>(`${this.apiUrl}/latest`);
  }

  createTemperatureHumidity(temperatureHumidity: TemperatureHumidity): Observable<TemperatureHumidity> {
    return this.http.post<TemperatureHumidity>(`${this.apiUrl}`, temperatureHumidity);
  }

  updateTemperatureHumidity(id: number, temperatureHumidity: TemperatureHumidity): Observable<TemperatureHumidity> {
    return this.http.put<TemperatureHumidity>(`${this.apiUrl}/${id}`, temperatureHumidity);
  }

  deleteTemperatureHumidity(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
