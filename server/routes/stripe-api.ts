import express, { Request, Response } from "express";

const router = express.Router();

let stripe: any = null;
try {
  if (process.env.STRIPE_SECRET_KEY) {
    const Stripe = require("stripe");
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }
} catch { /* Stripe 미설치 */ }

const TIER_PRICES: Record<string, { name: string; priceInWon: number }> = {
  basic:        { name: "일반 회원",   priceInWon: 30000  },
  professional: { name: "전문 회원",   priceInWon: 80000  },
  master:       { name: "마스터 회원", priceInWon: 150000 },
};

router.post("/checkout", async (req: Request, res: Response) => {
  try {
    const { tierId } = req.body;
    const user = (req as any).user;
    if (!user) return res.status(401).json({ error: "로그인이 필요합니다" });
    if (!stripe) return res.status(503).json({ error: "결제 시스템 준비 중입니다. 관리자에게 문의해 주세요." });
    const tier = TIER_PRICES[tierId];
    if (!tier) return res.status(400).json({ error: "잘못된 플랜입니다" });
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price_data: { currency: "krw", product_data: { name: `SRMA ${tier.name}` }, unit_amount: tier.priceInWon, recurring: { interval: "month" } }, quantity: 1 }],
      mode: "subscription",
      success_url: `${req.headers.origin}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.origin}/membership`,
      client_reference_id: String(user.id),
      metadata: { user_id: String(user.id), tier_id: tierId },
    });
    res.json({ checkoutUrl: session.url });
  } catch (error: any) {
    res.status(500).json({ error: "결제 세션 생성 실패" });
  }
});

router.get("/verify-session", async (req: Request, res: Response) => {
  try {
    const sessionId = req.query.session_id as string;
    if (!sessionId || !stripe) return res.json({ success: false });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status === "paid") {
      res.json({ success: true, order: { tier_id: session.metadata?.tier_id, amount: session.amount_total, stripe_subscription_id: session.subscription } });
    } else res.json({ success: false });
  } catch { res.status(500).json({ error: "결제 검증 실패" }); }
});

router.get("/subscription", (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "로그인 필요" });
  res.json(null); // TODO: DB 연동
});

router.get("/orders", (req: Request, res: Response) => {
  const user = (req as any).user;
  if (!user) return res.status(401).json({ error: "로그인 필요" });
  res.json([]); // TODO: DB 연동
});

export default router;
