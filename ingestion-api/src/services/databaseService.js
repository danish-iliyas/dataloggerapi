import mongoose from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { getDb } from '../../../shared/config/db.js';

dayjs.extend(utc);
dayjs.extend(customParseFormat);

const LOG_COLLECTION = 'raw_logger_data';
const FLUSH_LIMIT = 500;
const FLUSH_INTERVAL = 10000; // 10 seconds

let packetBuffer = [];

export async function bufferLoggerPacket(packet) {
  const unwrappedPacket = (packet && packet.data && packet.data.imei) ? packet.data : packet;
  const eventTime = dayjs.utc(unwrappedPacket.dtm, "YYYYMMDDHHmmss").toDate();

  packetBuffer.push({
    ...unwrappedPacket,
    receivedAt: new Date(),
    eventTime: eventTime, // The crucial, indexable date field
  });

  console.log(`📦 Buffer size: ${packetBuffer.length}`);
  if (packetBuffer.length >= FLUSH_LIMIT) {
    await flushBuffer();
  }
}

async function flushBuffer() {
  if (packetBuffer.length === 0) return;

  const connection = await getDb();
  const docsToInsert = [...packetBuffer];
  packetBuffer = []; // Clear buffer immediately

  try {
    await connection.collection(LOG_COLLECTION).insertMany(docsToInsert, { ordered: false });
    console.log(`🚀 Flushed ${docsToInsert.length} packets to ${LOG_COLLECTION}`);
  } catch (err) {
    console.error(`❌ InsertMany failed for ${LOG_COLLECTION}. Retrying...`, err.message);
    packetBuffer.push(...docsToInsert); // Add back for retry
  }
}

// Set up a timer to periodically flush the buffer
setInterval(flushBuffer, FLUSH_INTERVAL);