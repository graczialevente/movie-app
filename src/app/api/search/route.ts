import { setValue, getValue, getHitCount } from "@/services/cacheService";

export const dynamic = "force-dynamic";

const testKey = "something";

type TestObj = {
  name: string;
};

export async function GET(request: Request) {
  const cached = await getValue<TestObj>(testKey);
  console.log(await getHitCount(testKey));
  console.log(cached?.name);

  if (cached === null) {
    const testObj: TestObj = { name: "Levente" };
    await setValue(testKey, testObj, 120);
    return new Response(JSON.stringify({ test: testObj }));
  }

  return new Response(JSON.stringify({ test: cached }));
}
