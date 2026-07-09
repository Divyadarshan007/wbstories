import { z } from "zod";

export const linkPreviewQuerySchema = z.object({
  url: z.url({ protocol: /^https?$/, message: "A valid http(s) URL is required" }),
});
