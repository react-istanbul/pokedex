import { useRouter } from 'next/router';
import React from 'react';
import useSWR, { mutate } from 'swr';
import styles from './Pokemon.module.css';

type Pokemon = {
  id: number,
  name: string,
  types: any,
};

export default function Pokemon() {
  const router = useRouter();

  const { data: pokemon, isValidating } = useSWR<Pokemon>(
    router.query.name === undefined
      ? null
      : `https://pokeapi.co/api/v2/pokemon/${router.query.name}`
  );

  return pokemon === undefined ? (
    <p>
      Loading...
    </p>
  ) : (
    <div className={styles.pokemon}>
      <button
        className={styles.refreshButton}
        onClick={() => mutate(`https://pokeapi.co/api/v2/pokemon/${router.query.name}`)}
        type="button"
      >
        Refresh
      </button>

      <img
        alt={pokemon.name}
        src={`https://pokeres.bastionbot.org/images/pokemon/${pokemon.id}.png`}
      />

      <p className={styles.name}>{pokemon.name}</p>
    </div>
  );
}
