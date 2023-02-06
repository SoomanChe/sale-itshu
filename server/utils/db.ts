import { faker } from "@faker-js/faker"
import dayjs from "dayjs"
import { Post } from "~/types"

export function paginate (pageSize:number, pageNumber:string) {
  const _pageNumber1 = parseInt(pageNumber || "1")
  return db.slice((_pageNumber1 - 1) * pageSize, _pageNumber1 * pageSize)
}
export const db = Array.from({ length: 50 }).map<Post>((_, i) => ({
  id: i + 1,
  title: faker.helpers.arrayElement([
    "W컨셉 설 기획전",
    "터틀비치 & 로캣 브랜드위크 최대 60% 세일", "덱케 브랜드 위크 최대 80% 세일", "호제 브랜드 데이",
    "질스튜어트뉴욕 설프라이즈 15% 중복쿠폰",
    "로지텍 게이밍악세사리 할인전",
    "도미노피자 설 포장 40% 할인 / 1+1 이벤트",
  ]),
  createdAt: dayjs(faker.date.recent(1)).format("YYYY-MM-DD HH:mm"),
  content: "W컨셉 설 기획전 정보 포스팅입니다.W컨셉 사이트에서 할인 이벤트를 진행하네요.할인 품목 : 의류, 신발, 가방 등 W컨셉 설 기획전 정보 [링크]",
  images: [faker.image.image(), faker.image.image()],
  tags: [
    "잡화", "W컨셉", "신세계몰",
  ],
}))
// event.context.prisma.post.create({
//   data: {
//     title
//     content,
//     link: shortLink,
//     images: {
//       createMany: {
//         data: imageUploadResults.map(r => ({ url: r.data!.path })),
//       },
//     },
//   },
// })
