import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal } from "drizzle-orm/mysql-core";

// ─── 사용자 ───────────────────────────────────────────────────
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  stripeCustomerId: varchar("stripe_customer_id", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// ─── 게시물 (게시판 + 커뮤니티) ──────────────────────────────
export const posts = mysqlTable("posts", {
  id: int("id").autoincrement().primaryKey(),
  type: mysqlEnum("type", ["board", "community"]).notNull().default("board"),
  category: varchar("category", { length: 64 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  authorId: int("authorId").notNull(),
  authorName: varchar("authorName", { length: 128 }),
  views: int("views").notNull().default(0),
  likes: int("likes").notNull().default(0),
  comments: int("comments").notNull().default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
export type Post = typeof posts.$inferSelect;
export type InsertPost = typeof posts.$inferInsert;

// ─── 예약 ─────────────────────────────────────────────────────
export const reservations = mysqlTable("reservations", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  date: varchar("date", { length: 32 }).notNull(),
  time: varchar("time", { length: 10 }),
  practitionerId: int("practitioner_id"),
  consultationType: varchar("consultation_type", { length: 64 }).default("general"),
  status: mysqlEnum("status", ["pending", "confirmed", "cancelled"]).notNull().default("pending"),
  userId: int("userId"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
export type Reservation = typeof reservations.$inferSelect;
export type InsertReservation = typeof reservations.$inferInsert;

// ─── 관리사 ───────────────────────────────────────────────────
export const practitioners = mysqlTable("practitioners", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  specialty: varchar("specialty", { length: 255 }).notNull(),
  experience: int("experience").notNull(),
  bio: text("bio"),
  imageUrl: varchar("image_url", { length: 500 }),
  certifications: text("certifications"),
  email: varchar("email", { length: 320 }),
  phone: varchar("phone", { length: 20 }),
  isActive: int("is_active").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type Practitioner = typeof practitioners.$inferSelect;
export type InsertPractitioner = typeof practitioners.$inferInsert;

// ─── 실기시험 ─────────────────────────────────────────────────
export const exams = mysqlTable("exams", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  userName: varchar("user_name", { length: 128 }),
  skillName: varchar("skill_name", { length: 255 }).notNull(),
  examDate: varchar("exam_date", { length: 32 }).notNull(),
  status: mysqlEnum("status", ["진행중", "합격", "불합격"]).default("진행중").notNull(),
  score: int("score"),
  gradedAt: timestamp("graded_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Exam = typeof exams.$inferSelect;
export type InsertExam = typeof exams.$inferInsert;

// ─── 수료증 ───────────────────────────────────────────────────
export const certificates = mysqlTable("certificates", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  userName: varchar("user_name", { length: 128 }),
  skillName: varchar("skill_name", { length: 255 }).notNull(),
  certNumber: varchar("cert_number", { length: 64 }).notNull().unique(),
  issueDate: varchar("issue_date", { length: 32 }).notNull(),
  expiryDate: varchar("expiry_date", { length: 32 }),
  status: mysqlEnum("status", ["active", "expired", "revoked"]).default("active").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type Certificate = typeof certificates.$inferSelect;
export type InsertCertificate = typeof certificates.$inferInsert;

// ─── 멤버십 주문 ──────────────────────────────────────────────
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  stripeSessionId: varchar("stripe_session_id", { length: 255 }).unique(),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }),
  tierId: varchar("tier_id", { length: 50 }).notNull(),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  currency: varchar("currency", { length: 3 }).default("KRW").notNull(),
  status: mysqlEnum("status", ["pending", "completed", "failed", "refunded"]).default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type Order = typeof orders.$inferSelect;
export type InsertOrder = typeof orders.$inferInsert;

// ─── 구독 ─────────────────────────────────────────────────────
export const subscriptions = mysqlTable("subscriptions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  stripeSubscriptionId: varchar("stripe_subscription_id", { length: 255 }).unique().notNull(),
  tierId: varchar("tier_id", { length: 50 }).notNull(),
  status: mysqlEnum("status", ["active", "paused", "cancelled", "expired"]).default("active").notNull(),
  currentPeriodStart: timestamp("current_period_start").notNull(),
  currentPeriodEnd: timestamp("current_period_end").notNull(),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
});
export type Subscription = typeof subscriptions.$inferSelect;
export type InsertSubscription = typeof subscriptions.$inferInsert;

// ─── 이메일 로그 ──────────────────────────────────────────────
export const emailLogs = mysqlTable("email_logs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("user_id").notNull(),
  recipientEmail: varchar("recipient_email", { length: 320 }).notNull(),
  emailType: varchar("email_type", { length: 50 }).notNull(),
  subject: varchar("subject", { length: 500 }),
  status: mysqlEnum("status", ["sent", "failed", "bounced"]).default("sent").notNull(),
  metadata: text("metadata"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
export type EmailLog = typeof emailLogs.$inferSelect;
export type InsertEmailLog = typeof emailLogs.$inferInsert;
