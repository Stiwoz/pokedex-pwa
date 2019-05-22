import { Component, ViewChild, ElementRef, OnInit, Input } from '@angular/core';
import { Scene, WebGLRenderer, PerspectiveCamera, AmbientLight, Camera, ObjectLoader } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'model-viewer',
  templateUrl: './model-viewer.component.html',
  styleUrls: ['./model-viewer.component.scss'],
})
export class ModelViewerComponent implements OnInit {
  @Input() public pokemonName = 'bulbasaur';

  @ViewChild('canvas') private canvasEl: ElementRef<HTMLCanvasElement>;

  public progress = 0;

  private controls: OrbitControls;
  private element: HTMLElement;
  private scene = new Scene();
  private camera: Camera;
  private loader: ObjectLoader = new GLTFLoader();
  private renderer = new WebGLRenderer();

  ngOnInit(): void {
    this.initialiseWebGLObjectAndEnvironment();
    this.renderAnimation();
  }

  /**
   * Initialise the WebGL objecty to be generated using
   * selected ThreeJS methods and properties
   * @method initialiseWebGLObjectAndEnvironment
   */
  private initialiseWebGLObjectAndEnvironment(): void {
    const light = new AmbientLight(0xffffff, 1.65);
    this.scene.add(light);
    this.scene.scale.divideScalar(2.5);
    this.scene.translateY(-0.5);

    this.renderer.setSize(window.innerWidth, window.innerHeight - 56);
    this.renderer.setClearColor(0xf4f5f8);

    this.element = this.canvasEl.nativeElement;
    this.element.appendChild(this.renderer.domElement);

    this.loader.load(
      `assets/pkmn/${this.pokemonName}.gltf`,
      (gltf: any) => this.scene.add(gltf.scene),
      (event: ProgressEvent) => (this.progress = (event.loaded / event.total) * 100),
      (event: ErrorEvent) => console.error('[OBJECT LOADER] Error while loading obj:', event.error)
    );

    this.camera = new PerspectiveCamera(75, window.innerWidth / (window.innerHeight - 56), 0.1, 1000);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera);
    this.controls.minDistance = 3;
    this.controls.maxDistance = 15;
    this.controls.enablePan = false;
  }

  /**
   * Define the animation properties for the WebGL object rendered in the DOM element, using the requestAnimationFrame
   * method to animate the object
   * @method animate
   */
  private animate(): void {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
    requestAnimationFrame(this.animate.bind(this));
  }

  /**
   * Render the animation
   * @method renderAnimation
   */
  private renderAnimation(): void {
    // TODO: Check if webGL is available. If not, show error and bail.
    this.animate();
  }
}
