import type { NextApiHandler } from "next";

const countHandler: NextApiHandler = async (req, res) => {
  const { amount = 1 } = req.body;

  // simulate IO latency
  await new Promise((resolve) => setTimeout(resolve, 500));

  res.json({ data: amount });
};

export default countHandler;
