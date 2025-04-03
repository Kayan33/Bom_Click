import Rotas from "./router"

import AuthProvider from "./Contexts/authContexts"

function App() {
  return(
    <AuthProvider>
    <div>
          <Rotas/>
    </div>
    </AuthProvider>
  )
}

export default App