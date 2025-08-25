import { handleIngestion } from '../services/loggerService.js';

export const ingestData = async (req, res) => {
  if (!req.body || typeof req.body !== 'string' || req.body.length === 0) {
    return res.status(400).json({ success: false, error: 'Request body is empty' });
  }
  try {
    const results = await handleIngestion(req.body);
    const failed = results.filter((r) => !r.success);
    if (failed.length > 0) {
      return res.status(207).json({ success: false, message: 'Some packets failed', failed });
    }
    return res.status(200).json({ success: true, message: 'All packets queued' });
  } catch (error) {
    return res.status(400).json({ success: false, error: 'Invalid JSON format' });
  }
};