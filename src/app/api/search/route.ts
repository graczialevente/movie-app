import { ValidationError } from "yup";
import { setValue, getValue } from "@/services/cacheService";
import { searchMovies } from "@/services/tmdbService";
import { searchSchema } from "@/lib/validations/searchMovie";
import { getStringParam } from "@/utils";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const validated = await searchSchema.validate({
      query: getStringParam(searchParams, "query"),
      page: getStringParam(searchParams, "page"),
    });

    const cacheKey = `${validated.query}_${validated.page}`;
    const cached = await getValue(cacheKey);

    let result = cached;

    if (!cached) {
      const current = await searchMovies(validated.query, validated.page);
      result = current;
      await setValue(cacheKey, current, 120);
    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(error.message, { status: 400 });
    }
    console.error(error);
  }
}
