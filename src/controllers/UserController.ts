import * as express from 'express';

class UserController {
  private path: string = '/users';

  public router: express.Router;

  constructor() {
    this.router = express.Router();

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(this.path, this.store);
    this.router.put(this.path, this.update);
    this.router.delete(this.path, this.delete);
  }

  private async store() {
    console.log('store');
  }

  private async update() {
    console.log('update');
  }

  private async delete() {
    console.log('delete');
  }
}

export { UserController };
