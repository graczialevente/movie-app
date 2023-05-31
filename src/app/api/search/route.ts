import { ValidationError } from "yup";
import { setValue, getValue, getHitCount } from "@/services/cacheService";
import { searchMovies } from "@/services/tmdbService";
import { searchSchema } from "@/lib/validations/searchMovie";
import { getStringParam } from "@/utils";
import { MoviesList, CachedMovieList } from "@/types/movie";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const validated = await searchSchema.validate({
      query: getStringParam(searchParams, "query"),
      page: getStringParam(searchParams, "page"),
    });

    const cacheKey = `${validated.query}_${validated.page}`;
    const cached = await getValue<MoviesList>(cacheKey);
    const hitCount = await getHitCount(cacheKey);

    let result: CachedMovieList;

    if (cached) {
      result = {
        ...cached,
        hitCount: hitCount,
      };
    } else {
      const current = await searchMovies(validated.query, validated.page);
      result = {
        ...current,
        hitCount: null,
      };

      if (current.results.length > 0) {
        await setValue(cacheKey, current, 120);
      }
    }

    return new Response(JSON.stringify(result));
  } catch (error) {
    if (error instanceof ValidationError) {
      return new Response(error.message, { status: 400 });
    }

    return new Response((error as Error).message, { status: 500 });
  }
}
