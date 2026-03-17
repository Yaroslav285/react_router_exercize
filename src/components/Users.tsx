import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type Person = {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  url: string;
};

type PeopleResponse = {
  results: Person[];
};

const Users: React.FC = () => {
  const [data, setData] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function load() {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('https://swapi.dev/api/people/', { signal: controller.signal });
        if (!res.ok) {
          throw new Error(`Failed to load users: ${res.status}`);
        }
        const json = (await res.json()) as PeopleResponse;
        setData(json.results || []);
      } catch (e: unknown) {
        if ((e as any)?.name === 'AbortError') return;
        setError(e instanceof Error ? e.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    load();

    return () => controller.abort();
  }, []);

  const capitalize = (str: string) => (str ? str.charAt(0).toUpperCase() + str.slice(1) : '');

  const splitUrl = (url: string) => {
    const parts = url.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  };

  return (
    <div>
      <Link to="/">Home</Link>
      <h1>Users list</h1>
      {loading && <div>Loading...</div>}
      {!loading && error && <div role="alert">{error}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Height</th>
            <th>Weight</th>
            <th>Birth Year</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {!loading && !error &&
            data.map((item) => {
              const id = splitUrl(item.url);
              return (
                <tr key={`user-row-${id}`}>
                  <td>{id}</td>
                  <td>{capitalize(item.name)}</td>
                  <td>{item.height}</td>
                  <td>{item.mass}</td>
                  <td>{item.birth_year}</td>
                  <td>
                    <Link to={`/user/${id}`}>More info</Link>
                  </td>
                </tr>
              );
            })}
          {!loading && !error && data.length === 0 && (
            <tr>
              <td colSpan={6}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
