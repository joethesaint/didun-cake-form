import { useEffect, useState } from 'react'
import OrderForm from './components/OrderForm'
import Site from './components/Site'

// Hash routes keep the app fully static (GitHub Pages / Vercel need no rewrite rules):
//   #/       the website
//   #/order  the order form
const isOrderRoute = () => window.location.hash.startsWith('#/order')

function App() {
  const [onOrder, setOnOrder] = useState(isOrderRoute)

  useEffect(() => {
    const onHash = () => {
      const next = isOrderRoute()
      setOnOrder(prev => {
        if (prev !== next) window.scrollTo(0, 0)
        return next
      })
    }
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    document.title = onOrder ? 'Dídùn Order Form' : 'Dídùn Cakes'
  }, [onOrder])

  return (
    <div className="App">
      {onOrder ? <OrderForm /> : <Site />}
    </div>
  )
}

export default App
