import { Badge, Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Store } from './Store'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'

function App() {
  const {
    state: { mode, cart },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  return (
    <div className="d-flex flex-column vh-100">
      <header>
        <Navbar expand="lg">
          <Container>
            <Navbar.Brand>Ts mesutnisebin</Navbar.Brand>
          </Container>
          <Nav>
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>

            <Link to="/cart" className="nav-link">
              {cart.cartProducts.length > 0 && (
                <Badge pill bg="danger">
                  {cart.cartProducts.reduce((a, c) => a + c.quantity, 0)}
                </Badge>
              )}
              Cart
            </Link>
            <Link to="/signin" className="nav-link">
              Sign In
            </Link>
          </Nav>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  )
}

export default App
