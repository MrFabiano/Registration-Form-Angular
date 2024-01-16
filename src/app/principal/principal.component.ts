import { Component, OnInit } from '@angular/core';
import { ClientService } from '../service/client.service';
import { Client } from '../model/client';
import { Router } from '@angular/router';

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

  id: number = 0;

  //clients : Client[] = [];
  clients! : Client[];
  //clients!: Array<Client[]>;
 
  constructor(private service: ClientService, private router: Router){}

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

      //create client vetor
      this.clients.push(responseData);

      //clear form
      this.client = {} as Client;

      //Message
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

  //methdo edit client
  update(): void {
    this.service.update(this.client).subscribe(responseData =>{
      
      //obter position and vetor onde esta o cliente
      let positionUpdate = this.clients.findIndex(obj => {
        return obj.id == responseData.id;
      });


      //update os dados do client
      this.clients[positionUpdate] = responseData;

      //clear form
      this.client = {} as Client;

      //Visibilidade dos buttons
      this.btnCreate = true;

      //Visibilidade table
      this.table = true;

      //Message
      alert('Message success');

    });
  }

  deleteForm(): void {
    this.service.deleteForm(this.client.id!).subscribe(responseData =>{
      
      //obter position and vetor onde esta o cliente
      let positionUpdate = this.clients.findIndex(obj => {
        return obj.id == this.client.id;
      });


      //delete client vetor
      this.clients.splice(positionUpdate, 1);

      //clear form
      this.client = {} as Client;

      //Visibilidade dos buttons
      this.btnCreate = true;

      //Visibilidade table
      this.table = true;

      //Message
      alert('Cliente delete success');

    });
  }

  cancelForm(): void {
         //clear form
         this.client = {} as Client;

         //Visibilidade dos buttons
         this.btnCreate = true;
   
         //Visibilidade table
         this.table = true;
  }
}
