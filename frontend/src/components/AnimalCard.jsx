import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export default function AnimalCard({ animal }) {
  return (
    <article className="animal-card">
      <div className="image-wrap">
        <img
          src={animal.image}
          alt={animal.name}
        />

        {animal.featured && (
          <span className="tag">Featured</span>
        )}
      </div>

      <div className="card-body">
        <span className="eyebrow">
          {animal.category}
        </span>

        <h3>
          {animal.name}{" "}
          <small>{animal.tamilName}</small>
        </h3>

        <p>{animal.shortDescription}</p>

        <Link
          className="text-link"
          to={`/animals/${animal._id}`}
        >
          Explore
          <ArrowUpRight size={16} />
        </Link>
      </div>
    </article>
  );
}
