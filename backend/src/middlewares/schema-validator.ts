import { NextFunction, Request, Response } from 'express';

export function schemaValidator({
  bodySchema,
  querySchema
}: {
  bodySchema?: any;
  querySchema?: any;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      if (bodySchema) {
        req.body = bodySchema.parse(req.body);
      }
      if (querySchema) {
        req.query = querySchema.parse(req.query);
      }
      return next();
    } catch (err: any) {
      console.log(err);
      res.status(400).json({ message: err.issues });
    }
  };
}
