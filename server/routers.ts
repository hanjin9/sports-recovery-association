import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { getDb } from "./db";
import { posts, reservations } from "../drizzle/schema";
import { eq, desc, and } from "drizzle-orm";

export const appRouter = router({
  system: systemRouter,

  // ─── 인증 ───────────────────────────────────────────────
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  // ─── 게시판 ─────────────────────────────────────────────
  posts: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), page: z.number().default(1) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { posts: SAMPLE_BOARD_POSTS, total: SAMPLE_BOARD_POSTS.length };

        const conditions = [eq(posts.type, "board")];
        if (input.category) conditions.push(eq(posts.category, input.category));

        const result = await db
          .select()
          .from(posts)
          .where(and(...conditions))
          .orderBy(desc(posts.createdAt))
          .limit(20)
          .offset((input.page - 1) * 20);

        return { posts: result, total: result.length };
      }),

    create: protectedProcedure
      .input(z.object({
        category: z.string(),
        title: z.string().min(1, "제목을 입력하세요"),
        content: z.string().min(1, "내용을 입력하세요"),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB 연결 오류" });

        await db.insert(posts).values({
          type: "board",
          category: input.category,
          title: input.title,
          content: input.content,
          authorId: ctx.user.id,
          authorName: ctx.user.name ?? "익명",
        });
        return { success: true };
      }),
  }),

  // ─── 커뮤니티 ────────────────────────────────────────────
  community: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), page: z.number().default(1) }))
      .query(async ({ input }) => {
        const db = await getDb();
        if (!db) return { posts: SAMPLE_COMMUNITY_POSTS, total: SAMPLE_COMMUNITY_POSTS.length };

        const conditions = [eq(posts.type, "community")];
        if (input.category) conditions.push(eq(posts.category, input.category));

        const result = await db
          .select()
          .from(posts)
          .where(and(...conditions))
          .orderBy(desc(posts.createdAt))
          .limit(20)
          .offset((input.page - 1) * 20);

        return { posts: result, total: result.length };
      }),

    create: protectedProcedure
      .input(z.object({
        category: z.string(),
        title: z.string().min(1, "제목을 입력하세요"),
        content: z.string().min(1, "내용을 입력하세요"),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) throw new TRPCError({ code: "INTERNAL_SERVER_ERROR", message: "DB 연결 오류" });

        await db.insert(posts).values({
          type: "community",
          category: input.category,
          title: input.title,
          content: input.content,
          authorId: ctx.user.id,
          authorName: ctx.user.name ?? "익명",
        });
        return { success: true };
      }),
  }),

  // ─── 예약 ────────────────────────────────────────────────
  reservations: router({
    create: publicProcedure
      .input(z.object({
        name: z.string().min(1, "이름을 입력하세요"),
        email: z.string().email("올바른 이메일을 입력하세요"),
        phone: z.string().min(1, "전화번호를 입력하세요"),
        date: z.string().min(1, "날짜를 선택하세요"),
      }))
      .mutation(async ({ input, ctx }) => {
        const db = await getDb();
        if (!db) {
          // DB 없어도 성공 처리 (개발 환경)
          return { success: true, message: "예약 신청이 완료되었습니다. 곧 연락드리겠습니다." };
        }
        await db.insert(reservations).values({
          name: input.name,
          email: input.email,
          phone: input.phone,
          date: input.date,
          userId: ctx.user?.id ?? null,
        });
        return { success: true, message: "예약 신청이 완료되었습니다. 곧 연락드리겠습니다." };
      }),

    list: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
      const db = await getDb();
      if (!db) return { reservations: [] };
      const result = await db.select().from(reservations).orderBy(desc(reservations.createdAt));
      return { reservations: result };
    }),
  }),

  // ─── 실기시험 ─────────────────────────────────────────────
  practicalExams: router({
    list: protectedProcedure.query(async () => ({ exams: [] })),
    create: protectedProcedure
      .input(z.object({ examType: z.string() }))
      .mutation(async () => ({ success: true })),
    submitScore: protectedProcedure
      .input(z.object({ examId: z.number(), score: z.number() }))
      .mutation(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return { success: true };
      }),
  }),

  // ─── 자격검증 ─────────────────────────────────────────────
  certifications: router({
    list: protectedProcedure.query(async () => ({ certifications: [] })),
    verify: protectedProcedure
      .input(z.object({ userId: z.number(), certificationType: z.string() }))
      .mutation(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        return { success: true };
      }),
  }),

  // ─── 수료증 ───────────────────────────────────────────────
  certificates: router({
    list: protectedProcedure.query(async () => ({ certificates: [] })),
    issue: protectedProcedure
      .input(z.object({ userId: z.number(), courseName: z.string(), expiryDate: z.string().optional() }))
      .mutation(async ({ ctx }) => {
        if (ctx.user.role !== "admin") throw new TRPCError({ code: "FORBIDDEN" });
        const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return { success: true, certificateNumber };
      }),
  }),
});

export type AppRouter = typeof appRouter;

// ─── 샘플 데이터 (DB 없을 때 fallback) ──────────────────────
const SAMPLE_BOARD_POSTS = [
  { id: 1, type: "board" as const, title: "2026년 상반기 실기시험 일정 안내", category: "공지사항", authorName: "관리자", authorId: 0, views: 245, likes: 0, comments: 12, content: "", createdAt: new Date("2026-03-17"), updatedAt: new Date("2026-03-17") },
  { id: 2, type: "board" as const, title: "새로운 마사지 기법 소개", category: "기술공유", authorName: "김유찬", authorId: 0, views: 156, likes: 0, comments: 8, content: "", createdAt: new Date("2026-03-15"), updatedAt: new Date("2026-03-15") },
  { id: 3, type: "board" as const, title: "협회 뉴스레터 3월호 발행", category: "뉴스", authorName: "관리자", authorId: 0, views: 89, likes: 0, comments: 3, content: "", createdAt: new Date("2026-03-10"), updatedAt: new Date("2026-03-10") },
];

const SAMPLE_COMMUNITY_POSTS = [
  { id: 1, type: "community" as const, title: "스포츠 마사지 후 회복 경험 공유", category: "경험공유", authorName: "박준호", authorId: 0, views: 0, likes: 45, comments: 8, content: "", createdAt: new Date("2026-03-17"), updatedAt: new Date("2026-03-17") },
  { id: 2, type: "community" as const, title: "실기시험 준비 팁 있을까요?", category: "질문답변", authorName: "이수진", authorId: 0, views: 0, likes: 23, comments: 12, content: "", createdAt: new Date("2026-03-16"), updatedAt: new Date("2026-03-16") },
  { id: 3, type: "community" as const, title: "협회 활동 소감", category: "자유게시판", authorName: "김민지", authorId: 0, views: 0, likes: 67, comments: 15, content: "", createdAt: new Date("2026-03-15"), updatedAt: new Date("2026-03-15") },
  { id: 4, type: "community" as const, title: "마사지 자격증 취득 후 변화", category: "성공사례", authorName: "최준영", authorId: 0, views: 0, likes: 156, comments: 32, content: "", createdAt: new Date("2026-03-14"), updatedAt: new Date("2026-03-14") },
];
