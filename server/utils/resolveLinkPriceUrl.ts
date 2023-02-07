export interface SuccessResponse {
  result: number,
  merchant_id: string
  encode_url: string
}

export interface ErrorResponse {
  result: number,
  result_msg: string
}

export interface ShortLinkResponse {
  result: number,
  result_msg: string,
  short_url: string
}

const baseUrl = "http://api.linkprice.com/deeplink.php"

export async function resolveLinkPriceUrl (targetUrl: string) {
  const deepLinkResult = await getDeepLink(targetUrl)

  if (deepLinkResult.statusCode === 500) {
    return deepLinkResult.link
  }
  return getShortLink(deepLinkResult.link)
}

async function getDeepLink (targetUrl: string) {
  const url = new URL(baseUrl)
  url.searchParams.append("type", "deeplink_submit")
  url.searchParams.append("affiliate_id", "A100682417")
  url.searchParams.append("url", targetUrl)

  const _result = await $fetch<string>(url + "&", {
    method: "post",
  })

  const result: SuccessResponse | ErrorResponse = JSON.parse(_result)

  if (isErrorResponse(result)) {
    return {
      link: targetUrl,
      statusCode: 500,
    }
  }

  const deepLink = new URL("https://click.linkprice.com/click.php")
  deepLink.searchParams.append("m", result.merchant_id)
  deepLink.searchParams.append("a", "A100682417")
  deepLink.searchParams.append("l", "9999")
  deepLink.searchParams.append("l_cd1", "3")
  deepLink.searchParams.append("l_cd2", "0")
  deepLink.searchParams.append("tu", targetUrl)

  return {
    link: deepLink.toString(),
    statusCode: 200,
  }
}

async function getShortLink (deepLinkUrl: string) {
  const url = new URL(baseUrl)
  url.searchParams.append("type", "short_link")
  url.searchParams.append("click_url", deepLinkUrl)

  const _result = await $fetch<string>(url.toString() + "&", {
    method: "post",
  })

  const {
    result_msg: resultMessage,
    short_url: shortUrl,
  }: ShortLinkResponse = JSON.parse(_result)

  if (resultMessage !== "success") {
    throw createError({
      statusCode: 500,
      statusMessage: resultMessage,
    })
  }

  return shortUrl
}

function isErrorResponse (arg: any): arg is ErrorResponse {
  return !!arg.result_msg
}
