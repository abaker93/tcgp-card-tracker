import Image from 'next/image';

export const energyImg = (energy: string) => {
  switch (energy) {
    case 'Grass':
      return (
        <Image src="/img/energy/grass.png" alt="Grass" width="40" height="40" />
      );
    case 'Fire':
      return (
        <Image src="/img/energy/fire.png" alt="Fire" width="40" height="40" />
      );
    case 'Water':
      return (
        <Image src="/img/energy/water.png" alt="Water" width="40" height="40" />
      );
    case 'Lightning':
      return (
        <Image
          src="/img/energy/lightning.png"
          alt="Lightning"
          width="40"
          height="40"
        />
      );
    case 'Psychic':
      return (
        <Image
          src="/img/energy/psychic.png"
          alt="Psychic"
          width="40"
          height="40"
        />
      );
    case 'Fighting':
      return (
        <Image
          src="/img/energy/fighting.png"
          alt="Fighting"
          width="40"
          height="40"
        />
      );
    case 'Darkness':
      return (
        <Image
          src="/img/energy/darkness.png"
          alt="Darkness"
          width="40"
          height="40"
        />
      );
    case 'Metal':
      return (
        <Image src="/img/energy/metal.png" alt="Metal" width="40" height="40" />
      );
    case 'Dragon':
      return (
        <Image
          src="/img/energy/dragon.png"
          alt="Dragon"
          width="40"
          height="40"
        />
      );
    case 'Colorless':
      return (
        <Image
          src="/img/energy/colorless.png"
          alt="Colorless"
          width="40"
          height="40"
        />
      );
  }
};

export const packImg = (set: string, packs?: string[] | number[]) => {
  switch (set) {
    case 'A1':
      if (!packs) {
        return (
          <Image
            src="/img/sets/a1-logo.png"
            alt="Genetic Apex"
            width="291"
            height="133"
          />
        );
      } else {
        if (packs.length > 1) {
          return (
            <Image
              src="/img/sets/a1-logo.png"
              alt="Genetic Apex"
              width="291"
              height="133"
            />
          );
        } else {
          switch (packs[0]) {
            case 1:
            case 'Charizard': {
              return (
                <Image
                  src="/img/sets/a1-1-logo.png"
                  alt={`Genetic Apex - ${packs[0]}`}
                  width="294"
                  height="209"
                />
              );
            }
            case 2:
            case 'Mewtwo': {
              return (
                <Image
                  src="/img/sets/a1-2-logo.png"
                  alt={`Genetic Apex - ${packs[0]}`}
                  width="294"
                  height="209"
                />
              );
            }
            case 3:
            case 'Pikachu': {
              return (
                <Image
                  src="/img/sets/a1-3-logo.png"
                  alt={`Genetic Apex - ${packs[0]}`}
                  width="294"
                  height="209"
                />
              );
            }
          }
        }
      }
    case 'A1a': {
      return (
        <Image
          src="/img/sets/a1a-logo.png"
          alt="Mythical Island"
          width="291"
          height="133"
        />
      );
    }
    case 'PA': {
      if (!packs) {
        return (
          <Image
            src="/img/sets/pa-logo.png"
            alt="Promo"
            width="473"
            height="254"
          />
        );
      } else {
        if (packs.length > 1) {
          <Image
            src="/img/sets/pa-logo.png"
            alt="Promo"
            width="473"
            height="254"
          />;
        } else {
          switch (packs[0]) {
            case 1:
            case 'Vol 1':
              return (
                <Image
                  src="/img/sets/pa-v1-logo.png"
                  alt="Promo Vol 1"
                  width="340"
                  height="205"
                />
              );
            case 2:
            case 'Vol 2':
              return (
                <Image
                  src="/img/sets/pa-v2-logo.png"
                  alt="Promo Vol 2"
                  width="340"
                  height="205"
                />
              );
          }
        }
      }
    }
  }
};

export const rarity = (rarity: number) => {
  switch (rarity) {
    case 1:
      return (
        <Image
          src="/img/rarity/diamond.png"
          alt="diamond"
          width="20"
          height="20"
        />
      );
    case 2:
      return (
        <>
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
        </>
      );
    case 3:
      return (
        <>
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
        </>
      );
    case 4:
      return (
        <>
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
          <Image
            src="/img/rarity/diamond.png"
            alt="diamond"
            width="20"
            height="20"
          />
        </>
      );
    case 5:
      return (
        <>
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
        </>
      );
    case 6:
      return (
        <>
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
        </>
      );
    case 7:
      return (
        <>
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
          <Image src="/img/rarity/star.png" alt="star" width="20" height="20" />
        </>
      );
    case 8:
      return (
        <>
          <Image
            src="/img/rarity/crown.png"
            alt="crown"
            width="20"
            height="20"
          />
        </>
      );
    case 9:
      return (
        <>
          <Image
            src="/img/rarity/promo.png"
            alt="promo"
            width="20"
            height="20"
          />
        </>
      );
  }
};
