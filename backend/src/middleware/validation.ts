import { NextFunction } from "express";
import { body, validationResult } from "express-validator";
import { Request, Response } from "express";

const handleValidationErrors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};


export const validateMyUserRequest = [
  body("name").isString().notEmpty().withMessage("Name must be string"),
  body("addressLine1")
    .isString()
    .notEmpty()
    .withMessage("AddressLine1 must be string"),
  body("city").isString().notEmpty().withMessage("city must be a string"),
  body("country").isString().notEmpty().withMessage("country must be a string"),
  handleValidationErrors,
];
export const validateMyRestaurantRequest = [
  body ("restaurantName").notEmpty().withMessage("Restaurant name is required"),
  body ("city").notEmpty().withMessage("city name is required"),
  body ("country").notEmpty().withMessage("country name is required"),
  body ("deliveryPrice").isFloat({min:0}).withMessage("deliveryPrice name is required"),
  body ("estimatedDeliveryPrice"). isInt({min:0}).notEmpty().withMessage("estimatedDeliveryTime must be positive"),
  body ("cuisines").isArray().notEmpty().withMessage("cuisines must be array"),
  body ("menuItems").isArray().withMessage("menuItems must be an array "),
  body ("menuItems.*.name").notEmpty().withMessage("menuItems name is mandate "),
  body ("menuItems.*.price").isFloat({min:0}).withMessage("menuItems name is mandate and must be positive number "),
handleValidationErrors
]