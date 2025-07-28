import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TemperatureHumidity } from '../models/temperature-humidity.model';
import { TemperatureHumidityService } from '../services/temperature-humidity-service';
import { WeightService } from '../services/weight-service';
import { Weight } from '../models/weight.model';
import { BodyWeightService } from '../services/body-weight-service';
import { BodyWeight } from '../models/body-weight.model';

@Component({
  selector: 'app-sensors',
  imports: [CommonModule],
  templateUrl: './sensors.html',
  styleUrl: './sensors.css'
})
export class Sensors {
  sensorData = {
    temperature: 22.5,
    humidity: 45,
    scaleWeight: 0.0,
    scaleUnit: 'g',
    bodyWeight: 68.6,
    bodyWeightUnit: 'kg',
    bodyFat: 18.5,
    muscleMass: 32.1,
    waterPercentage: 58.2,
    boneMass: 2.8,
    bmi: 22.4,
    timerSeconds: 0,
    timerRunning: false
  };

  // Timer & intervals
  private timerInterval?: any;
  private sensorUpdateInterval?: any;

  // UI states
  climateTimestamp = '';
  scaleTimestamp = 'Ready to weigh';
  bodyScaleTimestamp = '';
  timerStatus = 'Ready';
  timerDisplay = '00:00';
  completedToday = 0;
  totalMeasurements = 0;
  activeUnit = 'g';
  bmiCategory = '';
  climateAlertMessage = '';
  climateAlertVisible = false;

  temhum: TemperatureHumidity | null = null;
  weight: Weight | null = null;
  bodyWeight: BodyWeight | null = null;

  constructor(private temperatureHumidityService: TemperatureHumidityService,
    private weightService: WeightService,
    private bodyWeightService: BodyWeightService) { }

  ngOnInit(): void {
    document.body.classList.add('sensors-body');
    this.initializeSensors();
    setInterval(() => {
      this.temperatureHumidityService.getLatestTemperatureHumidity().subscribe({
        next: (data) => {
          this.temhum = data;
        },
        error: (err) => {
          console.error('Error cargando TemperatureHumidity', err)
        }
      });
    }, 3000);
    setInterval(() => {
      this.weightService.getLatestWeight().subscribe({
        next: (data) => {
          this.weight = data;
        },
        error: (err) => {
          console.error('Error cargando Weight', err)
        }
      });
    }, 3000);
    setInterval(() => {
      this.bodyWeightService.getLatestBodyWeight().subscribe({
        next: (data) => {
          this.bodyWeight = data;
        },
        error: (err) => {
          console.error('Error cargando BodyWeight', err)
        }
      });
    }, 3000);
  }

  ngOnDestroy(): void {
    document.body.classList.remove('sensors-body');
    clearInterval(this.sensorUpdateInterval);
    clearInterval(this.timerInterval);
  }

  initializeSensors(): void {
    this.updateSensorData();
    this.sensorUpdateInterval = setInterval(() => this.updateSensorData(), 2000);

    this.simulateScaleReading();
    this.simulateBodyScaleReading();

    console.log('IoT Sensors Dashboard initialized');
  }

  updateSensorData(): void {
    // Update temperature ±0.5°C bounded between 18 and 30
    this.sensorData.temperature += (Math.random() - 0.5) * 1;
    this.sensorData.temperature = Math.min(30, Math.max(18, this.sensorData.temperature));

    // Update humidity ±2% bounded between 30 and 70
    this.sensorData.humidity += (Math.random() - 0.5) * 4;
    this.sensorData.humidity = Math.min(70, Math.max(30, this.sensorData.humidity));

    this.climateTimestamp = new Date().toLocaleTimeString();

    this.checkEnvironmentAlerts();
  }

  checkEnvironmentAlerts(): void {
    const h = this.sensorData.humidity;
    const t = this.sensorData.temperature;
    this.climateAlertVisible = true;

    if (h > 60) {
      this.climateAlertMessage = 'High humidity detected! Consider ventilation.';
    } else if (h < 35) {
      this.climateAlertMessage = 'Low humidity detected! Food may dry out faster.';
    } else if (t > 25) {
      this.climateAlertMessage = 'Temperature is elevated. Check food storage conditions.';
    } else {
      this.climateAlertMessage = 'Environment conditions are optimal for food storage.';
      this.climateAlertVisible = false;
    }
  }

  simulateScaleReading(): void {
    setInterval(() => {
      if (Math.random() < 0.1) {
        const change = (Math.random() - 0.5) * 100;
        this.sensorData.scaleWeight = Math.max(0, this.sensorData.scaleWeight + change);
        this.updateScaleDisplay();
      }
    }, 3000);
  }

  updateScaleDisplay(): void {
    let displayWeight = this.sensorData.scaleWeight;
    let displayUnit = this.sensorData.scaleUnit;

    if (displayUnit === 'oz') {
      displayWeight = this.sensorData.scaleWeight * 0.035274;
    } else if (displayUnit === 'lb') {
      displayWeight = this.sensorData.scaleWeight * 0.00220462;
    }

    this.sensorData.scaleWeight = +this.sensorData.scaleWeight.toFixed(1);
    displayWeight = +displayWeight.toFixed(displayUnit === 'g' ? 1 : (displayUnit === 'oz' ? 2 : 3));
    this.scaleTimestamp = this.sensorData.scaleWeight > 0 ? new Date().toLocaleTimeString() : 'Ready to weigh';
  }

  tareScale(): void {
    this.sensorData.scaleWeight = 0;
    this.updateScaleDisplay();
    // You can add visual feedback in template with an Angular variable if desired
  }

  changeUnit(unit: string): void {
    this.sensorData.scaleUnit = unit;
    this.activeUnit = unit;
    this.updateScaleDisplay();
  }

  addToFoodLog(): void {
    if (this.sensorData.scaleWeight > 0) {
      alert(`✅ Added to Food Log!\n\nWeight: ${this.sensorData.scaleWeight.toFixed(1)}${this.sensorData.scaleUnit}\nTimestamp: ${new Date().toLocaleString()}\n\nThe measurement has been saved to your nutrition tracking log.`);
      this.totalMeasurements++;
    } else {
      alert('⚠️ No weight detected. Please place an item on the scale first.');
    }
  }

  simulateBodyScaleReading(): void {
    setInterval(() => {
      if (Math.random() < 0.05) {
        this.sensorData.bodyWeight += (Math.random() - 0.5) * 0.2;
        this.sensorData.bodyWeight = Math.min(150, Math.max(40, this.sensorData.bodyWeight));

        this.sensorData.bodyFat += (Math.random() - 0.5) * 0.5;
        this.sensorData.bodyFat = Math.min(40, Math.max(5, this.sensorData.bodyFat));

        this.sensorData.waterPercentage += (Math.random() - 0.5) * 1;
        this.sensorData.waterPercentage = Math.min(75, Math.max(45, this.sensorData.waterPercentage));

        this.updateBodyScaleDisplay();
      }
    }, 5000);
  }

  updateBodyScaleDisplay(): void {
    // Calculate BMI based on assumed height
    const heightM = 1.75;
    this.sensorData.bmi = this.sensorData.bodyWeight / (heightM * heightM);

    // Update BMI category
    if (this.sensorData.bmi < 18.5) {
      this.bmiCategory = 'Underweight';
    } else if (this.sensorData.bmi < 25) {
      this.bmiCategory = 'Normal';
    } else {
      this.bmiCategory = 'Overweight';
    }

    this.bodyScaleTimestamp = new Date().toLocaleTimeString();
  }

  syncBodyData(): void {
    alert(`🔄 Syncing Body Data...\n\n✅ Weight: ${this.sensorData.bodyWeight.toFixed(1)}kg\n✅ Body Fat: ${this.sensorData.bodyFat.toFixed(1)}%\n✅ Muscle Mass: ${this.sensorData.muscleMass.toFixed(1)}kg\n✅ Water %: ${this.sensorData.waterPercentage.toFixed(1)}%\n✅ BMI: ${this.sensorData.bmi.toFixed(1)}\n\nData synchronized with health app and cloud storage!`);
  }

  setWeightGoal(): void {
    const currentWeight = this.sensorData.bodyWeight.toFixed(1);
    const goalWeightStr = prompt(`Set your weight goal (current: ${currentWeight}kg):`, '65.0');

    if (goalWeightStr && !isNaN(+goalWeightStr)) {
      const goalWeight = +goalWeightStr;
      const difference = Math.abs(goalWeight - this.sensorData.bodyWeight);
      const timeEstimate = Math.ceil(difference / 0.5); // 0.5kg/week

      alert(`🎯 Weight Goal Set!\n\nCurrent Weight: ${currentWeight}kg\nTarget Weight: ${goalWeight}kg\nDifference: ${difference.toFixed(1)}kg\nEstimated Time: ${timeEstimate} weeks\n\nYour personalized plan will be created based on your nutrition data!`);
    }
  }

  startTimer(): void {
    if (!this.sensorData.timerRunning) {
      const minutesStr = prompt('Enter timer duration in minutes:', '5');
      if (minutesStr && !isNaN(+minutesStr)) {
        this.sensorData.timerSeconds = +minutesStr * 60;
        this.sensorData.timerRunning = true;
        this.timerStatus = 'Running';
        this.updateTimerDisplay();

        this.timerInterval = setInterval(() => {
          this.sensorData.timerSeconds--;
          this.updateTimerDisplay();

          if (this.sensorData.timerSeconds <= 0) {
            this.timerComplete();
          }
        }, 1000);
      }
    }
  }

  pauseTimer(): void {
    if (this.sensorData.timerRunning) {
      clearInterval(this.timerInterval);
      this.sensorData.timerRunning = false;
      this.timerStatus = 'Paused';
    }
  }

  resetTimer(): void {
    clearInterval(this.timerInterval);
    this.sensorData.timerRunning = false;
    this.sensorData.timerSeconds = 0;
    this.timerStatus = 'Ready';
    this.updateTimerDisplay();
  }

  updateTimerDisplay(): void {
    const minutes = Math.floor(this.sensorData.timerSeconds / 60);
    const seconds = this.sensorData.timerSeconds % 60;
    this.timerDisplay = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  timerComplete(): void {
    clearInterval(this.timerInterval);
    this.sensorData.timerRunning = false;
    this.timerStatus = 'Complete!';
    this.completedToday++;
    alert('⏰ Timer Complete!\n\nYour cooking timer has finished. Check your food!');
  }

  calibrateClimate(): void {
    alert('🔧 Climate Sensor Calibration\n\nCalibrating temperature and humidity sensors...\n\nCalibration complete! Sensors are now optimized for accuracy.');
  }

  calibrateScale(): void {
    alert('⚖️ Scale Calibration\n\nPlace a known weight (e.g., 100g) on the scale and follow the prompts.\n\nCalibration will ensure maximum accuracy for your measurements.');
  }

  exportClimateData(): void {
    alert('📊 Export Climate Data\n\nGenerating CSV file with:\n• 24-hour temperature readings\n• Humidity measurements\n• Environmental alerts\n\nData exported successfully!');
  }
}
