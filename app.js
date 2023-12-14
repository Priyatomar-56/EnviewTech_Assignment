require("dotenv").config();

const cors = require("cors");
const express = require("express");

const app = express();

require("./db");

app.use(cors());

app.use(express.json());

const events = [];
const alerts = [];

const locationThresholds = {
  highway: 4,
  city_center: 3,
  commercial: 2,
  residential: 1,
};

app.post("/event", (req, res) => {
  const { timestamp, is_driving_safe, vehicle_id, location_type } = req.body;

  if (!timestamp || is_driving_safe===null || !vehicle_id || !location_type) {
    res.status(400).send("Event not received");
  } else {
    events.push({ timestamp, is_driving_safe, vehicle_id, location_type });

    res.status(200).send("Event received successfully");
  }
});

app.get("/alert/:alert_id", (req, res) => {
  const alertId = req.params.alert_id;
  const alert = alerts.find((a) => a.id == alertId);
  console.log(alert);
  if (alert) {
    res.json(alert);
  } else {
    res.status(404).send("Alert not found");
  }
});

function runRule() {
  const now = new Date();
  const fiveMinutesAgo = new Date(now - 5 * 60 * 1000);

  const recentEvents = events.filter(
    (event) =>
      new Date(event.timestamp) >= fiveMinutesAgo &&
      event.is_driving_safe === false
  );

  const locationType = ["highway", "city_center", "commercial", "residential"];

  locationType.forEach((type) => {
    const alertThreshold = locationThresholds[type];

    const typeEvents = recentEvents.filter(
      (event) => event.location_type === type
    );

    if (typeEvents.length >= alertThreshold) {
      const alertId = alerts.length + 1;
      const newAlert = {
        id: alertId,
        timestamp: now.toISOString(),
        location_type: type,
        message: `Unsafe driving detected in ${type}.`,
      };

      alerts.push(newAlert);
      console.log(alerts)
      console.log(`Alert ${alerts.length} generated...`);
    }
  });
  console.log("Rule ran....");
}

setInterval(runRule, 5*60*1000);

app.listen(process.env.PORT, () => {
  console.log(`connected to port ${process.env.PORT}`);
});
