import React, { useContext } from 'react';
import { Form, Button, Card, Container, Alert } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate();
  const {
    loginInfo,
    updateLoginInfo,
    loginUser,
    loginError,
    isLoginLoading,
  } = useContext(AuthContext);

  const handleJoinNowClick = () => {
    navigate('/register');
  }

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <Card style={{ width: '320px', padding: '20px', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)' }}>
        <Card.Body>
          <Form onSubmit={loginUser}>
            <h2 className="text-center mb-4">Sign in</h2>
            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email or Phone"
                onChange={(e) => updateLoginInfo({ ...loginInfo, email: e.target.value })}
                value={loginInfo.email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Password"
                onChange={(e) => updateLoginInfo({ ...loginInfo, password: e.target.value })}
                value={loginInfo.password}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={isLoginLoading} className="w-100 mb-2">
              {isLoginLoading ? "Getting you in..." : "Login"}
            </Button>
            {loginError?.error && (
              <Alert variant="danger" className="mt-3">
                <strong>Error status code: {loginError?.status}</strong>
                <p>{loginError?.message}</p>
              </Alert>
            )}
            <div className="d-flex justify-content-between mt-4">
              <Button variant="link">Forgot password?</Button>
              <Button variant="link" onClick={handleJoinNowClick}>Join now</Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;