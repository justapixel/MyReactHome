#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <ArduinoJson.h>
#include <OneWire.h>
#include <DallasTemperature.h>

const char* ssid = "SSID";
const char* password = "PASSWORD";

#define ONE_WIRE_BUS 4
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

const size_t bufferSize = JSON_ARRAY_SIZE(5) + 5*JSON_OBJECT_SIZE(7);
DynamicJsonDocument doc(bufferSize);

const size_t capacity = JSON_OBJECT_SIZE(2);
DynamicJsonDocument post(capacity);

void setup() 
{
  Serial.begin(115200);
  WiFi.begin(ssid, password);
  sensors.begin();
  sensors.setResolution(10);
  pinMode(LED_BUILTIN, OUTPUT); 
  digitalWrite(LED_BUILTIN, HIGH);

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

      DeserializationError err = deserializeJson(doc, http.getString());
      if (err) {
        Serial.print(F("deserializeJson() failed with code "));
        Serial.println(err.c_str());
      }else{
        //int id = doc["id"]; 
        //char state[20] = doc["state"];

        if (strcmp(doc["state"], "on") == 0)
        {
          digitalWrite(LED_BUILTIN, LOW);
        }else if(strcmp(doc["state"], "off") == 0){
          digitalWrite(LED_BUILTIN, HIGH);
        }
      }
      http.end(); //Close connection
    }

    HTTPClient http2; //Object of class HTTPClient
    http2.begin(client, "http://serverip:3000/sensor/update");
    http2.addHeader("Content-Type", "application/json");

    post["id"] = "1";
    sensors.requestTemperatures();
    post["value"] = sensors.getTempCByIndex(0);
    char json_string[256];
    serializeJson(post, json_string);

    http2.POST(json_string);
    http2.end();

  }
  delay(500);
}