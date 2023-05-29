import { redis } from "@/lib/redis";

export async function setValue(key: string, value: object, ttl: number) {
  try {
    await redis
      .multi()
      .set(key, JSON.stringify(value), "EX", ttl)
      .set(`hits:${key}`, 0, "EX", ttl)
      .exec();
  } catch (error) {
    console.error("Error setting value:", error);
  }
}

export async function getValue<T>(key: string): Promise<T | null> {
  try {
    const result = await redis.multi().get(key).incr(`hits:${key}`).exec();
    const value = result?.[0][1] as string | null;

    return value ? JSON.parse(value) : null;
  } catch (error) {
    console.error("Error getting value:", error);
    return null;
  }
}

export async function getHitCount(key: string): Promise<number> {
  try {
    const hitCount = await redis.get(`hits:${key}`);
    return hitCount ? parseInt(hitCount) : 0;
  } catch (error) {
    console.error("Error getting hit count:", error);
    return 0;
  }
}
