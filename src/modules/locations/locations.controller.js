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

    let createdLocation;
    let parentLocation;

    try {
      if(parentLocationId) {
        parentLocation = await Location.findOne(Types.ObjectId(parentLocationId));
        if (!parentLocation) {
          return res.status(404).json({
            status: 'fail',
            message: 'Parent location not found',
            errorCode: 'UNKNOWPARENTLOCATION',
          });
        }
        // check if the parent location has enough males to create a new sub location
        if (parentLocation.maleCount < maleCount) {
          return res.status(400).json({
            status: 'fail',
            errorCode: 'INADEQUATEHEADCOUNT',
            message: 'Not enough males in parent location to assign new location',
            parentLocation,
          });
        }
        // check if the parent location has enough females to create a new sub location
        if (parentLocation.femaleCount < femaleCount) {
          return res.status(400).json({
            status: 'fail',
            errorCode: 'INADEQUATEHEADCOUNT',
            message: 'Not enough females in parent location to assign new location',
            parentLocation,
          });
        }
      }

      createdLocation = await Location.create({
        name,
        femaleCount,
        maleCount,
        parentLocationId,  
      });

    } catch (error) /* istanbul ignore next: server/database crash */{
      console.error(error);
      return res.status(500).json({
        message: 'An error occured creating new location',
      });
    }

    return res.status(201).json({
      status: 'success',
      message: 'Created location successfully',
      data: { createdLocation, updatedParentLocation },
    });
  }
}
