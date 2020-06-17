import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardBody,
  CardText,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Input,
  Label,
} from "reactstrap";
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  handleSubmit(values) {
    console.log("Current State is: " + JSON.stringify(values));
    alert("Current State is: " + JSON.stringify(values));
  }

  render() {
    return (
      <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
        <Row className="form-group">
          <Label htmlFor="rating" md={12}>
            Rating
          </Label>
          <Col md={12}>
            <Control.select
              model=".rating"
              name="rating"
              className="form-control"
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Control.select>
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="author" md={12}>
            Your Name
          </Label>
          <Col md={12}>
            <Control.text
              model=".author"
              id="author"
              name="author"
              placeholder="Your Name"
              className="form-control"
              validators={{
                required,
                minLength: minLength(3),
                maxLength: maxLength(15),
              }}
            />
            <Errors
              className="text-danger"
              model=".author"
              show="touched"
              messages={{
                required: "Required",
                minLength: "Must be greater than 2 characters",
                maxLength: "Must be 15 characters or less",
              }}
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Label htmlFor="comment" md={12}>
            Comment
          </Label>
          <Col md={12}>
            <Control.textarea
              model=".comment"
              id="comment"
              name="comment"
              className="form-control"
            />
          </Col>
        </Row>
        <Row className="form-group">
          <Col md={12}>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </Col>
        </Row>
      </LocalForm>
    );
  }
}

class RenderComments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isModalOpen: false,
    };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  render() {
    const { comments } = this.props;
    const com = comments.map((comment) => {
      const date = new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "2-digit",
      }).format(new Date(Date.parse(comment.date)));
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author} , {date}
          </p>
        </li>
      );
    });
    return (
      <>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <CommentForm />
          </ModalBody>
        </Modal>
        <div className="col-12 col-md-5 m-1">
          <h4>Comments</h4>
          <ul class="list-unstyled">{com}</ul>
          <Button outline onClick={this.toggleModal}>
            <span className="fa fa-pencil fa-lg"></span> Submit Comment
          </Button>
        </div>
      </>
    );
  }
}

const RenderDish = ({ dish }) => {
  return (
    <div className="col-12 col-md-5 m-1">
      <Card>
        <CardImg width="100%" src={dish.image} alt={dish.image} />
        <CardBody>
          <CardTitle heading>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
};

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/menu">Menu</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>{props.dish.name}</h3>
          <hr />
        </div>
      </div>
      <div className="row">
        <RenderDish dish={props.dish} />
        <RenderComments comments={props.comments} />
      </div>
    </div>
  );
};

export default DishDetail;
