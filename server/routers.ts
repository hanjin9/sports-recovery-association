import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";

import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // 게시판 라우터
  posts: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), page: z.number().default(1) }))
      .query(async ({ input }) => {
        return { posts: [], total: 0 };
      }),

    getById: publicProcedure
      .input(z.number())
      .query(async ({ input }) => {
        return { id: input, title: "Sample Post", content: "Sample Content" };
      }),

    create: protectedProcedure
      .input(z.object({
        category: z.string(),
        title: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return { success: true };
      }),
  }),

  // 커뮤니티 라우터
  community: router({
    list: publicProcedure
      .input(z.object({ category: z.string().optional(), page: z.number().default(1) }))
      .query(async ({ input }) => {
        return { posts: [], total: 0 };
      }),

    create: protectedProcedure
      .input(z.object({
        category: z.string(),
        title: z.string(),
        content: z.string(),
      }))
      .mutation(async ({ input, ctx }) => {
        return { success: true };
      }),
  }),

  // 실기시험 라우터
  practicalExams: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return { exams: [] };
    }),

    create: protectedProcedure
      .input(z.object({ examType: z.string() }))
      .mutation(async ({ input, ctx }) => {
        return { success: true };
      }),

    submitScore: protectedProcedure
      .input(z.object({ examId: z.number(), score: z.number() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return { success: true };
      }),
  }),

  // 자격검증 라우터
  certifications: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return { certifications: [] };
    }),

    verify: protectedProcedure
      .input(z.object({ userId: z.number(), certificationType: z.string() }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        return { success: true };
      }),
  }),

  // 수료증 라우터
  certificates: router({
    list: protectedProcedure.query(async ({ ctx }) => {
      return { certificates: [] };
    }),

    issue: protectedProcedure
      .input(z.object({
        userId: z.number(),
        courseName: z.string(),
        expiryDate: z.string().optional(),
      }))
      .mutation(async ({ input, ctx }) => {
        if (ctx.user.role !== 'admin') {
          throw new TRPCError({ code: "FORBIDDEN" });
        }
        
        const certificateNumber = `CERT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        return { success: true, certificateNumber };
      }),
  }),
});

export type AppRouter = typeof appRouter;
