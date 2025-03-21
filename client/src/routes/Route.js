/**
 * A utility class for managing routes.
 */
class Route {
  /**
   * An array of route objects.
   * @type {Array}
   */
  static routes = [{}];

  /**
   * Retrieves the array of route objects.
   * @returns {Array} The array of route objects.
   */
  static getRoutes() {
    return this.routes;
  }
}

export default Route;