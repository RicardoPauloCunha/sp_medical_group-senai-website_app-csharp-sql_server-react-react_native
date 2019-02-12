USE SENAI_SPMEDICALGROUP_MANHA;

INSERT INTO TIPOS_USUARIOS
VALUES ('Administrador')
, ('Médico')
, ('Paciente');

INSERT INTO USUARIOS (EMAIL, SENHA, ID_TIPO_USUARIO)
VALUES ('admin@gmail.com', 'admin132', '1')
, ('ligia@gmail.com', 'ligia132', '3')
, ('alexandre@gmail.com', 'alexandre', '3')
, ('fernando@gmail.com', 'fernando132', '3')
, ('henrique@gmail.com', 'henrique132', '3')
, ('joao@hotmail.com', 'joao132', '3')
, ('bruno@gmail.com', 'bruno132', '3')
, ('mariana@outlook.com', 'mariana132', '3')
, ('ricardo.lemos@spmedicalgroup.com.br', 'spricardo132', '2')
, ('roberto.possarle@spmedicalgroup.com.br', 'sproberto', '2')
, ('helena.souza@spmedicalgroup.com.br', 'sphelena132', '2');

INSERT INTO PRONTUARIOS (NOME, RG, CPF, DATA_NASCIMENTO, TELEFONE, ID_USUARIO, RUA, BAIRRO, CIDADE, ESTADO, CEP)
VALUES ('Ligia', '43522543-5', '94839859000', '13-10-1982', '11 3456-7654', 2, 'Rua Estado de Israel, 240', '','São Paulo', 'SP', '04022-000')
, ('Alexandre', '32654345-7', '73556944057', '23-07-2001', '11 98765-6543', 3, 'Av. Paulista, 1578', 'Bela Vista', 'São Paulo', 'SP', '01310-200')
, ('Fernando', '54636525-3', '16839338002', '10-10-1978', '11 97208-4453', 4, 'Av. Ibirapuera, 2927', 'Indianópolis','São Paulo', 'SP', '04029-200')
, ('Henrique', '54366362-5', '14332654765', '13-10-1985', '11 3456-6543', 5, 'R. Vitória 120', 'Vila Sao Jorge', 'Barueri', 'SP', '06402-030')
, ('João', '32544444-1', '91305348010', '27-08-1975', '11 7656-6377', 6, 'R. Ver. Geraldo de Camargo, 66', 'Santa Luzia', 'Ribeirão Pires', 'SP', '09405-380')
, ('Bruno', '54566266-7', '79799299004', '21-03-1972', '11 95436-8769', 7, 'Alameda dos Arapanés, 945', 'Indianópolis','São Paulo', 'SP', '04524-001')
, ('Mariana', '54566266-8', '13771913039', '05-03-2018','11 95425-4252', 8, 'R. São Antonio, 232', 'Vila Universal', 'Barueri', 'SP', '06407-140');

INSERT INTO CLINICAS (NOME_FANTASIA, RAZAO_SOCIAL, HORARIO_FUNCIONAMENTO, CNPJ, RUA, BAIRRO, CIDADE, ESTADO, CEP)
VALUES ('SP Medical Group', 'SP Medical Group', 'Seg - Sex, 07:00 - 22:00', '86.400.902/0001-30', 'Av. Barão Limeira, 532', '', 'São Paulo', 'SP', '92401-220');

INSERT INTO ESPECIALIDADES
VALUES ('Acupuntura')
, ('Anestesiologia')
, ('Angiologia')
, ('Cardiologia')
, ('Cirurgia Cardiovascular')
, ('Cirurgia da Mão')
, ('Cirurgia do Aparelho Digestivo')
, ('Cirurgia Geral')
, ('Cirurgia Pediátrica')
, ('Cirurgia Plástica')
, ('Cirurgia Torácica')
, ('Cirurgia Vascular')
, ('Dermatologia')
, ('Radioterapia')
, ('Urologia')
, ('Pediatria')
, ('Psiquiatria');

INSERT INTO MEDICOS (NOME, CRM, ID_ESPECIALIDADE, ID_USUARIO, ID_CLINICA)
VALUES ('Ricardo Lemos', '54356-SP', 2, 9, 1)
, ('Roberto Possarle', '53452-SP', 17, 10, 1)
, ('Helena Strada', '65463-SP', 16, 11, 1);

INSERT INTO SITUACAO
VALUES ('Agendada')
, ('Realizada')
, ('Cancelada');

INSERT INTO CONSULTAS (ID_PRONTUARIO, ID_MEDICO, DATA_AGENDADA, HORA_AGENDADA, ID_SITUACAO, DESCRICAO)
VALUES (7, 3, '20-01-2019', '15:00:00', 2, 'Consulta regular')
, (2, 2, '20-01-2019', '10:00:00', 3, 'Consulta regular')
, (3, 2, '20-01-2019', '11:00:00', 2, 'Consulta regular')
, (1, 2, '20-01-2019', '10:00:00', 2, 'Consulta regular')
, (4, 1, '20-01-2019', '11:00:45', 3, 'Consulta regular')
, (7, 3, '20-01-2019', '15:00:00', 1, 'Consulta regular')
, (3, 1, '20-01-2019', '11:00:45', 1, 'Consulta regular');
