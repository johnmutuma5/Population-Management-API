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
    let updatedParentLocation;

    try {
      if(parentLocationId) {
        /**
         * update the parent location to decrement population with the new 
         *  child location demographic details
         *  TODO catch edge case - ensure that the child location population is
         *    not more than the parent population.
         *    Child location numbers should be within the parent location numbers
         */
        updatedParentLocation = await Location.findOneAndUpdate(
          Types.ObjectId(parentLocationId),
          { $inc: { femaleCount: -femaleCount, maleCount: -maleCount } },
          { new: true }, // return the updated document
        );

        if (!updatedParentLocation) {
          return res.status(404).json({
            status: 'fail',
            message: 'Parent location not found',
            errorCode: 'UNKNOWPARENTLOCATION',
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
