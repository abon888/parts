
import { Application, Request, Response, NextFunction, Router } from "express";

export class Routes {

  constructor(app: Application) {

    app.route("/api/part/:id").get( async (req: Request, res: Response, next: NextFunction ) => {

      let PathsMapping = require( '@BASELIB/js_paths_mapping' ).PathsMapping;
      let _Part = PathsMapping.pmRequire('@APP_MODELS/part');
      let Part = _Part.default;

console.log( JSON.stringify( req.params ) );
console.log( `------${req.params.id}` );
      let part = await Part.findById(req.params.id);
      res.json( part );
    } );
  }
}
