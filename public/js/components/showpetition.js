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

  upVote = () => {
    console.log("working");
    // this.state.petition.votes.slice();
    let currentVote = [];
    if (this.state.petition.votes) {
      currentVote = [...this.state.petition.votes];
    }
    currentVote.push(this.state.petition.user._id);
    console.log(currentVote);
    let item = this.state.petition;
    item.votes = currentVote;
    fetch("petitions/vote/" + this.state.petition._id, {
      body: JSON.stringify(item),
      method: "PUT",
      headers: {
        Accept: "application/json, text/plain, */*",
        "Content-Type": "application/json"
      }
    })
      .then(petition => {
        console.log(petition);
        return petition.json();
      })
      .catch(error => console.log(error));
  };

  getVotes() {
    if (this.state.petition.votes) {
      return this.state.petition.votes.length;
    } else {
      return 0;
    }
  }

  canVote() {
    console.log(this.state.petition.user._id);
    console.log(this.state.petition.votes);
    if (this.state.petition.votes) {
      if (
        this.state.petition.votes.indexOf(this.state.petition.user._id) !== -1
      ) {
        console.log("do not display");
        return false;
      } else {
        return true;
      }
    }
    return true;
  }

  render() {
    let votes = this.getVotes();
    let canVote = this.canVote();

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
            <div>{votes ? votes : 0}</div>
            {canVote ? <button onClick={this.upVote}>Upvote</button> : ""}
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
