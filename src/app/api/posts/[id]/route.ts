import { NextRequest, NextResponse } from "next/server";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(
  request: NextRequest,
  context: Context
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

export async function PUT(
  request: NextRequest,
  context: Context
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

    const body = await request.json();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVICES_BASE_URL}/posts/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify(body),
      }
    );

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao editar post:", error);
    return NextResponse.json(
      { error: "Erro inesperado ao editar post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context
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
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    const isJson = res.headers
      .get("content-type")
      ?.includes("application/json");

    const data = isJson ? await res.json() : null;

    if (!res.ok) {
      return NextResponse.json(data || { error: "Erro ao deletar post" }, {
        status: res.status,
      });
    }

    return NextResponse.json(data || { message: "Post deletado com sucesso" });
  } catch (error) {
    console.error("Erro ao deletar post:", error);
    return NextResponse.json(
      { error: "Erro inesperado ao deletar post." },
      { status: 500 }
    );
  }
}
