import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation, useParams } from 'react-router-dom'
import { vnpPaymentApi } from 'src/apis/vnpPayment.api'
import cart from 'src/assets/image/no-cart.png'
import { path } from 'src/constants/path'

export default function PaymentReturn() {
  // const queryParamsString = window.location.search

  // const { data: productDetailData } = useQuery({
  //   queryKey: ['payment_return'],
  //   queryFn: () => vnpPaymentApi.getReturnPayment(queryParamsString)
  // })

  // console.log(productDetailData)

  const { t } = useTranslation('payment')
  return (
    <div>
      <div className='flex flex-col items-center justify-center'>
        <img className='mx-auto w-36 md:w-80' src={cart} alt='' />
        <h1 className='text-2xl capitalize text-primaryColor'>{t('payment success')}</h1>
        <Link
          to={path.home}
          className='mt-4 flex w-[180px] items-center justify-center rounded-sm bg-primaryColor py-[10px] text-sm capitalize text-white'
        >
          {t('back to home page')}
        </Link>
      </div>
    </div>
  )
}
