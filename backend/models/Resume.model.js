import mongoose from 'mongoose';

const resumeSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    originalFileName: {
        type: String,
        required: true,
        trim: true // Corrected typo here
    },
    fileMimeType: {
        type: String,
        required: true
    },
    fileSize: {
        type: Number,
        required: true
    },
    fileStoragePath: {
        type: String,
        required: true
    },
    jobDescription: {
        type: String,
        default: '',
        maxlength: 5000
    },
    analysisStatus: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'failed'],
        default: 'pending'
    },
    errorMessage: {
        type: String
    },
    parsedData: {
        textPreview: {
            type: String,
            default: ''
        },
        fullExtractedText: { // Consistent naming with previous discussion
            type: String,
            default: ''
        },
        entities: {
            type: Object,
            default: {}
        },
        sections: {
            type: Object,
            default: {}
        },
    },
    analysisResults: {
        matchingScore: {
            type: Number,
            min: 0,
            max: 100,
            default: 0
        },
        matchedKeywords: { // Note: 'Keywords' pluralized in your code is 'KeyWords'. Stick to one style.
            type: [String],
            default: []
        },
        missingKeywords: {
            type: [String], // CRITICAL FIX: Changed from String to [String]
            default: []
        },
        aiSuggestions: {
            overallFeedback: { type: String, default: '' },
            summaryImprovements: { type: String, default: '' },
            experienceImprovements: { type: String, default: '' },
            skillsSuggestions: { type: String, default: '' }
        }
    },
}, { timestamps: true });

resumeSchema.index({ userId: 1, uploadedAt: -1 });

// Renamed for consistency with the project's domain
const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;