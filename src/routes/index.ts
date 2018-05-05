
import { Application, Request, Response, NextFunction, Router } from "express";
let PathsMapping: any;

export class Routes {

  private partsHandler;

  constructor(app: Application) {
    PathsMapping = require('@BASELIB/js_paths_mapping').PathsMapping;
    this._initHandlers();

    app.route("/api/part/:id").get( async (req: Request, res: Response, next: NextFunction ) => {
      if( req.params.id ){
        res.json( await this.partsHandler.getPart( req.params.id ) );
      } else{
        res.json( { Message: "ERROR: Must supply part id in the request." } );
      }
    } );

    app.route("/api/parts-q").get( async (req: Request, res: Response, next: NextFunction ) => {
      res.json( await this.partsHandler.getPart( req.query.part_id ) );
    } );

    app.route("/api/parts").get( async (req: Request, res: Response, next: NextFunction ) => {
      res.json( await this.partsHandler.getParts() );
    } );

    app.route("/api/parts/created-recently").get( async (req: Request, res: Response, next: NextFunction ) => {
      res.json( await this.partsHandler.getRecentParts() );
    } );

    app.route("/api/parts/update/:id").post( async (req: Request, res: Response, next: NextFunction ) =>{
      res.json( await this.partsHandler.updatePart( req.params.id, req.body) );
    });

  }

  private _initHandlers(): void{
    let PartsHandler = PathsMapping.pmRequire( '@MS_HANDLERS/parts' ).PartsHandler;
    this.partsHandler = new PartsHandler();
  }

}
