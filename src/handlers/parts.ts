
import * as Sequelize from 'sequelize';
import { Application, Request, Response, NextFunction, Router } from "express";

const Op = Sequelize.Op;

let PathsMapping: any;
let Part: any;

export class PartsHandler{

  constructor(){
    PathsMapping = require('@BASELIB/js_paths_mapping').PathsMapping;
    Part = PathsMapping.pmRequire('@APP_MODELS/part').default;
  }

  async getPart(partId: string): Promise<any>{
    return await Part.findById(partId);
  }

  async getParts(): Promise<any>{
    return await Part.findAll();
  }

  async updatePart(part_id: string, update: any): Promise<any>{
    return await Part.update( update, { where: {part_id: part_id } } );
  }

  async getRecentParts(filter: any ): Promise<any>{
    console.log( `current date: ${new Date(new Date().getTime() - 42 * 60 * 60 * 1000)}`);
    
    return await Part.findAll( {attributes: ['part_id', 'material', 'createdDate']}, 
      { where: { createdDate: {[Op.gte]: new Date(new Date().getTime() - 42 * 60 * 60 * 1000)}}});
  }

  async createPart(part: any): Promise<any>{
    return await Part.create({ 
      part_id: part.part_id, 
      description: part.description,
      category: part.category,
      material: part.material,
      mold_id: part.mold_id,
      weight_grams: part.weight_grams,
      image: part.image,
      documents: part.documents,
      sub_parts: part.sub_parts,
      workflow_id: part.workflow_id
    });
  }

  async getPartMold(partId: string): Promise<any>{
    return await Part.scope('mold').findById(partId);
  }

}
