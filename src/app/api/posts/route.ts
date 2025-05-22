import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const authToken = request.cookies.get("access_token")?.value;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/posts`,
    {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    }
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: "Erro ao buscar posts" },
      { status: res.status }
    );
  }

  const posts = await res.json();
  return NextResponse.json(posts);
}
