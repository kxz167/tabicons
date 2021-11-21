import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// The url length of the icon handler.
const URL_LENGTH = 13;

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.css']
})
export class IconDisplayComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }


  ngOnInit(): void {
    console.warn(this.router.url.slice(URL_LENGTH));
    console.warn(this.route);
  }

}
