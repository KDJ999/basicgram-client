import React from "react";
import APIURL from "../../helpers/environment";

type AcceptedProps = {
  sessionToken: string;
  fetchPosts: () => void;
  updateOff: () => void;
  postToUpdate: any;
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
  handleUpdate = (event: any) => {
    event.preventDefault();
    fetch(`${APIURL}/post/update/${this.props.postToUpdate.id}`, {
      method: "PUT",
      body: JSON.stringify({
        description: this.state.editDescription,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: this.props.sessionToken,
      }),
    }).then((res) => {
      this.props.fetchPosts();
      this.props.updateOff();
    });
    // .catch((err) => console.log(err));
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
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}
