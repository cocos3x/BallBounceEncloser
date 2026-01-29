export default async function handler(req, res) {
  const { type } = req.query;

  let targetUrl;

  if (type === "history") {
    targetUrl =
      "https://xoso188.net/api/front/open/lottery/history/low/all/game?page=1&pageSize=1000&gameCode=miba";
  } else if (type === "list") {
    targetUrl =
      "https://xoso188.net/api/front/open/lottery/history/list/game?limitNum=10&gameCode=miba";
  } else {
    return res.status(400).json({ error: "invalid type" });
  }

  try {
    const r = await fetch(targetUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://xoso188.net/"
      }
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: "fetch failed" });
    }

    const data = await r.json();

    // cache nhẹ cho vercel
    res.setHeader(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate"
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "server error" });
  }
}
