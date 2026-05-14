import mongoose, { Document, Schema } from "mongoose"

interface IResource {
  type: "youtube" | "article" | "website" | "course" | "docs"
  title: string
  url: string
}

interface INode {
  id: string
  title: string
  description?: string
  subtopics: string[]

  difficulty: "Pemula" | "Menengah" | "Lanjutan"

  estimatedDays?: number

  resources: IResource[]

  order: number
}

export interface IRoadmap extends Document {
  slug: string
  title: string
  description: string
  category: string
  icon: string

  level: "Pemula" | "Menengah" | "Lanjutan"

  estimatedWeeks: number
  totalNodes: number

  nodes: INode[]
}

const ResourceSchema = new Schema<IResource>(
  {
    type: {
      type: String,
      enum: ["youtube", "article", "website", "course", "docs"],
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    url: {
      type: String,
      required: true,
    },
  },
  {
    _id: false,
  }
)

const NodeSchema = new Schema<INode>(
  {
    id: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },

    subtopics: {
      type: [String],
      default: [],
    },

    difficulty: {
      type: String,
      enum: ["Pemula", "Menengah", "Lanjutan"],
    },

    estimatedDays: {
      type: Number,
    },

    resources: {
      type: [ResourceSchema],
      default: [],
    },

    order: {
      type: Number,
      required: true,
    },
  },
  {
    _id: false,
  }
)

const RoadmapSchema = new Schema<IRoadmap>(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    level: {
      type: String,
      enum: ["Pemula", "Menengah", "Lanjutan"],
    },

    estimatedWeeks: {
      type: Number,
      default: 0,
    },

    totalNodes: {
      type: Number,
      default: 0,
    },

    nodes: {
      type: [NodeSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Roadmap ||
  mongoose.model<IRoadmap>("Roadmap", RoadmapSchema)