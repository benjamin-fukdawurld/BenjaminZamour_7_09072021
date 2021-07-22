import { Request, Response } from 'express';
import PwdValidator from 'password-validator';

const schema = new PwdValidator();
schema
  .is()
  .min(6)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits()
  .has()
  .symbols()
  .is()
  .not()
  .oneOf(['Pa$$w0rd', 'Pa$sw0rd', 'Pas$w0rd']);

export default function passwordChecker(req: Request, res: Response, next: any) {
  const failedRules = schema.validate(req.body.password, { list: true });
  if (failedRules.length !== 0) {
    res.status(400).send({ message: 'Password is not strong enough', failedRules });
    return;
  }

  next();
}

export { schema };
