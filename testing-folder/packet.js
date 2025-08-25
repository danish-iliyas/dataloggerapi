// This file exports an array of all the packet data from your images.
export const packets = [
  // Image 1: Device Reset (sys)
  {
    "data": {
      "imei": "861409074410847",
      "uid": 1,
      "dtm": "20250810141217",
      "seq": 1,
      "msg": "sys",
      "alert": "DR:0",
      "info": "Device Reset"
    }
  },
  // Image 2: Slave device (sys)
  {
    "data": {
      "imei": "861409074410847",
      "uid": 1,
      "dtm": "20250810141311",
      "seq": 2,
      "msg": "sys",
      "alert": "CF:1:21",
      "info": "Slave device"
    }
  },
  // Image 3: Slave device (sys)
  {
    "data": {
      "imei": "861409074410847",
      "uid": 1,
      "dtm": "20250810141313",
      "seq": 3,
      "msg": "sys",
      "alert": "CF:2:21",
      "info": "Slave device"
    }
  },
  // Image 4: Slave device (sys)
  {
    "data": {
      "imei": "861409074410847",
      "uid": 1,
      "dtm": "20250810141322",
      "seq": 4,
      "msg": "sys",
      "alert": "CF:6:21",
      "info": "Slave device"
    }
  },
  // Image 5: Log data (log)
  {
    "data": {
      "imei": "861409074410847",
      "uid": 1,
      "dtm": "20250810141322",
      "seq": 5,
      "sig": 17,
      "msg": "log",
      "modbus": [
        {
          "sid": 11,
          "stat": 21,
          "indx": 6,
          "rcnt": 0
        }
      ]
    }
  },
  // Image 6: Login data (login)
  {
    "msg": "login",
    "imei": "861409074410847",
    "model": "WT-410M",
    "cid": "WCT",
    "type": "W4G LITE",
    "hwver": "1.0",
    "swver": "1.0.56",
    "mdbver": "1.0",
    "time": "20250810141258",
    "sig": 17,
    "nw": "airtel"
  }
];