import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = await context.params;

    const authToken = request.cookies.get("access_token")?.value;
    if (!authToken) {
      return NextResponse.json(
        { error: "Token de autenticação ausente." },
        { status: 401 }
      );
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/posts/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao buscar post:", error);
    return NextResponse.json(
      { error: "Erro inesperado ao buscar post." },
      { status: 500 }
    );
  }
}
