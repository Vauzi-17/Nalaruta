import mongoose, { Document, Schema } from "mongoose"

export interface IUser extends Document {
  name: string
  email: string
  password?: string
  image?: string
  provider: "credentials" | "google"

  background?: "smk" | "mahasiswa" | "fresh-graduate" | "umum"

  interests: string[]
  targetCareer?: string

  streak: number
  longestStreak: number
  lastActiveDate?: Date

  hasCompletedOnboarding: boolean

  bio: string

  weeklyTarget: number

  notificationSettings: {
    weeklyReminder: boolean
    achievements: boolean
    tips: boolean
    updates: boolean
  }
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
    },

    image: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["credentials", "google"],
      default: "credentials",
    },

    background: {
      type: String,
      enum: ["smk", "mahasiswa", "fresh-graduate", "umum"],
    },

    interests: {
      type: [String],
      default: [],
    },

    targetCareer: {
      type: String,
    },

    streak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    lastActiveDate: {
      type: Date,
    },

    hasCompletedOnboarding: {
      type: Boolean,
      default: false,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 160,
    },

    weeklyTarget: {
      type: Number,
      default: 3,
      min: 1,
      max: 7,
    },

    notificationSettings: {
      weeklyReminder: {
        type: Boolean,
        default: true,
      },

      achievements: {
        type: Boolean,
        default: true,
      },

      tips: {
        type: Boolean,
        default: false,
      },

      updates: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.index(
  { email: 1 },
  {
    unique: true,
    sparse: true,
  }
)

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema)