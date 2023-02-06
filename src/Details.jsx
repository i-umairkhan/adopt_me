import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";
import Carousel from "./Carosuel";
import ErrorBoundary from "./ErrorBoundry";

const Details = () => {
  const { id } = useParams();
  const queryKey = ["details", id];
  const results = useQuery(queryKey, () => fetchPet(queryKey));

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  if (results.isError) {
    return <h1>Error</h1>;
  }

  const pet = results.data.pets[0];

  return (
    <div className="details">
      <div>
        <Carousel images={pet.images} />
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default function DetailsErrorBoundry(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}
