import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, username, email, roles, password } = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, username, email, roles, password }),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      throw { status: res.status, data };
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Erro durante registro:", error);
    const status = error?.status || 500;
    const message = error?.data || { message: "Erro interno no servidor" };

    return NextResponse.json(message, { status });
  }
}
