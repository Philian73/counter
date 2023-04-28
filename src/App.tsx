import './styles/App.css'
import { Counter } from './components/Counter/Counter.tsx'

const App = () => {
  return (
    <div className="wrapper">
      <Counter min={5} max={12} />
    </div>
  )
}

export default App
