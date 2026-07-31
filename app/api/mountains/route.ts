import { NextResponse } from "next/server";

import { parseMountainSearchParams } from "@/lib/mountain-search";
import { toMountainCardData } from "@/lib/mountains";
import { getAllMountains } from "@/services/mountains";

export async function GET(request: Request) {
  const filters = parseMountainSearchParams(new URL(request.url).searchParams);

  try {
    const result = await getAllMountains(filters);

    return NextResponse.json({
      hasMore: result.hasMore,
      mountains: result.mountains.map(toMountainCardData),
      page: result.page,
    });
  } catch {
    return NextResponse.json(
      { message: "Katalog gunung belum dapat dimuat." },
      { status: 503 },
    );
  }
}
