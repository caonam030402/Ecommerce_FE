export const path = {
  flashSale: 'flash_sale',
  home: '/',
  user: '/user',
  profile: '/user/profile',
  changPassword: '/user/password',
  historyPurchase: '/user/purchase',
  login: '/login/',
  register: '/register/',
  logout: '/logout/',
  productDetail: ':nameId',
  cart: '/cart',
  payment: '/payment',
  paymentReturn: '/payment/vnpay-return'
} as const

export const PORT = 4000
