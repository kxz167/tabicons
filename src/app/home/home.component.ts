import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  iconForm = new FormGroup({
    category: new FormControl(''),
    name: new FormControl('')
  })
  

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit(){
    console.warn(this.iconForm.value);
    this.router.navigateByUrl('/icon-display/' + this.iconForm.value["category"].toLowerCase().replaceAll(" ", "_") + "/" + this.iconForm.value["name"].toLowerCase().replaceAll(" ", "_"));
  }

}
