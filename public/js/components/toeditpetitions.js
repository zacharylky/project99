// This page is for the user to edit its own products only
// Currently, it's editing all the products

class PetitionsEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentUser : this.props.currentUser,
      title: "",
      author: "",
      image: "",
      content: "",
      petitions: [],
      redirectToProfile: false
    };
  }

  //Component did mount
  componentDidMount = () => {
    fetch("/petitions")
      .then(response => response.json())
      .then(petitions => {
        this.setState({ petitions: petitions });
      });
  };

  //handle change and submit
  handleChange = event => {
    this.setState({ [event.target.id]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    fetch("/petitions", {
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        image: this.state.image,
        content: this.state.content
      }),
      method: "POST",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(createdPetition => {
        return createdPetition.json();
      })
      .then(jsonedPetition => {
        // reset the form
        // add petition to list
        this.setState({
          title: "",
          image: "",
          author: "",
          content: "",
          petitions: [jsonedPetition, ...this.state.petitions]
        });
        console.log(petitions);
      })
      .catch(error => console.log(error));
  };

  //Update Petition (working version)
  updatePetition = event => {
    fetch("/petitions/" + this.props.location.state.petition._id, {
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        image: this.state.image,
        content: this.state.content
      }),
      method: "PUT",
      headers: {
        // Accept         : 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      }
    })
      .then(updatedPetition => updatedPetition.json())
      .then(jsonedPetition => {
        fetch("/petitions")
          .then(response => response.json())
          .then(petitions => {
            this.setState({ petitions: petitions });
          });
      })
      .then(() => {
        this.setState({
          redirectToProfile: true
        });
      });
    event.preventDefault();
    console.log(event.target);
  };

  render() {
    if (this.state.redirectToProfile === true) {
      return <Redirect to="/profile" />;
    }

    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo7">
          <div class="container jumbo7words">
            <h1>Edit petition</h1>
            <div class="row">
              <form onSubmit={this.updatePetition}>
                <label for="title">Title</label>
                <input
                  type="text"
                  placeholder={this.state.title}
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                />
                <br />
                <label for="author">Author</label>
                <input
                  type="text"
                  placeholder={this.state.author}
                  value={this.state.author}
                  onChange={this.handleChange}
                  id="author"
                />
                <br />
                <label for="image">Image URL</label>
                <input
                  type="text"
                  placeholder={this.state.image}
                  value={this.state.image}
                  onChange={this.handleChange}
                  id="image"
                />
                <br />
                <label for="content">Content</label>
                <input
                  type="text"
                  placeholder={this.state.content}
                  value={this.state.content}
                  onChange={this.handleChange}
                  id="content"
                  className="content-field"
                />
                <br />
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Edit Petition!"
                />
              </form>
            </div>
            <div class="row">
              <Link className="back-button btn btn-primary" to="/profile">
                Back
              </Link>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
