import React, { useState } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleAlert, setVisibleAlert] = useState(false);
  const [opacityForm, setOpacity] = useState(1);
  const [error, setError] = useState("");

  const history = useHistory();

  function loginPage() {
    history.push("/login");
  }

  function addNewUser(e) {
    e.preventDefault();
    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      mobileNumber: `+62${mobileNumber}`,
      gender: gender,
      dateOfBirth: dateOfBirth,
    };
    if (newUser.dateOfBirth === "")
      newUser.dateOfBirth = convertDate(new Date());
    console.log(newUser);
    fetch("http://localhost:3001/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setVisibleAlert(true);
          setError(data.message);
        } else {
          setVisible(true);
          setOpacity(0.3);
          setVisibleAlert(false);
          setError("");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function convertDate(inputFormat) {
    function pad(s) {
      return s < 10 ? "0" + s : s;
    }
    var d = new Date(inputFormat);
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
  }

  return (
    <Container>
      <h2>Register</h2>
      <Form onSubmit={addNewUser} style={{ opacity: opacityForm }}>
        {visibleAlert && (
          <div class="alert alert-primary" role="alert">
            {error}
          </div>
        )}
        <Form.Group controlId="formBasicMobileNumber">
          <Form.Label>Mobile Number</Form.Label>
          <Row>
            <Col sm={1}>
              <Form.Control type="text" value="+62" readonly />
            </Col>
            <Col>
              <Form.Control
                type="number"
                placeholder="Mobile Number"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter first name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formBasicDateOfBirth">
          <Form.Label>Date Of Birth</Form.Label>
          <Form.Control
            type="date"
            placeholder="Enter date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
          />
        </Form.Group>

        <fieldset>
          <Form.Group>
            <Form.Label>Gender</Form.Label>
            <div onChange={(e) => setGender(e.target.value)}>
              <Col>
                <Form.Check
                  type="radio"
                  label="Male"
                  value="Male"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios1"
                />
              </Col>
              <Col>
                <Form.Check
                  type="radio"
                  label="Female"
                  value="Female"
                  name="formHorizontalRadios"
                  id="formHorizontalRadios2"
                />
              </Col>
            </div>
          </Form.Group>
        </fieldset>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
      {visible && (
        <Button
          className="my-2"
          onClick={loginPage}
          variant="primary"
          type="button"
        >
          Login
        </Button>
      )}
    </Container>
  );
}
