#include <WiFi.h>
#include <HTTPClient.h>
#define USE_SERIAL Serial
/*
 * PIR sensor tester
 */
int inputPin = 14;               // choose the input pin (for PIR sensor)
int pirState = LOW;             // we start, assuming no motion detected
int val = 0;                    // variable for reading the pin status

void setup() {

  USE_SERIAL.begin(115200);

    WiFi.begin("partage et savoir", "lamberte");
    while (WiFi.status() != WL_CONNECTED) { // connect to wifi
      delay(1000);
      USE_SERIAL.println("Connecting to WiFi..");
    }
    USE_SERIAL.println("Connected to the WiFi network");

  pinMode(inputPin, INPUT);     // declare sensor as input
}

void loop(){
  val = digitalRead(inputPin);  // read input value
  if (val == HIGH) {            // check if the input is HIGH

    if (pirState == LOW) {
      // we have just turned on
      USE_SERIAL.println("Motion detected!");

      HTTPClient http;
      USE_SERIAL.print("[HTTP] begin...\n");
      // configure traged server and url
      http.begin("http://192.168.43.130:3000/users/" + uid + "/wash"); //HTTP

      USE_SERIAL.print("[HTTP] PUT...\n");
      // start connection and send HTTP header
      http.addHeader("Content-Type", "text/plain");
      int httpCode = http.PUT("PUT sent from ESP32");
      USE_SERIAL.print(httpCode);
      // httpCode will be negative on error
      if(httpCode > 0) {
         // HTTP header has been send and Server response header has been handled
         USE_SERIAL.printf("[HTTP] PUT... code: %d\n", httpCode);

         // file found at server
         if(httpCode == HTTP_CODE_OK) {
            String payload = http.getString();
            USE_SERIAL.println(payload);
         }
      }
      http.end();

      // We only want to print on the output change, not state
      pirState = HIGH;
    }
  } else {

    if (pirState == HIGH){
      // we have just turned of
       USE_SERIAL.println("Motion ended!");
      // We only want to print on the output change, not state
      pirState = LOW;
    }
  }
}