class Newpetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      image: "",
      content: "",
      petitions: [],
      users: [],
      currentUser: this.props.currentUser,
      redirectToProfile: false
    };
  }

  //Component did mount
  componentDidMount = () => {
    console.log(this.props.currentUser);
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
        user: this.props.currentUser._id,
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
        // add person to list
        this.setState({
          title: "",
          author: "",
          content: "",
          image: "",
          petitions: [jsonedPetition, ...this.state.petitions],
          redirectToProfile: true
        });
        console.log(jsonedPetition);
      })
      .catch(error => console.log(error));
  };
  render() {
    if (this.state.redirectToProfile === true) {
      return <Redirect to="/profile" />;
    }
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo7">
          <div className="container jumbo7words">
            <h1>New petition</h1>
            <div class="row">
              <form onSubmit={this.handleSubmit}>
                <label for="title">Title</label>
                <input
                  type="text"
                  value={this.state.title}
                  onChange={this.handleChange}
                  id="title"
                />
                <br />
                <label for="author">Author</label>
                <input
                  type="text"
                  value={this.state.author}
                  onChange={this.handleChange}
                  id="author"
                />
                <br />
                <label for="image">Image URL</label>
                <input
                  type="text"
                  value={this.state.url}
                  onChange={this.handleChange}
                  id="image"
                />
                <br />
                <label for="content">Why?</label>
                <input
                  type="text"
                  value={this.state.content}
                  onChange={this.handleChange}
                  id="content"
                  className="content-field"
                />
                <br />
                <input
                  className="btn btn-success"
                  type="submit"
                  value="Add Petition!"
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
