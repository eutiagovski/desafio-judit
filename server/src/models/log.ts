import mongoose from "mongoose";

interface ILog {
  list_id: string;
  lawsuit_cnj: string;
  list_addition_date: string;
}

interface LogModelInterface extends mongoose.Model<LogDoc> {
  build(attr: ILog): LogDoc;
}

interface LogDoc extends mongoose.Document {
  list_id: string;
  lawsuit_cnj: string;
  list_addition_date: string;
}

const logSchema = new mongoose.Schema(
  {
    list_id: {
      type: String,
      required: true,
    },
    lawsuit_cnj: {
      type: String,
      required: true,
    },
    list_addition_date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

logSchema.statics.build = (attr: ILog) => {
  return new Log(attr);
};

const Log = mongoose.model<LogDoc, LogModelInterface>("Log", logSchema);

export { Log };
