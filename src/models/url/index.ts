import { Schema, models, model } from "mongoose"

interface IUrl {
  origin: string
  shorten: string
  author?: string
  deleted?: boolean
}

const urlSchema = new Schema<IUrl>({
  origin: {
    type: String,
    required: true,
  },
  shorten: {
    type: String,
    required: true,
    unique: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    default: null,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
})

const Url = models.Url || model("Url", urlSchema)

export default Url