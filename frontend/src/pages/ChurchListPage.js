import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import {
  createChurch,
  deleteChurch,
  listChurches,
} from "../actions/churchActions";

import { useNavigate } from "react-router-dom";

const ChurchListPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const churchList = useSelector((state) => state.churchList);
  const { loading, error, churches } = churchList;

  const churchDelete = useSelector((state) => state.churchDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = churchDelete;

  const churchCreate = useSelector((state) => state.churchCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    church: createdChurch,
  } = churchCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: "CHURCH_CREATE_RESET" });

    if (!userInfo) {
      navigate("/login");
    }

    if (successCreate) {
      navigate(`/admin/church/${createdChurch._id}/edit`);
    } else {
      dispatch(listChurches());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdChurch,
  ]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteChurch(id));
    }
  };

  const createChurchHandler = () => {
    dispatch(createChurch());
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Churches</h1>
        </Col>
        <Col className="text-right">
          <Button className="my-3" onClick={createChurchHandler}>
            <i className="fas fa-plus"></i> Create Church
          </Button>
        </Col>
      </Row>
      {loadingDelete && <h2>Loading...</h2>}
      {errorDelete && <h3>{errorDelete}</h3>}
      {loadingCreate && <h2>Loading...</h2>}
      {errorCreate && <h3>{errorCreate}</h3>}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>ADDRESS</th>
              <th>CITY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {churches.map((church) => (
              <tr key={church._id}>
                <td>{church._id}</td>
                <td>{church.name}</td>
                <td>{church.address}</td>
                <td>{church.city ? church.city.name : ""}</td>
                <td>
                  <LinkContainer to={`/admin/church/${church._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(church._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ChurchListPage;
