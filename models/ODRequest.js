const mongoose = require('mongoose');

const odRequestSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    reason: { type: String, required: true },
    proofFile: { type: String },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    location: { type: String },
    status: {
        type: String,
        enum: ['PENDING','FACULTY_APPROVED','COORDINATOR_APPROVED','HOD_APPROVED','REJECTED'],
        default: 'PENDING'
    },
    approvedBy: [{ faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }, role: String }],
    remarks: { type: String },
    isFinalApproved: { type: Boolean, default: false },
    qrCodeData: { type: String },
    checkInLocation: { type: Object },
    checkInTime: { type: Date },
    isLocationVerified: { type: Boolean, default: false },
    reportSubmitted: { type: Boolean, default: false },
    canApplyNextOD: { type: Boolean, default: false },
    reportVerification: {
        isOriginal: Boolean,
        plagiarismScore: Number,
        aiScore: Number,
        verdict: String,
        checkedAt: Date
    }
}, { timestamps: true });

module.exports = mongoose.model('ODRequest', odRequestSchema);