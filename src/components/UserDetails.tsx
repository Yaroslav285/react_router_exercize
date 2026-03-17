import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

type PersonDetails = {
  name: string;
  birth_year: string;
  mass: string;
  height: string;
  skin_color: string;
  hair_color: string;
  eye_color: string;
  gender: string;
};

const initialDetails: PersonDetails = {
  name: '',
  birth_year: '',
  mass: '',
  height: '',
  skin_color: '',
  hair_color: '',
  eye_color: '',
  gender: '',
};

const UserDetails: React.FC = () => {
  const { id } = useParams();
  const [details, setDetails] = useState<PersonDetails>(initialDetails);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch(`https://swapi.dev/api/people/${id}/`, { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Failed to load user ${id}: ${res.status}`);
        }
        const json = (await res.json()) as PersonDetails;
        setDetails(json);
      } catch (e: unknown) {
        if ((e as any)?.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, [id]);

  const { name, birth_year, mass, height, skin_color, hair_color, eye_color, gender } = details;

  return (
    <div>
      <p>
        <Link to="/">Home</Link>
      </p>
      <p>
        <Link to="/users">Return to users list</Link>
      </p>
      <div className="front">
        <div className="container">
          {loading && <div>Loading...</div>}
          {!loading && error && <div role="alert">{error}</div>}
          {!loading && !error && (
            <>
              <h3>Name: {name}</h3>
              <h3>Birth Year: {birth_year}</h3>
              <h3>Weight: {mass}</h3>
              <h3>Height: {height}</h3>
              <h3>Skin color: {skin_color}</h3>
              <h3>Hair color: {hair_color}</h3>
              <h3>Eye color: {eye_color}</h3>
              <h3>Gender: {gender}</h3>
            </>
          )}
        </div>
        <p></p>
      </div>
    </div>
  );
};

export default UserDetails;
