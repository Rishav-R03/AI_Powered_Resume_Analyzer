import mongoose from 'mongoose';

const fileUploadSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    originalFileName: {
        type: String,
        required: true,
        trime: true
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
        fullExtractedData: {
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
        matchedKeyWords: {
            type: [String],
            default: []
        },
        missingKeyWords: {
            type: String,
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

fileUploadSchema.index({ userId: 1, uploadedAt: -1 })

const FileUpload = mongoose.model("FileUpload", fileUploadSchema);

export default FileUpload