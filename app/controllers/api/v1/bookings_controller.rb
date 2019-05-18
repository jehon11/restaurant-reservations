class Api::V1::BookingsController < ApplicationController
  def index
    render json: current_user.bookings, include: :restaurant
  end

  def create
    booking = Booking.new(
      date: params[:date],
      table_size: params[:tableSize],
      time_slot_id: params[:selectedTimeSlot][:id],
      restaurant_id: params[:selectedTimeSlot][:restaurant_id],
      time: Time.parse(params[:selectedTimeSlot][:time]),
      name: params[:name],
      email: params[:email],
      number: params[:number],
      discount: params[:selectedTimeSlot][:discount]
    )

    if request.headers["Authentication"] == "null"
      booking.user = User.first
    else
      authenticate_request
      booking.user = current_user
    end

    if booking.save
      render json: booking
    else
      render json: booking.errors, status: :unprocessable_entity
    end
  end
end
