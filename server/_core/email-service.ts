// ─── 스포츠 회복 관리사 협회 이메일 서비스 ──────────────────────

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

const BRAND_COLOR = "#1d4ed8"; // primary blue
const ACCENT_COLOR = "#0ea5e9"; // secondary

// ─── 공통 HTML 래퍼 ──────────────────────────────────────────
function wrapHtml(title: string, body: string): string {
  return `<!DOCTYPE html>
<html><head><meta charset="UTF-8"><style>
  body{font-family:Arial,sans-serif;line-height:1.6;color:#333;margin:0;padding:0}
  .wrap{max-width:600px;margin:0 auto;padding:20px}
  .header{background:linear-gradient(135deg,${BRAND_COLOR} 0%,${ACCENT_COLOR} 100%);color:white;padding:30px;text-align:center;border-radius:8px 8px 0 0}
  .content{background:#f9fafb;padding:30px;border:1px solid #e5e7eb}
  .row{margin-bottom:16px}
  .label{color:#6b7280;font-size:13px}
  .value{font-size:17px;font-weight:bold;color:#1f2937}
  .btn{background:${ACCENT_COLOR};color:white;padding:12px 24px;text-decoration:none;border-radius:4px;display:inline-block;margin-top:10px}
  .footer{background:#f3f4f6;padding:16px;text-align:center;font-size:12px;color:#6b7280}
  .alert{background:#fef3c7;border-left:4px solid #f59e0b;padding:14px;margin:16px 0}
  ul{margin:12px 0;padding-left:20px} li{margin:6px 0}
</style></head><body><div class="wrap">
  <div class="header"><h1>${title}</h1><p>스포츠 회복 관리사 협회 (SRMA)</p></div>
  <div class="content">${body}</div>
  <div class="footer"><p>&copy; 2026 스포츠 회복 관리사 협회. 모든 권리 보유.</p><p>문의: kyc116116@gmail.com | 010-5318-3332</p></div>
</div></body></html>`;
}

// ─── 1. 결제 확인 이메일 ──────────────────────────────────────
export function generatePaymentConfirmationEmail(data: {
  orderId: number; tierName: string; amount: string; date: string; invoiceUrl?: string;
}): EmailTemplate {
  const body = `<p>안녕하세요,</p><p>멤버십 결제가 성공적으로 완료되었습니다. 🎉</p>
  <div class="row"><div class="label">주문 번호</div><div class="value">#${data.orderId}</div></div>
  <div class="row"><div class="label">멤버십 플랜</div><div class="value">${data.tierName}</div></div>
  <div class="row"><div class="label">결제 금액</div><div class="value">${data.amount}</div></div>
  <div class="row"><div class="label">결제 날짜</div><div class="value">${data.date}</div></div>
  <p style="margin-top:24px"><a href="${data.invoiceUrl || '#'}" class="btn">영수증 보기</a></p>
  <p style="margin-top:20px">이제 협회의 모든 혜택을 이용하실 수 있습니다.<br>마이페이지에서 구독 현황을 확인하세요.</p>`;
  return {
    subject: `[SRMA] 결제 완료 - 주문 #${data.orderId}`,
    html: wrapHtml("결제 완료", body),
    text: `결제 완료\n주문번호: #${data.orderId}\n플랜: ${data.tierName}\n금액: ${data.amount}\n날짜: ${data.date}`,
  };
}

// ─── 2. 환영 이메일 ───────────────────────────────────────────
export function generateWelcomeEmail(memberName: string): EmailTemplate {
  const body = `<p>안녕하세요, <strong>${memberName}</strong>님!</p>
  <p>스포츠 회복 관리사 협회(SRMA)에 가입해 주셔서 진심으로 감사합니다.</p>
  <p><strong>이제 이용 가능한 서비스:</strong></p>
  <ul>
    <li>전문 관리사와의 1:1 상담 예약</li>
    <li>실기시험 신청 및 자격검증</li>
    <li>협회 게시판 및 커뮤니티 활동</li>
    <li>공식 수료증 발급</li>
    <li>전문 기술 교육 자료</li>
  </ul>
  <p style="margin-top:20px"><a href="/profile" class="btn">마이페이지 방문</a></p>
  <p style="margin-top:20px;color:#6b7280;font-size:13px">문의사항은 언제든지 연락주세요.<br>이메일: kyc116116@gmail.com | 전화: 010-5318-3332</p>`;
  return {
    subject: `[SRMA] 환영합니다, ${memberName}님!`,
    html: wrapHtml("환영합니다! 🎊", body),
    text: `환영합니다, ${memberName}님!\nSRMA에 가입해 주셔서 감사합니다.`,
  };
}

// ─── 3. 예약 확인 이메일 ─────────────────────────────────────
export function generateReservationConfirmationEmail(data: {
  name: string; date: string; time?: string; practitionerName?: string; consultationType?: string;
}): EmailTemplate {
  const body = `<p>안녕하세요, <strong>${data.name}</strong>님!</p>
  <p>상담 예약이 확정되었습니다. ✅</p>
  <div class="row"><div class="label">예약 날짜</div><div class="value">${data.date}</div></div>
  ${data.time ? `<div class="row"><div class="label">예약 시간</div><div class="value">${data.time}</div></div>` : ""}
  ${data.practitionerName ? `<div class="row"><div class="label">담당 관리사</div><div class="value">${data.practitionerName}</div></div>` : ""}
  ${data.consultationType ? `<div class="row"><div class="label">상담 유형</div><div class="value">${data.consultationType}</div></div>` : ""}
  <div class="alert">⚠️ 예약 시간 15분 전에 도착해 주시기 바랍니다.<br>취소/변경은 24시간 전에 연락주세요.</div>
  <p>위치: 서울시 강남구 | 전화: 010-5318-3332</p>`;
  return {
    subject: `[SRMA] 상담 예약 확인 - ${data.date}`,
    html: wrapHtml("상담 예약 확인", body),
    text: `상담 예약 확인\n날짜: ${data.date}\n담당: ${data.practitionerName ?? "-"}`,
  };
}

// ─── 4. 구독 갱신 안내 이메일 ────────────────────────────────
export function generateSubscriptionRenewalEmail(data: {
  tierId: string; tierName: string; renewalDate: string; amount: string;
}): EmailTemplate {
  const body = `<p>안녕하세요,</p><p>멤버십 구독 갱신 일정을 안내드립니다.</p>
  <div class="alert">⚠️ 구독이 <strong>${data.renewalDate}</strong>에 자동으로 갱신됩니다.</div>
  <div class="row"><div class="label">현재 플랜</div><div class="value">${data.tierName}</div></div>
  <div class="row"><div class="label">갱신 금액</div><div class="value">${data.amount}</div></div>
  <div class="row"><div class="label">갱신 예정일</div><div class="value">${data.renewalDate}</div></div>
  <p style="margin-top:20px">구독 변경/취소는 마이페이지에서 하실 수 있습니다.</p>`;
  return {
    subject: `[SRMA] 구독 갱신 예정 안내`,
    html: wrapHtml("구독 갱신 안내", body),
    text: `구독 갱신 안내\n플랜: ${data.tierName}\n갱신일: ${data.renewalDate}\n금액: ${data.amount}`,
  };
}

// ─── 5. 수료증 발급 이메일 ────────────────────────────────────
export function generateCertificateIssuedEmail(data: {
  name: string; skillName: string; certNumber: string; issueDate: string;
}): EmailTemplate {
  const body = `<p>안녕하세요, <strong>${data.name}</strong>님!</p>
  <p>수료증이 발급되었습니다. 🏆</p>
  <div class="row"><div class="label">과정명</div><div class="value">${data.skillName}</div></div>
  <div class="row"><div class="label">수료증 번호</div><div class="value">${data.certNumber}</div></div>
  <div class="row"><div class="label">발급일</div><div class="value">${data.issueDate}</div></div>
  <p style="margin-top:20px"><a href="/profile" class="btn">수료증 다운로드</a></p>
  <p style="margin-top:16px;color:#6b7280;font-size:13px">수료증은 마이페이지 > 수료증 탭에서 다운로드 가능합니다.</p>`;
  return {
    subject: `[SRMA] 수료증 발급 완료 - ${data.skillName}`,
    html: wrapHtml("수료증 발급 완료 🏆", body),
    text: `수료증 발급 완료\n과정: ${data.skillName}\n번호: ${data.certNumber}\n발급일: ${data.issueDate}`,
  };
}

// ─── 발송 함수 ────────────────────────────────────────────────
export async function sendEmail(
  toEmail: string,
  template: EmailTemplate,
  emailType: string,
  userId: number
): Promise<boolean> {
  try {
    console.log(`[SRMA Email] ${emailType} → ${toEmail}`);
    console.log(`Subject: ${template.subject}`);
    // TODO: 실제 이메일 발송 (Resend / SendGrid / Nodemailer 연동)
    // await resend.emails.send({ from: 'noreply@srma.kr', to: toEmail, subject: template.subject, html: template.html });
    return true;
  } catch (error) {
    console.error(`[SRMA Email] 발송 실패 (${emailType}):`, error);
    return false;
  }
}
