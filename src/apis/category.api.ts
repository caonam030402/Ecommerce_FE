import { Category } from './../types/categogy.type'
import { SuccessResponse } from './../types/utils.type'
import { http } from 'src/utils/http'

const URL = 'category'

export const categoryApi = {
  getCategories() {
    return http.get<SuccessResponse<Category[]>>(URL)
  }
}
