// import queryString from 'query-string'
import {useTranslation} from 'react-i18next'
import {useLocation} from 'react-router-dom'
import {
  ChainConfig,
  KeyOfPortal,
  KeyOfMetaMask,
} from '../../../constants/chainConfig'
import {Notification} from '../../../components'
import {useIsMobile} from '../../../hooks'

const useTransactionNotification = () => {
  const {t} = useTranslation()
  const {pathname} = useLocation()
  // const history = useHistory()
  const isMobile = useIsMobile()
  // const {
  //   fromChain: pathFromChain,
  //   toChain: pathToChain,
  //   fromTokenAddress,
  //   ...others
  // } = queryString.parse(search)
  // eslint-disable-next-line react/prop-types
  return function TransactionNotification({symbol, fromChain, toChain, value}) {
    if (pathname === '/') return null
    Notification.open({
      title: t('notificationDetail', {
        value,
        symbol,
        fromChain: ChainConfig[fromChain].shortName,
        toChain: ChainConfig[toChain].shortName,
      }),
      type: 'success',
      content: (
        <div
          // aria-hidden="true"
          // onClick={() => {
          //   const pathWithQuery = queryString.stringifyUrl({
          //     url: '/history',
          //     query: {
          //       ...others,
          //       fromChain: pathFromChain,
          //       toChain: pathToChain,
          //       fromTokenAddress,
          //     },
          //   })
          //   history.push(pathWithQuery)
          // }}
        >
          Success
          {/* <Link className="!justify-start">{t('viewInHistory')}</Link> */}
        </div>
      ),
      duration: 10,
      placement: isMobile ? 'bottomRight' : 'topRight',
      bottom: isMobile ? 0 : 24,
      className: `${
        ChainConfig[fromChain].wallet === KeyOfPortal
          ? 'bg-fluent'
          : ChainConfig[fromChain].wallet === KeyOfMetaMask
          ? 'bg-metamask'
          : ''
      } h-32`,
    })
  }
}

export default useTransactionNotification
