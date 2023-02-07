export default defineNuxtRouteMiddleware(() => {
  const { data, status } = useSession()
  if (status.value === "unauthenticated") {
    return
  }
  const isAdmin = data?.value?.user?.email === "straicus@gmail.com"
  if (!isAdmin) {
    throw createError({ statusCode: 400, statusMessage: "Not yet", message: "아직 관련 기능이 없습니다." })
  }
})
