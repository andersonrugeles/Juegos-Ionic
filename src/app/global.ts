export class GlobalComponent {
  public static carrito: Array<any> = [];
  constructor() {}
  public static agregarCarrito(objeto:any) {
    this.carrito.push(objeto);
  }
  public static obtenerCarrito() {
    return this.carrito;
  }
  public static setearCarrito(carritoNuevo: Array<any>) {
   this.carrito=carritoNuevo;
  }
  public static obtenerCantidadCarrito() {
    return this.carrito.length
   }
}
