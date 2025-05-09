import * as THREE from "three";
import { EventListener } from "@/store/interact.js";
import { Camera } from "@/store/camera.js";
import { CellPositions, color_mtypes } from "@/store/cells.js";
import { Shape } from "@/store/shape.js";


export class World {
  constructor(io_layer, dcn_layer, granular_layer, molecular_layer, purkinje_layer) {
    this.loaded_meshes = {};
    this.points = null;
    this.camera = new Camera(40, window.innerWidth / window.innerHeight, 0.1, 1500);
    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer({ alpha: false, preserveDrawingBuffer: true, antialias: false });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setClearColor(new THREE.Color("#000000"), 1);
    // this.renderer.setClearColor( new THREE.Color("#FFFFFF"), 1 );
    this.renderer.sortObjects = true;
    this.updated = false;

    if (io_layer) {
      new Shape(
        -1, null, this.add_mesh.bind(this), [300, 200, 200],
        "io layer", color_mtypes.io, 100, [150.0, 350.0, 100.0], 0.5, true
      );
    }
    if (dcn_layer) {
      new Shape(
        -2, null, this.add_mesh.bind(this), [300, 200, 200],
        "dcn layer", color_mtypes.dcn_p, 100, [150, 150, 100], 0.5, true
      );
    }
    if (granular_layer) {
      new Shape(
        -3, null, this.add_mesh.bind(this), [300, 130, 200],
        "granular layer", [0.7, 0.15, 0.15, 1.0], 100, [150, -50, 100], 0.5, true
      );
    }
    if (purkinje_layer) {
      new Shape(
        -4, null, this.add_mesh.bind(this), [300, 15, 200],
        "purkinje layer", color_mtypes.purkinje_cell, 100, [150, 350 - 530, 100], 0.5, true
      );
    }
    if (molecular_layer) {
      new Shape(
        -5, null, this.add_mesh.bind(this), [300, 150, 200],
        "molecular layer", color_mtypes.basket_cell, 100, [150, 350 - 545, 100], 0.5, true
      );
    }

    let id_mtypes = {
      0: 'basket_cell', 1: 'dcn_i', 2: 'dcn_p', 3: 'io',
      4: 'glomerulus', 5: 'golgi_cell', 6: 'granule_cell',
      7: 'mossy_fibers', 8: 'purkinje_cell', 9: 'stellate_cell',
      10: 'ubc_glomerulus', 11: 'unipolar_brush_cell'
    };

    let visibility_mtypes = {
      basket_cell: molecular_layer,
      dcn_i: dcn_layer,
      dcn_p: dcn_layer,
      io: io_layer,
      glomerulus: false,
      golgi_cell: granular_layer,
      granule_cell: granular_layer,
      mossy_fibers: false,
      purkinje_cell: purkinje_layer,
      stellate_cell: molecular_layer,
      ubc_glomerulus: false,
      unipolar_brush_cell: granular_layer
    };

    new CellPositions(
      "data/cereb-circuit/",
      this.add_points.bind(this),
      600,
      0.5,
      [150.0, 350.0, 100.0],
      visibility_mtypes);

    this.renderer.setAnimationLoop(this.animate.bind(this));
    this.eventListener = new EventListener(this.camera, this.renderer);
  }

  init(container) {
    this.eventListener.init_interactions(container);
    this.renderer.render(this.scene, this.camera);
  }

  add_mesh(id, mesh) {
    this.loaded_meshes[id] = mesh;
    this.scene.add(mesh);
    if (!this.updated) {
      this.updated = true;
      mesh.onBeforeRender = function (renderer) { renderer.clearDepth(); };
    }
  }

  add_points(points) {
    this.points = points;
    this.scene.add(points);
    points.onBeforeRender = function (renderer) { renderer.clearDepth(); };
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.eventListener.update_camera();
    for (let i in this.loaded_meshes) {
      this.loaded_meshes[i].material.uniforms.camVx.value = this.camera.translation[0] - this.camera.glob_position[0];
      this.loaded_meshes[i].material.uniforms.camVy.value = this.camera.translation[1] - this.camera.glob_position[1];
      this.loaded_meshes[i].material.uniforms.camVz.value = this.camera.translation[2] - this.camera.glob_position[2];
    }
    if (this.points !== null && this.points.material !== undefined && this.points.material !== null) {
      this.points.material.uniforms.shaderZoom.value = this.eventListener.zoom;
    }
    this.updated = false;
  }
}

