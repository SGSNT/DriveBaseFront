import { Component, OnInit } from '@angular/core';
import { Log } from '../../models/log';
import { LogService } from '../../services/log.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

@Component({
  selector: 'app-log',
  standalone: true,
  imports: [CommonModule, FormsModule, MdbFormsModule],
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss']
})
export class LogComponent implements OnInit {

  logs: Log[] = [];
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;

  acao?: string;
  roleUser?: string;
  logName?: string;
  entity?: string;
  username?: string;

  // Arrays para os filtros dropdown
  acoes: string[] = [];
  roles: string[] = [];
  logsName: string[] = []; 
  entities: string[] = [];
  users: string[] = [];

  constructor(private logService: LogService) {}

  ngOnInit(): void {
    // Carrega todos os logs ao iniciar o componente
    this.loadAllLogs();
  }

  // Função principal para carregar todos os logs
  loadAllLogs(): void {
    this.logService.findAll().subscribe(
      (response) => {
        this.logs = response;
      },
      (error) => {
        console.error('Erro ao buscar logs:', error);
      }
    );
  }

  // Função de busca por critérios, mantida mas não será usada por agora
  searchLogsByCriteria(): void {
    let startDateTime: string | undefined = this.startDate;
    let endDateTime: string | undefined = this.endDate;

    if (this.startDate && this.startTime) {
      startDateTime = `${this.startDate}T${this.startTime}:00`;  
    }

    if (this.endDate && this.endTime) {
      endDateTime = `${this.endDate}T${this.endTime}:00`; 
    }

    this.logService.findLogsByCriterio(startDateTime, endDateTime, this.acao, this.roleUser, this.logName, this.entity, this.username).subscribe(
      (response) => {
        this.logs = response;
      },
      (error) => {
        if (error.status === 403) {
          console.error('Acesso negado: verifique as permissões ou autenticação.');
        } else {
          console.error('Erro ao buscar logs com critério:', error);
        }
      }
    );
  }  
}
