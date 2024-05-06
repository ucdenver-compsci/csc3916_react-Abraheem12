import React, { Component } from 'react';
import { fetchMovie } from "../actions/movieActions";
import { connect } from 'react-redux';
import { Card, ListGroup, ListGroupItem, Image } from 'react-bootstrap';
import { BsStarFill } from 'react-icons/bs';

class MovieDetail extends Component {
    componentDidMount() {
        const { dispatch, selectedMovie, movieId } = this.props;
        console.log('Movie ID:', movieId);
        console.log('Selected Movie at mount:', selectedMovie);
        if (!selectedMovie) {
            dispatch(fetchMovie(movieId));
        }
    }

    render() {
        const { selectedMovie } = this.props;
        console.log('Selected Movie on render:', selectedMovie);

        if (!selectedMovie) {
            return <div>Loading....</div>;
        }

        return (
            <Card>
                <Card.Header>Movie Detail</Card.Header>
                <Card.Body>
                    <Image className="image" src={selectedMovie.imageUrl} thumbnail />
                </Card.Body>
                <ListGroup>
                    <ListGroupItem>{selectedMovie.title}</ListGroupItem>
                    <ListGroupItem>
                        {selectedMovie.actors && selectedMovie.actors.length > 0 ? (
                            selectedMovie.actors.map((actor, i) => (
                                <p key={i}><b>{actor.actorName}</b> {actor.characterName}</p>
                            ))
                        ) : <p>No actors listed.</p>}
                    </ListGroupItem>
                    <ListGroupItem>
                        <h4><BsStarFill/> {selectedMovie.avgRating || 'Not Rated'}</h4>
                    </ListGroupItem>
                </ListGroup>
                <Card.Body>
                    {selectedMovie.reviews && selectedMovie.reviews.length > 0 ? (
                        selectedMovie.reviews.map((review, i) => (
                            <p key={i}>
                                <b>{review.username}</b>&nbsp; {review.review}
                                &nbsp; <BsStarFill /> {review.rating}
                            </p>
                        ))
                    ) : <p>No reviews yet.</p>}
                </Card.Body>
            </Card>
        );
    }
}

const mapStateToProps = state => ({
    selectedMovie: state.movie.selectedMovie
});

export default connect(mapStateToProps)(MovieDetail);
