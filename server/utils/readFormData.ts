import { H3Event } from "h3"
import formidable from "formidable"

export function readFormData<T> (event: H3Event, options?: formidable.Options): Promise<T> {
  return new Promise<any>((resolve, reject) => {
    const form = formidable(options)

    form.parse(event.node.req, (err, fields, files) => {
      if (err) { reject(err) }
      resolve({
        ...files, ...fields,
      })
    })
  })
}
