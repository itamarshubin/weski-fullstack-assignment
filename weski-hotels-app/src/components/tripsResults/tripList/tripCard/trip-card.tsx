import { FC } from "react";
import "./trip-card.scss";
import { Hotel } from "../../../../App";

const TripCard: FC<{ hotel: Hotel }> = ({ hotel }) => {
  return (
    <div className="trip-card" style={{ marginBottom: "20px" }}>
      <div className="trip-card__image-container">
        <img
          className="trip-card__image"
          src={
            hotel.HotelDescriptiveContent.Images.find(
              (image) => image.MainImage === "True"
            )?.URL || "" //todo: put placeholder image here
          }
          alt={hotel.HotelName}
        />
      </div>
      <div className="trip-card__content">
        <div className="trip-card__header">
          <div>
            <div className="trip-card__title">{hotel.HotelName}</div>
            <div className="trip-card__stars">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  style={{
                    color: i < hotel.HotelInfo.Rating ? "#FFD700" : "#B0B0B0",
                  }}
                >
                  ★
                </span>
              ))}
            </div>
            <div className="trip-card__group-size">
              Group size: {hotel.groupSize}
            </div>
          </div>
        </div>
        <div className="trip-card__divider" />
        <div className="trip-card__price-row">
          <span className="trip-card__price">
            £{hotel.PricesInfo.AmountBeforeTax}
          </span>
          <span className="trip-card__per-person">/per person</span>
        </div>
      </div>
    </div>
  );
};
export default TripCard;
