import axios from 'axios';
import { packets } from './packet.js'; // Assuming packets.js is in the same folder

const API_ENDPOINT = 'http://localhost:4000/api/log';

// A helper function to add a delay
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function runTest() {
  console.log(`🚀 Starting test: Sending ${packets.length} packets to ${API_ENDPOINT}`);
  console.log('--------------------------------------------------');

  for (let i = 0; i < packets.length; i++) {
    const packet = packets[i];
    const packetType = packet.data ? packet.data.msg : packet.msg;

    console.log(`\n[${i + 1}/${packets.length}] Sending ${packetType.toUpperCase()} packet...`);

    try {
      // Convert the packet object to a JSON string for the request body
      const response = await axios.post(API_ENDPOINT, JSON.stringify(packet), {
        headers: { 'Content-Type': 'text/plain' } // Your server expects raw text
      });

      console.log(`✅ SUCCESS (Status: ${response.status}): ${response.data.message}`);

    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error(`❌ FAILED (Status: ${error.response.status}):`, error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('❌ FAILED: No response received from the server. Is it running?');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('❌ FAILED: Error setting up the request:', error.message);
      }
    }

    // Wait for 1 second before sending the next packet
    await sleep(1000);
  }

  console.log('\n--------------------------------------------------');
  console.log('🎉 Test finished.');
}

runTest();