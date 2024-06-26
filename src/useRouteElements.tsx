import { useContext, lazy, Suspense } from 'react'
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { AppContext } from './Contexts/app.contexts'
import { path } from './constants/path'
import MainLayout from './layouts/MainLayout'
import RegisterLayout from './layouts/RegisterLayout'
import ProductDetail from './pages/ProductDetail'
import ProductList from './pages/ProductList'
import Profile from './pages/User/pages/Profile'
import Register from './pages/Register'
import Cart from './pages/Cart'
import UserLayout from './pages/User/layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Payment from './pages/Payment'
import LayoutHeaderV2 from './layouts/LayoutHeaderV2'
import PaymentReturn from './pages/PaymentReturn'
import { useTranslation } from 'react-i18next'
import FlashSale from './pages/FlashSale'
import useMediaQuery from './hooks/useMediaQuery'

const Login = lazy(() => import('./pages/Login'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const { isMobile } = useMediaQuery()
  const { t } = useTranslation('header')
  const routeElements = useRoutes([
    // Home Page
    {
      index: true,
      path: '/',
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    // Login - Register Page
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        },
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    },
    // Product Detail
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      )
    },
    // Profile Page
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <LayoutHeaderV2 classNameHeaderMobile='text-white' searchBar={true} namePage={t('navHeader.cart')}>
              <Cart />
            </LayoutHeaderV2>
          )
        },
        {
          path: path.user,
          element: (
            <MainLayout>
              <UserLayout />
            </MainLayout>
          ),
          children: [
            // {
            //   path: path.changPassword,
            //   element: <ChangePassword />
            // },
            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.historyPurchase,
              element: <HistoryPurchase />
            }
          ]
        },
        {
          path: path.payment,
          element: (
            <LayoutHeaderV2 classNameHeaderMobile='text-white' searchBar={false} namePage={t('navHeader.payment')}>
              <Payment />
            </LayoutHeaderV2>
          )
        },
        {
          path: path.paymentReturn,
          element: (
            <LayoutHeaderV2
              classNameHeaderMobile='text-white'
              searchBar={false}
              namePage={t('navHeader.payment VNPAY')}
            >
              <PaymentReturn />
            </LayoutHeaderV2>
          )
        },
        {
          path: path.flashSale,
          element: isMobile ? (
            <LayoutHeaderV2
              classNameHeaderMobile='bg-white shadow-sm'
              nameImagePage='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/fb1088de81e42c4e538967ec12cb5caa.png'
            >
              <FlashSale />
            </LayoutHeaderV2>
          ) : (
            <MainLayout>
              <FlashSale />
            </MainLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
