import mongoose, { Document, Schema } from "mongoose"

interface IActivity {
  nodeId: string
  nodeTitle: string
  roadmapSlug: string
  roadmapTitle: string

  status: "learning" | "completed"

  date: Date
}

export interface IProgress extends Document {
  userId: mongoose.Types.ObjectId

  roadmapSlug: string
  roadmapTitle: string

  enrolledAt: Date

  completedNodes: string[]

  currentNode?: string | null

  percentComplete: number

  status: "active" | "paused" | "completed"

  lastUpdated?: Date

  activities: IActivity[]
}

const ActivitySchema = new Schema<IActivity>(
  {
    nodeId: String,

    nodeTitle: String,

    roadmapSlug: String,

    roadmapTitle: String,

    status: {
      type: String,
      enum: ["learning", "completed"],
    },

    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    _id: false,
  }
)

const ProgressSchema = new Schema<IProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    roadmapSlug: {
      type: String,
      required: true,
    },

    roadmapTitle: {
      type: String,
      required: true,
    },

    enrolledAt: {
      type: Date,
      default: Date.now,
    },

    completedNodes: {
      type: [String],
      default: [],
    },

    currentNode: {
      type: String,
      default: null,
    },

    percentComplete: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["active", "paused", "completed"],
      default: "active",
    },

    lastUpdated: {
      type: Date,
      default: Date.now,
    },

    activities: {
      type: [ActivitySchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

ProgressSchema.index(
  {
    userId: 1,
    roadmapSlug: 1,
  },
  {
    unique: true,
  }
)

export default mongoose.models.Progress ||
  mongoose.model<IProgress>("Progress", ProgressSchema)