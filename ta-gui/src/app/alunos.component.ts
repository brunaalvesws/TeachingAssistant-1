import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
 export class AlunosComponent implements OnInit {

    aluno: Aluno = new Aluno();
    alunos: Aluno[] = [];
    cpfduplicado: boolean = false;
    loginduplicado: boolean = false;

    constructor(private alunoService: AlunoService) {}

     criarAluno(a: Aluno): void {
      if (!this.alunos.find(b => b.cpf == a.cpf)){
        if (!this.alunos.find(b => b.login_github == a.login_github)){
          this.alunoService.criar(a)
              .subscribe(
                ar => {
                  if (ar) {
                    this.alunos.push(ar);
                    this.aluno = new Aluno();
                    }
                },
                msg => { alert(msg.message); }
              );
          } else {
          this.loginduplicado = true;
        }
      } else {
        this.cpfduplicado = true;
      }
    }

    onMove(): void {
       this.cpfduplicado = false;
       this.loginduplicado = false;

    }

     ngOnInit(): void {
       this.alunoService.getAlunos()
             .subscribe(
               as => { this.alunos = as; },
               msg => { alert(msg.message); }
              );
     }

  }