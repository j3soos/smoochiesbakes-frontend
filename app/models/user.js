import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: Number, required: false },
});

export default mongoose.model('User', UserSchema);
