import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// The url length of the icon handler.
const URL_LENGTH = 13;

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.css']
})
export class IconDisplayComponent implements OnInit, AfterViewInit {

  onAfterSVGSourced: boolean = false;
  @ViewChild("svgObjectContainer") svgObjectContainer!: ElementRef;
  @ViewChild("svgObject") svgObjectView!: ElementRef;

  searchUrl!: string;   //The icon url given by user
  iconUri!: string;   //The icon asset path
  oldIcon: HTMLLinkElement | null = document.querySelector('#tab-favicon');
  imageSelector: string = "/materialicons/24px.svg";


  //Styling
  selectedFillColor!: string;
  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  fillColor(): string{
    if(typeof(this.selectedFillColor) !== 'undefined'){
      return this.selectedFillColor;
    }
    else{
      return this.inDarkMode() ? "white" : "black"; 
    }
  }

  inDarkMode(): boolean{
    let matchList: MediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    return matchList.matches; //We have a match for prefering color scheme of dark
  }

  //Callback once the svg object gets loaded
  setSvgStyle(): void{
    console.warn("Loaded");
    if(this.oldIcon != null && this.onAfterSVGSourced){   //Do not run when setting data source
      // Get the SVG Element inside of the object
      let svgObject = this.svgObjectView.nativeElement.contentDocument.children[0];

      //Create the styling element 
      let styleElement = this.renderer.createElement("style", "http://www.w3.org/2000/svg");
      let styleEntry = this.renderer.createText(":nth-child(2) { fill: " + this.fillColor() + "; }");
      this.renderer.appendChild(styleElement, styleEntry);  // insert style entry into style
      this.renderer.appendChild(svgObject, styleElement);   // insert style into svg object

      //Send the data in string format to the favicon.
      this.oldIcon.href = "data:image/svg+xml," + (new XMLSerializer().serializeToString(svgObject));
    }
  }

  ngOnInit(): void {
    console.warn("Init");
    // Find the url that the user "searched" for.
    this.searchUrl = this.router.url.slice(URL_LENGTH);
    this.iconUri = "/assets/icons" + this.searchUrl + this.imageSelector;
  }

  ngAfterViewInit(){
    if(this.oldIcon != null){
      //Set the svgobject data
      this.renderer.setAttribute(this.svgObjectView.nativeElement, "data", this.iconUri);
      this.onAfterSVGSourced = true;  //Enable next SVG callback

      //Change svg background so the image preview works:
      this.renderer.setStyle(this.svgObjectContainer.nativeElement, "background",(this.inDarkMode() ? "black" : "white")); 
    }
  }

}
