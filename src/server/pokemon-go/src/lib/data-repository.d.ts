declare const dataRepository: {
  appRoot: string;
  dataRoot: string;
  dataPath: (...segments: string[]) => string;
  getPokemonGoDataRuntimeRoot: () => string;
  resolvePokemonGoDataFile: (relativeFile: string) => string;
  resolvePokemonGoDataModule: (relativeFile: string) => string;
};

export default dataRepository;
