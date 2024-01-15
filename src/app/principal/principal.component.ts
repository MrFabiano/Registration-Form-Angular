import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.css']
})
export class PrincipalComponent implements OnInit{

  btnCreate:boolean = true;   //let e const = can only be instantiated in a function

  table:boolean = true;


  //client = new Client();
  client: Client = {} as Client;

  //clients : Client[] = [];
  clients! : Client[];
  //clients!: Array<Client[]>;
 
  constructor(private service: ClientService){}

  ngOnInit(): void {
    this.selection();
  }

  selection(): void {
    this.service.selection().subscribe(responseDate => {
      this.clients = responseDate;
    });
  }

  create(): void {
    this.service.create(this.client).subscribe(responseData => {
      this.clients.push(responseData);

      this.client = {} as Client;
      alert('Create success');

    });
  }

  selectionClient(positionNumber: number): void {
     
    //selection client vetor
    this.client = this.clients[positionNumber];

    //visible button
    this.btnCreate = false;

    //visible table
    this.table = false;
  }
}
