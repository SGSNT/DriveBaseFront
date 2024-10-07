export class Log {
  idLog!: number;
  username!: string;
  roleUser!: string;
  timestamp!: string;
  acao!: string;
  entity!: string;
  idEntity!: number;
  logName!: string;
  descricao!: string;

  constructor(idLog: number, username: string, roleUser: string, timestamp: string, acao: string, entity: string, idEntity: number, logName: string, descricao: string) {
    this.idLog = idLog;
    this.username = username;
    this.roleUser = roleUser;
    this.timestamp = timestamp;
    this.acao = acao;
    this.entity = entity;
    this.idEntity = idEntity;
    this.logName = logName;
    this.descricao = descricao;
  }
}
