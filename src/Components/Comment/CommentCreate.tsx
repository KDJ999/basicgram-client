import React, { FormEvent } from "react";
import { render } from "@testing-library/react";
import { integer } from "aws-sdk/clients/frauddetector";
import TextField from "@material-ui/core/TextField";
import APIURL from "../../helpers/environment";
import { Modal, Button } from "antd";

type AcceptedProps = {
  sessionToken: string;
  // commentToCreate: {};
  fetchComments: () => void;
  createOff: () => void;
  ShowTable(): void;
  id: number;
  modal: boolean;
};

type CommentState = {
  comment: string;
  isModalVisible: boolean;
};

export default class CommentCreate extends React.Component<
  AcceptedProps,
  CommentState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      comment: "",
      isModalVisible: false,
    };
  }

  handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    console.log("please", this.state.comment);
    fetch(`${APIURL}/comment/createcomment`, {
      method: "POST",
      body: JSON.stringify({
        comment: this.state.comment,
        postId: this.props.id,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          comment: "",
        });
        console.log(data);
        this.props.ShowTable();
        this.setState({ isModalVisible: false });
        this.props.fetchComments();
      })
      .catch((err) => console.log("This is where the error is" + err));
  };

  showModal = () => {
    this.setState({
      isModalVisible: true,
    });
  };
  handleOk = () => {
    this.setState({
      isModalVisible: false,
    });
  };
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
    });
  };

  handleCommentInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ comment: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Create Comment
        </Button>
        <Modal
          title="Create Comment"
          visible={this.state.isModalVisible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
          <h1>Create Comment </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              type="comment"
              placeholder="comment"
              value={this.state.comment}
              onChange={(e) => this.setState({ comment: e.target.value })}
            />
            <button>Submit</button>
          </form>
        </Modal>
        {/* // wrap this in a modal */}
      </div>
    );
  }
}
