export default async function handler(req, res) {
  try {
    const response = await fetch("https://app6.multitrack.in:8087/eventList", {
      method: "POST",
      headers: {
        "Authorization": "Basic YWRtaW46YWRtaW4=",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        IMEI: "",
        from: "2025-11-01T00:00:00.000Z",
        to: "2029-11-30T23:59:59.000Z",
        page: 1,
        limit: 10,
        type: ["alarm", "geofenceExit"]
      }),
    });

    const data = await response.text();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    res.status(200).send(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
