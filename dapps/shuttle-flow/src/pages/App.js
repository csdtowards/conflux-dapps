import {Suspense} from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import {AliveScope} from 'react-activation'
import Stepper from '../pages/Stepper'
import History from '../pages/History'
// import Home from '../pages/Home'
import Maintenance from '../pages/Maintenance'
import NotFound from '../pages/NotFound'
import {Web3ReactManager, Header, MobileFooter} from '../pages/components'
import {Loading} from '../components'
import {useIsMobile} from '../hooks'
import {useUpdateTxs} from '../hooks/useTransaction'
import {useUpdateClaimedTxs} from '../hooks/useClaimedTx'
import {useMetaMaskHostedByFluent} from '../hooks/useMetaMaskHostedByFluent'
import {usePendingTransactions} from './components/WalletHub/index'
import {Logo} from '../assets/svg'

// eslint-disable-next-line no-unused-vars
import cfx from '../utils/cfx'
// import * as Sentry from '@sentry/browser'
// import {Integrations} from '@sentry/tracing'
// import {IS_DEV} from '../utils'

// Sentry.init({
//   dsn: 'https://4d2e829843a54d21b43df7b20a8e93cf@o339419.ingest.sentry.io/5880699',
//   integrations: [new Integrations.BrowserTracing()],

//   // Set tracesSampleRate to 1.0 to capture 100%
//   // of transactions for performance monitoring.
//   // We recommend adjusting this value in production
//   tracesSampleRate: 1.0,
//   environment: IS_DEV ? 'development' : 'production',
// })
function getPlatformOS() {
  const userAgent = window.navigator.userAgent
  let os = null

  const isIOS =
    (/iPad|iPhone|iPod/.test(userAgent) ||
      (/Mac|Mac OS|MacIntel/gi.test(userAgent) &&
        (navigator.maxTouchPoints > 1 || 'ontouchend' in document))) &&
    !window.MSStream

  if (/Macintosh|Mac|Mac OS|MacIntel|MacPPC|Mac68K/gi.test(userAgent)) {
    os = 'Mac OS'
  } else if (isIOS) {
    os = 'iOS'
  } else if (/'Win32|Win64|Windows|Windows NT|WinCE/gi.test(userAgent)) {
    os = 'Windows'
  } else if (/Android/gi.test(userAgent)) {
    os = 'Android'
  } else if (/Linux/gi.test(userAgent)) {
    os = 'Linux'
  }

  return os
}

function zoomWindows() {
  // getPlatformOS() === 'Windows'
  if (getPlatformOS() === 'Windows') {
    let originPixelRatio = localStorage.devicePixelRatio
    if (!originPixelRatio) {
      originPixelRatio = window.devicePixelRatio
      // 整数保存
      if (Number.isInteger(originPixelRatio)) {
        localStorage.devicePixelRatio = originPixelRatio
      }
    }

    let mqListener = function () {
      let currentPixelRatio = window.devicePixelRatio
      const zoom =
        Math.round(1000 * (currentPixelRatio / originPixelRatio)) / 10 / 100
      document.body.style.zoom = 1 / zoom

      // 移除之前的查询检测
      this.removeEventListener('change', mqListener)
      // 使用新的查询检测
      matchMedia(`(resolution: ${currentPixelRatio}dppx)`).addEventListener(
        'change',
        mqListener,
      )
    }

    matchMedia(`(resolution: ${originPixelRatio}dppx)`).addEventListener(
      'change',
      mqListener,
    )

    const zoom =
      Math.round(1000 * (window.devicePixelRatio / originPixelRatio)) / 10 / 100
    console.log({zoom})
    document.body.style.zoom = 1 / zoom
  }
}

function TxsUpdater() {
  useUpdateTxs()
  useUpdateClaimedTxs()
  usePendingTransactions()
  zoomWindows()

  return null
}

function App() {
  const isMobile = useIsMobile()
  useMetaMaskHostedByFluent()

  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <Loading className="w-20 h-20" />
        </div>
      }
    >
      <Router basename={window.__POWERED_BY_QIANKUN__ ? '/shuttle-flow' : ''}>
        <AliveScope>
          <div
            className={`flex flex-col h-full relative overflow-x-hidden ${
              !window.__POWERED_BY_QIANKUN__ ? '' : ''
            }`}
          >
            {!window.__POWERED_BY_QIANKUN__ && <Header />}
            <TxsUpdater />
            <div className="container mx-auto flex flex-1 justify-center pb-12 h-0">
              <div className="flex flex-col max-w-[1078px] w-[80%] bg-white rounded-[8px] pt-0 xg:pt-[76px]">
                <div className="flex items-center flex-col mt-8 text-gray-80">
                  <div className="flex items-center">
                    <img src={Logo} alt="logo" className="w-[97px] mr-8" />
                    <span id="title" className="text-2xl tracking-widest">
                      ZERO GRAVITY
                    </span>
                  </div>
                  <span className="text-base font-medium leading-5 inline-block mt-7 opacity-70">
                    Make a fast and secure transaction
                  </span>
                </div>
                <Web3ReactManager>
                  <Switch>
                    <Route path="/" exact={!!window.__POWERED_BY_QIANKUN__}>
                      <Stepper />
                    </Route>
                    <Route path="/history">
                      <History />
                    </Route>
                    {/* {!window.__POWERED_BY_QIANKUN__ &&
                  <Route path="/" exact>
                    <Home />
                  </Route>
                } */}
                    <Route path="/maintenance">
                      <Maintenance />
                    </Route>
                    <Route path="/notfound">
                      <NotFound />
                    </Route>
                    <Route path="*">
                      <Redirect to="/notfound" />
                    </Route>
                  </Switch>
                </Web3ReactManager>
              </div>
              {isMobile && !window.__POWERED_BY_QIANKUN__ && <MobileFooter />}
            </div>
          </div>
        </AliveScope>
      </Router>
    </Suspense>
  )
}

export default App
