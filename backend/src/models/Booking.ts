import { Schema, model, Document, Types } from "mongoose";

export interface IBooking extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone?: string;
  preferredDate?: Date;
  preferredTime?: string;
  serviceType?: string;
  message?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  patientId?: Types.ObjectId;
  staffNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    // Visitor details 
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, trim: true },

    // What they're requesting
    preferredDate: { type: Date },
    preferredTime: { type: String, trim: true }, 
    serviceType: { type: String, trim: true }, 
    message: { type: String, trim: true },

    // Clinic staff updates this after reviewing
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      default: null,
    },

    staffNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Booking = model<IBooking>("Booking", bookingSchema);
