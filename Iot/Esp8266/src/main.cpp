#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>

const char* ssid = "SSID";
const char* password = "Password";

void setup() 
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  pinMode(LED_BUILTIN, OUTPUT); 

  while (WiFi.status() != WL_CONNECTED) 
  {
    delay(1000);
    Serial.println("Connecting...");
  }
}

void loop() 
{
  if (WiFi.status() == WL_CONNECTED) 
  {
    WiFiClient client;
    HTTPClient http; //Object of class HTTPClient
    http.begin(client, "http://serverip:3000/sensor/my?id=1");
    int httpCode = http.GET();

    if (httpCode > 0) 
    {
      const size_t bufferSize = JSON_ARRAY_SIZE(5) + 5*JSON_OBJECT_SIZE(7);
      DynamicJsonDocument doc(bufferSize);

      DeserializationError err = deserializeJson(doc, http.getString());
    if (err) {
      Serial.print(F("deserializeJson() failed with code "));
      Serial.println(err.c_str());
    }else{
      //int id = doc["id"]; 
      const char* state = doc["state"];
      Serial.print("State: ");
      Serial.print(state);
      Serial.print(" condition: ");
      Serial.print(strcmp(state, "off"));
      Serial.println();

      if (strcmp(state, "on") == 0)
      {
        digitalWrite(LED_BUILTIN, LOW);
      }else if(strcmp(state, "off") == 0){
        digitalWrite(LED_BUILTIN, HIGH);
      }
    }
    http.end(); //Close connection
    }
  }
  delay(500);
}