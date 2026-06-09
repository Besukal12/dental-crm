import { Schema, model, Document, Types } from "mongoose";

export type PaymentStatus = "unpaid" | "partial" | "paid";

export interface ICheckout extends Document {
  _id: Types.ObjectId;
  patientId: Types.ObjectId;
  patientName: string;
  patientEmail: string;
  appointmentDate: Date;
  serviceProvided?: string;
  invoiceAmount: number;
  amountPaid: number;
  paymentStatus: PaymentStatus;
  emailSubject?: string;
  emailBody?: string;
  emailSent: boolean;
  emailSentAt?: Date;
  nextAppointmentDate?: Date;
  followUpNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const checkoutSchema = new Schema<ICheckout>(
  {
    patientId: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    patientName: { type: String, required: true },
    patientEmail: { type: String, required: true },

    appointmentDate: { type: Date, required: true },
    serviceProvided: { type: String, trim: true }, 

    // Billing for this specific visit
    invoiceAmount: { type: Number, default: 0 },
    amountPaid: { type: Number, default: 0 },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "partial", "paid"],
      default: "unpaid",
    },

    // Email content composed by staff before sending
    emailSubject: { type: String, trim: true },
    emailBody: { type: String, trim: true },

    // Tracks whether the email was sent
    emailSent: { type: Boolean, default: false },
    emailSentAt: { type: Date },

    nextAppointmentDate: { type: Date },
    followUpNotes: { type: String, trim: true },
  },
  { timestamps: true }
);

export const Checkout = model<ICheckout>("Checkout", checkoutSchema);
