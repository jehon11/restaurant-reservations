import React, { Component } from 'react';
import axios from 'axios';
import BASE_URL from '../utils/base_url';
import ReservationCard from './reservation_card';

class ReservationsPage extends Component {
  constructor() {
    super();
    this.state = {
      reservations: [],
    };
  }

  componentDidMount() {
    this.fetchReservations('upcoming');
  }

  fetchReservations = (only) => {
    axios.get(`${BASE_URL}/bookings?only=${only}`, {
      headers: {
        'jwt': localStorage.getItem('jwt')
      },
    })
      .then(response => this.setState({ reservations: response.data }));
  }

  reservationSidebar = () => {
    return (
      <div className="reservation-sidebar">
        <div className="reservation-sidebar-item" onClick={() => {this.fetchReservations('upcoming')}}>Upcoming</div>
        <div className="reservation-sidebar-item" onClick={() => {this.fetchReservations('historical')}}>Historical</div>
        <div className="reservation-sidebar-item" onClick={() => {this.fetchReservations('all')}}>All</div>
      </div>
    );
  }

  render() {
    const { reservations } = this.state;
    return (
      <div className="container">
        <div className="page-title">Reservations</div>
        <div className="row">
          <div className="col-12 col-sm-3 ">
            {this.reservationSidebar()}
          </div>
          <div className="col-12 col-sm-9">
            {reservations.map((reservation) => {
              return (
                <ReservationCard fetchReservations={this.fetchReservations} key={reservation.id} reservation={reservation} />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}
export default ReservationsPage;
