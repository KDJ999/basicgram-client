import { render } from "@testing-library/react";
import { integer } from "aws-sdk/clients/frauddetector";
import React, { FormEvent } from "react";

type AcceptedProps = {
  sessionToken: string;
  postToCreate: any;
  fetchPosts: () => void;
  createOff: () => void;
  ShowTable(): void;
};

type PostState = {
  //image
  file: string;
  description: string;
  likes: number;
  // PostId: number | null;
};

export default class PostCreate extends React.Component<
  AcceptedProps,
  PostState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      file: "",
      description: "",
      likes: 0,
      // PostId: null,
    };
  }

  handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const postData = new FormData();
    postData.append("image", this.state.file);
    postData.append("description", this.state.description);
    postData.append("likes", this.state.likes.toString());

    console.log(postData);
    fetch("http://localhost:4000/post/createpost", {
      method: "POST",
      body: postData,
      headers: new Headers({
        // "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          description: "",
          likes: 0,
        });
        console.log(data);
        this.props.ShowTable();
        // this.props.fetchPosts();
        // this.props.createOff();
        // this.setState({file: data.file, description: data.description, likes: data.likes})
      })
      .catch((err) => console.log("This is where the error is" + err));
  };
  // console.log(this.state);
  // event.preventDefault();
  // let upload = document.getElementById("upload");
  // if (upload) {
  //   upload.innerHTML = "HTMLElement";
  // }
  // const postData = new FormData();
  // //postman => formdata
  // postData.append("image", this.state
  //   upload.files[0]
  // postData.append("description", this.state.description);
  // postData.append("likes", this.state.likes.toString());

  singleFileChangedHandler = (e: any) => {
    this.setState({
      file: e.target.files[0],
    });
  };

  handleDescriptionInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ description: e.currentTarget.value });
  };
  // handleFileInput = (e: React.FormEvent<HTMLInputElement>): void => {
  //   this.setState({ file: e.currentTarget.value });
  // };
  handleLikesInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ likes: e.currentTarget.valueAsNumber });
  };

  // getPostId = (id: number) => {
  //   this.setState({
  //     PostId: id,
  //   });
  // };
  render() {
    return (
      <div>
        <h1>Create Post </h1>
        <form onSubmit={this.handleSubmit}>
          <input
            type="file"
            placeholder="file"
            // value={this.state.file}
            id="upload"
            multiple
            accept="image/*"
            onChange={this.singleFileChangedHandler}
          />
          <input
            placeholder="description"
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <input
            placeholder="likes"
            value={this.state.likes}
            type="number"
            onChange={(e) => this.setState({ likes: e.target.valueAsNumber })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
