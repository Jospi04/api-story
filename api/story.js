import { io } from "socket.io-client";

async function getStories(username) {

  const pageRes = await fetch(`https://anonsaver.com/viewer/${username}/`, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": "https://anonsaver.com/",
    }
  });

  const cookies = pageRes.headers
    .getSetCookie()
    .map(c => c.split(";")[0])
    .join("; ");

  const tokenRes = await fetch(
    "https://anonsaver.com/connect/",
    {
      headers: {
        Cookie: cookies,
        Referer: `https://anonsaver.com/viewer/${username}/`,
        "User-Agent": "Mozilla/5.0",
      }
    }
  );

  const { token } = await tokenRes.json();

  return new Promise((resolve, reject) => {

    const socket = io("https://anonsaver.com", {
      reconnection: false,
      transports: ["polling", "websocket"],
      extraHeaders: {
        Cookie: cookies,
        Referer: `https://anonsaver.com/viewer/${username}/`,
        "User-Agent": "Mozilla/5.0",
      }
    });

    socket.on("connect", () => {

      socket.emit("search", {
        date: Date.now(),
        token,
        requestType: "1",
        username,
      });

    });

    socket.on("searchResult", (data) => {
      socket.disconnect();
      resolve(data);
    });

    socket.on("connect_error", reject);

    socket.on("error", reject);

    setTimeout(() => {
      reject(new Error("Timeout"));
    }, 15000);

  });

}

export default async function handler(req, res) {

  try {

    const { user } = req.query;

    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Falta el parámetro user"
      });
    }

    const data = await getStories(user);

    return res.status(200).json({
      status: true,
      creator: "Jospi",
      result: data
    });

  } catch (err) {

    return res.status(500).json({
      status: false,
      error: err.message
    });

  }

}