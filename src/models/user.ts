import { Model, models, model } from 'mongoose'
import { Document, Schema } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserDocument extends Document {
  email: string;
  name: string;
  username: string
  password: string;
  image: string;
  googleId: string
  notes: [string]
}

interface Methods {
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<UserDocument, {}, Methods>({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true, trim: true },
  password: { type: String },
  username: { type: String, trim: true },
  image: { type: String },
  googleId: { type: String },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Notes'
  }]
},{
  timestamps: true
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10)
      this.password = await bcrypt.hash(this.password, salt)
    } catch (error) {
      throw error
    }
  }
  next()
})

userSchema.methods.comparePassword = async function (password) {
  try {
    if (!this.password) {
      return false;
    }
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const User = models.User || model('User', userSchema)

export default  User as Model<UserDocument, {}, Methods>
