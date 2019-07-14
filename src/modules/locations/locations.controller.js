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
      data: { createdLocation, parentLocation },
    });
  }

  /**
   * get locations with demographic data
   */
  static async listLocations(req, res, next) {
    const locations = await Location.find();
    const childLocationsTotals = await Location.aggregate([
      {
        $group: {
          _id: '$parentLocationId',
          childrenMaleCount: { $sum: '$maleCount' },
          childrenFemaleCount: { $sum: '$femaleCount' },
        },
      },
      {
        $project: {
          _id: 0,
          locationId: '$_id',
          childrenMaleCount: 1,
          childrenFemaleCount: 1,
        }
      }
    ]);
    
    const locations_ = [];
    locations.forEach(location => {
      childLocationsTotals.forEach((totals, index) => {
        if (totals.locationId === location._id.toString()) {
          const { femaleCount, maleCount, name, _id, parentLocationId } = location;
          locations_.push({
            name, _id, parentLocationId,
            totalMaleCount: location.maleCount + totals.childrenMaleCount,
            totalFemaleCount: location.femaleCount + totals.childrenFemaleCount,
          });
          childLocationsTotals.splice(index, 1);
        } else {
          locations_.push(location);
        }
      });
    })
    return res.status(200).json({
      status: 'success',
      message: 'Retrived locations successfully',
      data: { locations: locations_ },
    });
  }

  /**
   * Update locations
   */
  static async updateLocation (req, res, next) {
    const {
      body: {
        name,
        parentLocationId,
        femaleCount,
        maleCount,
      },
      params: { id },
    } = req;
    
    const updatedLocation = await Location.findOneAndUpdate(
      Types.ObjectId(id),
      { $set: { name, parentLocationId, femaleCount, maleCount, } },
      { new: true }
    );

    if(!updatedLocation) {
      return res.status(400).json({
        status: 'fail',
        message: 'Location not found',
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Updated location successfully',
      data: { updatedLocation },
    })
  }
}
