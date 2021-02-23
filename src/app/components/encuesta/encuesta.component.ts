import { Component, OnInit } from '@angular/core';
import { Label } from 'ng2-charts';
import { ChartType, ChartDataSets } from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.css']
})
export class EncuestaComponent implements OnInit {

  public barChartLabels: Label[] = ['2006', '2007', '2008', '2009'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81], label: 'Series A' }
  ];


  constructor( private http: HttpClient, public wsService:WebsocketService ) { }

  ngOnInit() {
    this.http.get('http://localhost:5000/grafica')
    .subscribe( (data: any) => {
      this.barChartData = data;
    });
    this.escucharSocket();
  }

  escucharSocket(){
    this.wsService.listen('cambio-grafica')
  }

}
