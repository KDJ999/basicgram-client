import React from "react";

type AcceptedProps = {
  sessionToken: string;
  // Posts: any;
  fetchPosts: () => void;
  updateOff: () => void;
  postToUpdate: any;
  // editUpdateMyPosts: (post: any) => void;
};

type PostEditState = {
  editDescription: string;
};

export default class PostEdit extends React.Component<
  AcceptedProps,
  PostEditState
> {
  constructor(props: AcceptedProps) {
    super(props);
    this.state = {
      editDescription: this.props.postToUpdate.description,
    };
  }
  handleUpdate = () => {
    fetch(`http://localhost:4000/post/update/${4}`, {
      method: "PUT",
      body: JSON.stringify({
        description: this.state.editDescription,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Works");
      })
      .catch((err) => console.log(err));
  };
  handleeditDescriptionInput = (e: React.FormEvent<HTMLInputElement>): void => {
    this.setState({ editDescription: e.currentTarget.value });
  };

  render() {
    return (
      <div>
        <h1>Edit Post </h1>
        <form onSubmit={this.handleUpdate}>
          <input
            placeholder="editDescription"
            value={this.state.editDescription}
            onChange={(e) => this.setState({ editDescription: e.target.value })}
          />
          <button>Submit</button>
        </form>
      </div>
    );
  }
}
