CREATE DATABASE desafio_holu;

CREATE TABLE valores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  potenciaTotalParametroKw FLOAT NOT NULL,
  potenciaTotalPainel FLOAT NOT NULL,
  alturaPainel FLOAT NOT NULL,
  larguraPainel FLOAT NOT NULL,
  maximoPainelPorMicroInversor INT NOT NULL
);

CREATE TABLE resultados (
  id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
  quantidadeDePaineis INT NOT NULL,
  quantidadeMicroInversores INT NOT NULL,
  quantidadeColunas INT NOT NULL,
  comprimentoDaEstrutura FLOAT NOT NULL,
  alturaDaEstrutura FLOAT NOT NULL,
  areaUtil FLOAT NOT NULL,
);
