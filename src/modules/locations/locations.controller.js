import Location from './locations.model.js';
import { Types } from 'mongoose'

export default class LocationController {

  static async createLocation (req, res, next) {
    const { body: { 
      name,
      femaleCount,
      maleCount,
      parentLocationId,
    } } = req;

    if(parentLocationId) {
      const parentLocation = await Location.findOne(
        Types.ObjectId(parentLocationId)
      );
      if (!parentLocation) {
        return res.status(404).json({
          status: 'fail',
          message: 'Parent location not found',
          errorCode: 'UNKNOWPARENTLOCATION',
        });
      }
    }

    let createdLocation;
    try {
      createdLocation = await Location.create({
        name,
        femaleCount,
        maleCount,
        parentLocationId,  
      });
    } catch (error) /* istanbul ignore next: server/database crash */{
      console.error(error);
      return res.status(500).json({
        message: 'An error occured creating new locaion',
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Created location successfully',
      data: { createdLocation },
    });
  }
}
