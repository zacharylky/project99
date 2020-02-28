class Showpetition extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      petition: this.props.location.state.petition,
      index: this.props.location.state.index,
      isDeleted: false,
      currentUser: this.props.currentUser
    };
  }

  render() {
    // console.log('testing for index', this.state.index);
    console.log("petition", this.state.petition);
    return (
      <React.Fragment>
        <div className="jumbo5">
          <div className="container showDescription">
            <h3 className="jumbo5words">{this.state.petition.title}</h3>
            <img
              src={this.state.petition.image}
              className="showPetition img-fluid img-thumb"
            />
            <h5 className="petition-title">{this.state.petition.title}</h5>
            <p className="listed-by">Author: {this.state.petition.author}</p>
            <p className="listed-by">{this.state.petition.content}</p>
            <p className="listed-by">
              Owner:{" "}
              {this.state.petition.user
                ? this.state.petition.user.username
                : "No Owner"}
            </p>
            <Link className="back-button btn btn-primary" to="/petitions">
              Back
            </Link>
            {console.log(
              "testing for whether loggin in or not. user:",
              this.props.currentUser
            )}
            {console.log(
              "testing for owner of petition:",
              this.state.petition.user.username
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
