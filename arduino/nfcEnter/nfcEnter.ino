#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#define USE_SERIAL Serial

#include <NfcAdapter.h>
#include <PN532/PN532/PN532.h>
#include <Wire.h>
#include <PN532/PN532_I2C/PN532_I2C.h>
#include <PN532/PN532_HSU/PN532_HSU.h>

PN532_HSU pn532hsu(Serial1);
NfcAdapter nfc(pn532hsu);
// use software serial


void setup(void) {
    USE_SERIAL.begin(115200);

    WiFi.begin("partage et savoir", "lamberte");
    while (WiFi.status() != WL_CONNECTED) { // connect to wifi
      delay(1000);
      USE_SERIAL.println("Connecting to WiFi..");
    }
    USE_SERIAL.println("Connected to the WiFi network");

    SERIAL.println("NDEF Reader");
    nfc.begin();
}

void loop(void) {
    SERIAL.println("\nScan a NFC tag\n");

    //wait for NFC scan
    if(nfc.tagPresent()) {

      NfcTag tag = nfc.read();
      tag.print();
      String uid = tag.getUidString();
      USE_SERIAL.println(uid);
      uid.replace(" ","");
     
      HTTPClient http;
      
      // configure traged server and url
      String url = "http://192.168.43.130:3000/users/" + uid + "/enter";
       USE_SERIAL.print(url);
      http.begin(url); //HTTP

      USE_SERIAL.print("[HTTP] PUT...\n");
      // start connection and send HTTP header
      http.addHeader("Content-Type", "text/plain");
      int httpCode = http.PUT("PUT sent from ESP32");
      USE_SERIAL.print(httpCode);

              // httpCode will be negative on error
              if(httpCode > 0) {
                  // HTTP header has been send and Server response header has been handled
                  USE_SERIAL.printf("[HTTP] PUT... code: %d\n", httpCode);
                  String payload = http.getString();
                  USE_SERIAL.println(payload);
              }
              http.end();

    }

    delay(3000);
}
