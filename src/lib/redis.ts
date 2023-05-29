import { Redis } from "ioredis";
import { getEnvVariable } from "@/utils";

const redis = new Redis(getEnvVariable("REDIS_URL"));

redis.on("error", (error) => {
  console.error("Redis Error:", error);
});

export { redis };
