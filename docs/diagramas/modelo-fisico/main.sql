/**
	USUARIO
**/
CREATE TABLE USUARIO (
    USUARIO_ID INT PRIMARY KEY AUTO_INCREMENT,
    NOME VARCHAR(100),
    EMAIL VARCHAR(100) UNIQUE,
    PASSWORD VARCHAR(252),
    PROFILE_PICTURE BLOB,
    RULE VARCHAR(20),
    CRIADO_EM DATETIME,
    ATUALIZADO_EM DATETIME,
    STATUS INT
);


/**
	ESTUDANTE
**/
CREATE TABLE ESTUDANTE (
    ESTUDANTE_ID INT,
    USUARIO_ID INT,
    FALTA_ID INT,
    CURSO_ID INT,
    INSTITUICAO_ID INT,
    STATUS INT,
    PRIMARY KEY (ESTUDANTE_ID)
);
ALTER TABLE ESTUDANTE ADD CONSTRAINT FK_ESTUDANTE_USUARIO
    FOREIGN KEY (USUARIO_ID)
    REFERENCES USUARIO (USUARIO_ID);


/**
	FALTA
**/
CREATE TABLE FALTA (
    FALTA_ID INT PRIMARY KEY AUTO_INCREMENT,
    ESTUDANTE_ID INT,
    CURSO_ID INT,
    MOTIVACAO TEXT,
    DATA_FALTA DATETIME,
    STATUS_FALTA INT,
    CRIADO_EM DATETIME,
    ATUALIZADO_EM DATETIME
);
ALTER TABLE FALTA ADD CONSTRAINT FK_FALTA_ESTUDANTE
    FOREIGN KEY (ESTUDANTE_ID)
    REFERENCES ESTUDANTE (ESTUDANTE_ID);


/**
	PENALIZAÇÃO
**/
CREATE TABLE PENALIZACAO (
    PENALIZACAO_ID INT PRIMARY KEY AUTO_INCREMENT,
    INTERVALO INT,
    NOME VARCHAR(50),
    VALOR_PENALIZACAO INT,
    DESCRICAO TEXT,
    STATUS BOOLEAN,
    CRIADO_EM DATETIME,
    ADICIONADO_EM DATETIME
);


/**
	INSTITUIÇÃO
**/
CREATE TABLE INSTITUICAO (
    INSTITUICAO_ID INT PRIMARY KEY AUTO_INCREMENT,
    ESTUDANTE_ID INT,
    PENALIZACAO_ID INT,
    CURSO_ID INT,
    STATUS INT,
    CRIADO_EM DATETIME,
    ATUALIZADO_EM DATETIME
);

ALTER TABLE INSTITUICAO ADD CONSTRAINT FK_INSTITUICAO_ESTUDANTE
    FOREIGN KEY (ESTUDANTE_ID)
    REFERENCES ESTUDANTE (ESTUDANTE_ID);
ALTER TABLE INSTITUICAO ADD CONSTRAINT FK_INSTITUICAO_PENALIZACAO
    FOREIGN KEY (PENALIZACAO_ID)
    REFERENCES PENALIZACAO (PENALIZACAO_ID);


/**
	CURSO
**/
CREATE TABLE CURSO (
    CURSO_ID INT PRIMARY KEY AUTO_INCREMENT,
    FALTA_ID INT,
    INSTITUICAO_ID INT,
    NOME VARCHAR(1200),
    DESCRICAO TEXT,
    LIMITE_FALTAS INT,
    STATUS BOOLEAN,
    CRIADO_EM DATETIME,
    ATUALIZADO_EM DATETIME
);

ALTER TABLE CURSO ADD CONSTRAINT FK_CURSO_FALTA
    FOREIGN KEY (FALTA_ID)
    REFERENCES FALTA (FALTA_ID);
ALTER TABLE CURSO ADD CONSTRAINT FK_CURSO_INSTITUICAO
    FOREIGN KEY (INSTITUICAO_ID)
    REFERENCES INSTITUICAO (INSTITUICAO_ID);