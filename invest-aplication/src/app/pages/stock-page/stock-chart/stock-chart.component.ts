import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stock-chart',
  templateUrl: './stock-chart.component.html',
  styleUrls: ['./stock-chart.component.scss'],
})
export class StockChartComponent implements OnInit, OnDestroy {
  @Input() data: any;  // Dados recebidos do componente pai
  private chart: Chart | undefined; // Armazena a instância do gráfico

  ngOnInit(): void {
    this.createChart();
  }

  ngOnDestroy(): void {
    // Destruir o gráfico quando o componente for destruído para evitar vazamento de memória
    if (this.chart) {
      this.chart.destroy();
    }
  }

  // Função para criar o gráfico
  createChart(): void {
    if (!this.data) return;  // Se não houver dados, não faz nada

    const labels = Object.keys(this.data).reverse(); // Reverter para exibir os dados de trás para frente
    const values = Object.values(this.data).map((item: any) => item.close).reverse();  // Pega os preços de fechamento

    // Verifica se o gráfico já foi criado, se sim, atualiza os dados
    if (this.chart) {
      this.chart.data.labels = labels;
      this.chart.data.datasets[0].data = values;
      this.chart.update();
    } else {
      // Cria o gráfico se ele ainda não existir
      const canvasElement = <HTMLCanvasElement>document.getElementById('stockChart');
      this.chart = new Chart(canvasElement, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Stock Price',
              data: values,
              borderColor: '#FF5733',
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Date',
              },
            },
            y: {
              title: {
                display: true,
                text: 'Price (USD)',
              },
            },
          },
        },
      });
    }
  }
}
