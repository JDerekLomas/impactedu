import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { hashPassword, getAuthCookieOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Documents Login",
  description: "Access Impact-Edu.ai organizational documents.",
};

async function loginAction(formData: FormData) {
  "use server";

  const password = formData.get("password") as string;
  const expectedPassword = process.env.DOCS_PASSWORD;

  if (!expectedPassword || password !== expectedPassword) {
    redirect("/documents/login?error=1");
  }

  const cookieStore = await cookies();
  cookieStore.set({
    ...getAuthCookieOptions(),
    value: hashPassword(expectedPassword),
  });

  redirect("/documents");
}

export default async function DocumentsLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <section className="py-20 min-h-[60vh] flex items-center">
      <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">
            Documents
          </h1>
          <p className="mt-2 text-muted">
            Enter the password to access organizational documents.
          </p>
        </div>

        <form action={loginAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              autoFocus
              className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-foreground placeholder-muted-light focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:border-transparent"
              placeholder="Enter document access password"
            />
          </div>

          {hasError && (
            <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
              Incorrect password. Please try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors"
          >
            Access Documents
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-muted">
          Contact{" "}
          <a href="mailto:hello@impact-edu.ai" className="text-primary-light hover:text-primary">
            hello@impact-edu.ai
          </a>{" "}
          if you need access.
        </p>
      </div>
    </section>
  );
}
