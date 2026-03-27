const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const facultySchema = new mongoose.Schema({
    staffId:    { type: String, required: true, unique: true },
    name:       { type: String, required: true },
    email:      { type: String, required: true, unique: true },
    password:   { type: String, required: true },
    department: { type: String, required: true },
    role: {
        type: String,
        enum: ['faculty', 'coordinator', 'hod', 'admin'],
        default: 'faculty'
    },
    phone: { type: String },
}, { timestamps: true });

facultySchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

facultySchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('Faculty', facultySchema);