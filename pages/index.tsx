import Link from 'next/link';
import React from 'react';
import useSWR from 'swr';
import styles from './Index.module.css';

type Response = {
  count: number,
  next: string | null,
  previous: string | null,
  results: Pokemon[],
};

type Pokemon = {
  name: string,
  url: string,
};

export default function Index() {
  const { data: response } = useSWR<Response>('https://pokeapi.co/api/v2/pokemon?limit=151');

  return response === undefined ? (
    <p>
      Loading...
    </p>
  ) : (
    <div className={styles.pokemons}>
      {response.results.map((pokemon, i) => (
        <Link href={`/pokemon?name=${pokemon.name}`} key={pokemon.name}>
          <a className={styles.pokemon}>
            <img
              alt={pokemon.name}
              className={styles.image}
              src={`https://pokeres.bastionbot.org/images/pokemon/${i + 1}.png`}
            />

            {pokemon.name}
          </a>
        </Link>
      ))}
    </div>
  );
}
