import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    console.log("env:", process.env.NEXT_PUBLIC_SERVICES_BASE_URL);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    console.log("Response from login:", res);
    console.log("env:", process.env.NEXT_PUBLIC_SERVICES_BASE_URL);

    const data = await res.json();

    if (!res.ok) {
      throw { status: res.status, data };
    }

    const token = data.access_token;

    const response = NextResponse.json(data);
    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error: any) {
    console.error("Erro durante login:", error);
    const status = error?.status || 500;
    const message = error?.data || { message: "Erro interno no servidor" };

    return NextResponse.json(message, { status });
  }
}
