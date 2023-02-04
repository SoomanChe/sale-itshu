import GoogleProvider from "next-auth/providers/google"
import { NuxtAuthHandler } from "#auth"

export default NuxtAuthHandler({
  secret: "the-sale-itshu-is-wonderful",
  providers: [
    // @ts-expect-error
    GoogleProvider.default({
      clientId: "837808711212-4iejlakq3klfq4j0ultiobj8sitlgad1.apps.googleusercontent.com",
      clientSecret: "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",
    }),
  ],
})
