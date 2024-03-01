import mongoose from "mongoose";

interface ICapture {
  list: string;
  request_id: string;
  lawsuit_cnj: string;
  process_data: string;
}

interface CaptureDoc extends mongoose.Document {
  request_id: string;
  process_data: string;
  lawsuit_cnj: string;
  list: string;
}

interface CaptrureModelInterface extends mongoose.Model<CaptureDoc>{
  build(atr:ICapture): CaptureDoc;
}

const captureSchema = new mongoose.Schema(
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

captureSchema.statics.build = (attr: ICapture) => {
  return new Capture(attr);
}
const Capture = mongoose.model<CaptureDoc, CaptrureModelInterface>("Capture", captureSchema);

export {Capture}