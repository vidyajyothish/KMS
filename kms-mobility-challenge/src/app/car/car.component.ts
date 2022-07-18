import { Component, Input, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Car } from '../models/car';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, NgForm, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css']
})
export class CarComponent implements OnInit {
  token: string = '';
  carList: Car[] = [];
  dataSource = new MatTableDataSource<Car>();
  displayedColumns: string[] = ['Id', 'Brand', 'Model', 'Navigation'];
  addCarForm: FormGroup = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl(''),
    navigation: new FormControl('')
  });
  preview: string = '';
  showMsg: boolean = false;
  showModelMsg: boolean = false;
  car: Car = new Car();
  constructor(private appService: AppService) { }
  get f(){
    return this.addCarForm.controls;
  }
  ngOnInit() {
    this.appService.login('test-user', 'test1234')
      .subscribe(result => {
        this.token = result.Content;
        this.appService.getCars()
          .subscribe(resultList => {
            this.carList = resultList;
            this.dataSource.data = resultList;
          })
      });

  }
  addCar(addCarForm: NgForm) {
    this.car = addCarForm.value;
  }
  onSubmit() {
    if(this.addCarForm.value.brand==""){
      this.showMsg=true;      
    }
    if(this.addCarForm.value.model==""){
      this.showModelMsg=true;
    }
    if(this.addCarForm.value.brand==""||this.addCarForm.value.model==""){
      return;
    }
    this.preview = JSON.stringify(this.addCarForm.value);
    this.appService.addCars(this.preview)
    .subscribe(resultList => {
      alert('Car added');
      this.carList.concat(resultList);
      this.dataSource.data = this.carList;
    },error=>{alert('Something went wrong');});
    
  }
  clearError(){
    this.showMsg=false; 
    this.showModelMsg=false;
  }
}
