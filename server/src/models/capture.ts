import mongoose from "mongoose";

interface ICapture {
  list: {
    type: String;
    enum: ["backlog", "discover", "lead", "deal", "archived"];
  };
  request_id: string;
  lawsuit_cnj: string;
  process_data: object;
}

interface CaptureModelInterface extends mongoose.Model<CaptureDoc> {
  build(attr: ICapture): CaptureDoc;
}

interface CaptureDoc extends mongoose.Document {
  list: {
    type: String;
    enum: ["backlog", "discover", "lead", "deal", "archived"];
  };
  request_id: string;
  lawsuit_cnj: string;
  process_data: object;
}

const captureSchema = new mongoose.Schema(
  {
    list: {
      type: {
        type: String,
        enum: ["backlog", "discover", "lead", "deal", "archived"],
      },
      required: true,
    },
    request_id: {
      type: String,
      required: true,
    },
    lawsuit_cnj: {
      type: String,
      required: true,
    },
    process_data: {
      type: Object,
      required: true,
    },
  },
  { timestamps: true }
);

captureSchema.statics.build = (attr: ICapture) => {
  return new Capture(attr);
};

const Capture = mongoose.model<CaptureDoc, CaptureModelInterface>("Capture", captureSchema);

export { Capture };
