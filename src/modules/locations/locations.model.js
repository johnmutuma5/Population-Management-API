import mongoose, { Schema } from 'mongoose';

const locationSchema = new Schema({
    name: {
      type: String,
      required: true,
    },
    maleCount: {
      type: Number,
      required: true,
    },
    femaleCount: {
      type: Number,
      required: true,
    },
    parentLocationId: {
      type: String,
      required: false,
    },
});

export default mongoose.model('Location', locationSchema);
