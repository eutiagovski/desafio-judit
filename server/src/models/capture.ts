import { Schema, model } from "mongoose";

const captureSchema = new Schema(
  {
    list: {
      type: String,
      enum: ["backlog", "discover", "lead", "deal", "archived"],
    },
    request_id: String,
    lawsuit_cnj: String,
    process_data: Object

  },
  { timestamps: true }
);

const Capture = model("Capture", captureSchema);

export {Capture}