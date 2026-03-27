const axios    = require('axios');
const FormData = require('form-data');
const fs       = require('fs');

const ML_URL = process.env.ML_SERVICE_URL || 'http://localhost:8000';

// --- Text report ---
const verifyTextReport = async (odId, text) => {
    const res = await axios.post(`${ML_URL}/api/v1/verify/text`, {
        od_id: odId,
        text,
    });
    return _parse(res.data);
};

// --- File report (PDF or DOCX) ---
const verifyFileReport = async (odId, filePath, mimeType) => {
    const form = new FormData();
    form.append('od_id', odId);
    form.append('file', fs.createReadStream(filePath), {
        contentType: mimeType,
        filename:    filePath.split('/').pop(),
    });

    const res = await axios.post(`${ML_URL}/api/v1/verify/file`, form, {
        headers: form.getHeaders(),
    });
    return _parse(res.data);
};

// --- Internal: normalise FastAPI response ---
const _parse = (data) => ({
    isOriginal: data.is_original,
    verdict:    data.verdict_message,
    scores: {
        plagiarism: data.plagiarism_score,
        ai:         data.ai_score,
    },
    wordCount:  data.word_count,
    checkedAt:  new Date()
});

module.exports = { verifyTextReport, verifyFileReport };s