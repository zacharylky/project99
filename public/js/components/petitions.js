class Petitions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      author: "",
      image: "",
      content: "",
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
      .then(createdPetitions => {
        return createdPetitions.json();
      })
      .then(jsonedPetition => {
        // reset the form
        // add person to list
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
    fetch("/Petition/" + id, {
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

  //Update Petition
  updatePetition(petition, index) {
    fetch("/petitions" + petition._id, {
      body: JSON.stringify(petition),
      method: "PUT",
      headers: {
        // Accept         : 'application/json, text/plain, */*',
        "Content-Type": "application/json"
      }
    })
      .then(updatedPetition => updatedPetition.json())
      .then(jsonedPetition => {
        fetch("/petition")
          .then(response => response.json())
          .then(petitions => {
            this.setState({ petitions: petitions });
          });
      });
  }

  render() {
    return (
      <React.Fragment>
        {/* <Navbar /> */}
        <div className="jumbo3">
          <h3 className="jumbo3words">Petitions Catalogue</h3>
          <div className="container-petitions">
            <div className="row"></div>
            <div class="row">
              {this.state.petitions.map((petition, index) => {
                return (
                  <div className="col listingCard col-sm-3">
                    <Link
                      to={{
                        pathname: "/showpetition",
                        state: {
                          petition: petition,
                          index: index
                        }
                      }}
                    >
                      <img
                        src={petition.image}
                        className="img-fluid img-thumb"
                      />
                    </Link>

                    <h6 className="petition-title">{petition.title}</h6>
                    <p className="listed-by">
                      Listed by:{" "}
                      {petition.user ? petition.user.username : "no user"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
