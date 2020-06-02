import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";

const renderComments = (comments) => {

  const com = comments.map(comment => {
    const date = new Intl.DateTimeFormat('en-US',{ year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)));
    return (
      <li key={comment.id}>
        <p>{comment.comment}</p>
        <p>-- {comment.author} , {date}</p>
      </li>
    );
  });
  return (
    <div className="col-12 col-md-5 m-1">
      <h4>Comments</h4>
      <ul class = "list-unstyled">
       {com}
      </ul>
    </div>
  );
}

const renderDish = (dish) => {
  return (
    <Card>
      <CardImg
        width="100%"
        src={dish.image}
        alt={dish.image}
      />
      <CardBody>
        <CardTitle heading>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

const DishDetail = (props) => {
  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-5 m-1">{renderDish(props.dish)}</div>
        {renderComments(props.dish.comments)}
      </div>
    </div>
  )
}


export default DishDetail;
