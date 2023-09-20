import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import picture from "../images/p.png";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const View = () => {
  const [getUser, setGetUser] = useState([]);
  console.log(getUser);

  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  // view user by specific id

  const getviewUser = async () => {
    try {
      const res = await axios.get(`/api/view/${id}`);
      setGetUser(res.data);
      console.log("get data");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getviewUser();
  }, []);

  // delete user

  const deleteuser = async (id) => {
    try {
      const res2 = await axios.delete(`/api/delete/${id}`);
      navigate("/");
      console.log(res2);
      console.log("delete data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Container className="con">
        <Row>
          <Col md={{ span: 6, offset: 3 }}>
            <Card>
              <Card.Body>
                <Card.Title>{getUser.name}</Card.Title>
                <Card.Text>
                  <img src={picture} alt="profile" width="50" height="50" />
                  <Button className="update ">
                    <NavLink to={`/update/${getUser._id}`} className="link1">
                      <i className="fa-solid fa-pen"></i>
                    </NavLink>
                  </Button>
                  <Button
                    variant="danger"
                    className="delete"
                    onClick={() => deleteuser(getUser._id)}
                  >
                    <i className="fa-solid fa-trash"></i>
                  </Button>
                </Card.Text>
                <Container>
                  <Row>
                    <Col>
                      <p>
                        Name: <span>{getUser.name}</span>
                      </p>
                      <p>
                        Email: <span>{getUser.email}</span>
                      </p>
                      <p>
                        Mobile: <span>{getUser.mobile}</span>
                      </p>
                    </Col>
                    <Col>
                      <p>
                        Job: <span>{getUser.job}</span>
                      </p>
                      <p>
                        Description:
                        <span>{getUser.description}</span>
                      </p>
                    </Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default View;
