import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColorEvent } from 'ngx-color';

// The url length of the icon handler.
const URL_LENGTH = 13;

@Component({
  selector: 'app-icon-display',
  templateUrl: './icon-display.component.html',
  styleUrls: ['./icon-display.component.css']
})
export class IconDisplayComponent implements OnInit, AfterViewInit {

  styleElement!:any;
  prevStyleEntry!:any;
  stringRgbVal!:string;

  onAfterSVGSourced: boolean = false;
  imageFailed: boolean = false;
  @ViewChild("svgObjectContainer") svgObjectContainer!: ElementRef;
  @ViewChild("svgObject") svgObjectView!: ElementRef;

  searchUrl!: string;   //The icon url given by user
  iconUri!: string;   //The icon asset path
  oldIcon: HTMLLinkElement | null = document.querySelector('#tab-favicon');
  imageSelector: string = "/materialicons/24px.svg";
  previousColor!: string;

  selectedFillColor!: string;
  constructor(
    private router: Router,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) { }

  noImage($event:Event):void {
    console.warn("modified");
    this.imageFailed = true;
  }

  setBackground($event: ColorEvent): void{
    this.renderer.setStyle(this.svgObjectContainer.nativeElement, "background", $event.color.hex);
  }

  changeComplete($event: ColorEvent): void{
    // Set the SVG color based on rgb values:
    let rgbVal = $event.color.rgb;
    this.stringRgbVal = "rgba(" + rgbVal.r + "," + rgbVal.g + "," + rgbVal.b + "," + rgbVal.a + ")";
    this.setSvgStyle(this.stringRgbVal)
  }

  // Get fill colors
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
  setSvgStyle(color?:string): void{
    // console.warn("Loaded");
    if(this.oldIcon != null && this.onAfterSVGSourced){   //Do not run when setting data source
      // Get the SVG Element inside of the object
      let svgObject = this.svgObjectView.nativeElement.contentDocument.children[0];

      //Create the styling element 
      let styleEntry = this.renderer.createText(":nth-child(2) { fill: " + (color != undefined ? color : this.fillColor()) + "; }");
      this.prevStyleEntry = styleEntry;
      if(this.styleElement != undefined){
        // console.warn("REMOVED")
        //Previous value set
        this.renderer.removeChild(this.renderer.parentNode(this.styleElement), this.styleElement); 
      }
      this.styleElement = this.renderer.createElement("style", "http://www.w3.org/2000/svg");
      this.renderer.appendChild(this.styleElement, styleEntry);  // insert style entry into style
      this.renderer.appendChild(svgObject, this.styleElement);   // insert style into svg object

      //Send the data in string format to the favicon.
      this.oldIcon.href = "data:image/svg+xml," + (new XMLSerializer().serializeToString(svgObject));
    }
  }

  updateUrl(){
    console.warn(this.stringRgbVal);
    this.router.navigateByUrl("/icon-display" + this.searchUrl + "?color="+this.stringRgbVal);
  }

  ngOnInit(): void {
    //Are there routes?
    this.route.queryParams.subscribe(params => {
      console.warn("parse");
      console.warn(params);
      this.selectedFillColor = params['color'];
      this.stringRgbVal = this.selectedFillColor;
    })

    // console.warn("Init");
    // Find the url that the user "searched" for.

    let regex = new RegExp('(?<=\/icon-display)(.*)(?=\\?)');
    let matches = this.router.url.match(regex);
    if(matches != null){
      this.searchUrl = matches[0];
    }
    console.warn(matches);
    // this.searchUrl = this.router.url.slice(URL_LENGTH);
    this.iconUri = "/assets/icons" + this.searchUrl + this.imageSelector;
  }

  ngAfterViewInit(){
    if(this.oldIcon != null){
      //Set the svgobject data
      this.renderer.listen(this.svgObjectView.nativeElement, "error_event", ($event => {
        console.warn("Errors");
        this.imageFailed = true;
      }));
      this.renderer.setAttribute(this.svgObjectView.nativeElement, "data", this.iconUri);
      this.onAfterSVGSourced = true;  //Enable next SVG callback

      //Change svg background so the image preview works:
      this.renderer.addClass(this.svgObjectContainer.nativeElement, (this.inDarkMode() ? "dark" : "light")); 
    }
  }

}
