class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      currentUser: this.props.currentUser,
      title: "",
      author: "",
      content: "",
      image: "",
      petitions: []
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
      body: JSON.stringify({ title: this.state.title }),
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
          petitions: [jsonedPetition, ...this.state.petitions]
        });
        console.log(petitions);
      })
      .catch(error => console.log(error));
  };

  //Delete Petition
  deletePetition(id, index) {
    fetch("/petitions/" + id, {
      method: "DELETE"
    }).then(data => {
      this.setState({
        petitions: [
          ...this.state.petitions.slice(0, index),
          ...this.state.petitions.slice(index + 1)
        ]
      });
    });
  }
  render() {
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo6">
          <div className="container profileContainer">
            <div className="row">
              <h1>My Profile</h1>
            </div>
            {/* Display Container Area */}
            <div class="container-fluid card main ">
              <div class="card-body">
                {console.log("user:", this.state.currentUser.username)}
                <h1>Hi {this.state.currentUser.username}!</h1>

                <h4>What would you like to do today?</h4>
                <Link to="/newpetition" className="btn btn-success">
                  Add new petitions
                </Link>
                <br />
                <br />
                <p>These are your current listings:</p>
                {/* Show all only my petitions */}

                <div class="row">
                  {this.state.petitions.map((petition, index) => {
                    return this.state.currentUser._id === petition.user._id ? (
                      <div className="col-4">
                        {/* {console.log(petition)} */}
                        <Link
                          to={{
                            pathname: "/showpetition",
                            state: {
                              petition: petition
                            }
                          }}
                        >
                          <img
                            src={petition.image}
                            className="img-fluid img-thumb shadow"
                          />
                          <h6>{petition.title}</h6>
                        </Link>
                        <p>{petition.author}</p>
                        <Link
                          to={{
                            pathname: "/toeditpetitions",
                            state: {
                              petition: petition
                            }
                          }}
                          className="edit-button btn btn-primary"
                        >
                          Edit Listing
                        </Link>
                        <p
                          className="delete-button btn btn-danger"
                          onClick={() =>
                            this.deletePetition(petition._id, index)
                          }
                        >
                          Delete Listing
                        </p>
                      </div>
                    ) : (
                      ""
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
