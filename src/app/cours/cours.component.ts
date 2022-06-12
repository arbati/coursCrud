import { Component, OnInit, ViewChild } from '@angular/core';
import { Cours } from '../models/Cours';
import { CoursService } from '../services/cours.service';

@Component({
  selector: 'app-cours',
  templateUrl: './cours.component.html',
  styleUrls: ['./cours.component.css']
})
export class CoursComponent implements OnInit {

  btnDisplayForm  : boolean= false;
  btnDisplayList  : boolean= true;
  addTaskBtn : boolean= false;
  updateTaskBtn : boolean= true;
  updateCancelBtn : boolean= true;
  showModal: boolean = false;
  varDisplay:boolean = false;



   items! : Array<Cours>;
   keyword! : string;
   myItem: Cours = {
     id: 0,
     title: '',
     price: 0,
     content: '',
     image: ""
   };

  constructor(private tsService:CoursService) { }

  ngOnInit(): void {

    this.allCours();
  }



  allCours(){

    this.tsService.getAll().subscribe({
       next: data =>{
       this.items=data;
       },
       error: msg=>{
          console.log(msg);  
       }
 
    });
 
   }
 
 
 
   deleteCours(id:number){
 
       let conf =  confirm("Are sure to delete this cours?");
 
       if(!conf)
       return ;
 
      this.tsService.delete(id).subscribe({
         next: data=>{
            this.items= this.items.filter(item=>item.id !=id);
 
         },
         error: msg=>{
             console.log(msg);
         }
      });
 
   }
 
 
    addCours(){
 
       this.tsService.store(this.myItem).subscribe({
             next: data=>{
                this.items= [data,...this.items];
                this.cleaForm();
                this.displaylist();
             },
             error: msg=>{
                console.log(msg);
             }
       });
 
    }
 
 
    updateCours(){
 
       this.tsService.update(this.myItem).subscribe({
          next: data=>{
 
             this.allCours();
             this.cleaForm();
             this.displaylist();
          },
          error: msg=>{
              console.log(msg);
          }
       });
 
    }
 

    searchBykeyword(){
 
       this.tsService.searchByKeyword(this.keyword).subscribe({
          next: data =>{
          this.items=data;
          },
          error: msg=>{
             console.log(msg);  
          }
    
       });
 
    }
 

    cleaForm(){
 
      this.myItem = {
         id: 0,
         title: '',
         price: 0,
         content: '',
         image: ""
       };

       //this.addTaskBtn=false;
       //this.updateTaskBtn=true;
       //this.updateCancelBtn=true;
       this.displaylist();
   
   }


    updateForm(item: Cours){
 
      this.addTaskBtn=true;
      this.updateTaskBtn=false;
      this.updateCancelBtn=false;
      this.myItem=item;

      this.displayForm();

   }

   storeForm(){
 
      this.addTaskBtn=false;
      this.updateTaskBtn=true;
      this.updateCancelBtn=false;
      this.displayForm();

   }


    displayForm(){
      this.varDisplay=true;
      this.btnDisplayForm= true;
      this.btnDisplayList = false;
    }

    displaylist(){
      this.varDisplay=false;
      this.btnDisplayForm= false;
      this.btnDisplayList = true;
    }






}
