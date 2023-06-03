import {
  Badge,
  Button,
  Container,
  Nav,
  NavDropdown,
  Navbar,
} from 'react-bootstrap'
import { Outlet } from 'react-router'
import { Store } from './Store'
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { LinkContainer } from 'react-router-bootstrap'

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }

  const signoutHandler = () => {
    dispatch({ type: 'USER_SIGNOUT' })
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartProducts')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href = '/signin'
  }

  return (
    <div className="d-flex flex-column vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar expand="lg">
          <Container>
            <LinkContainer to={'/'}>
              <Navbar.Brand>Ts mesutnisebin</Navbar.Brand>
            </LinkContainer>
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
            {userInfo ? (
              <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                <Link
                  to="#signout"
                  className="dropdown-item"
                  onClick={signoutHandler}
                >
                  Sign Out
                </Link>
              </NavDropdown>
            ) : (
              <Link to="/signin" className="nav-link">
                Sign In
              </Link>
            )}
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
