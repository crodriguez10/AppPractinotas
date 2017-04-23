import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject  } from '@ionic-native/sqlite';

/*
  Generated class for the MateriasService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MateriasService {

	db: SQLite;
	dbo: SQLiteObject;

	constructor(){
		this.db = new SQLite();
		console.log("instanciar db");
		this.openDatabase();
	}
	
	openDatabase(){
	  return this.db.create({
		  name: 'data.db',
		  location: 'default'
		}).then((db: SQLiteObject) =>{

			this.dbo = db;
			console.log('init object dbo');
		})
	}

	createTable(){
		console.log('createTaable');
		let sql = 'CREATE TABLE IF NOT EXISTS materias(id INTEGER PRIMARY KEY AUTOINCREMENT, descripcion TEXT, estado_materia INTEGER)';
		return this.dbo.executeSql(sql, []);
	}

	getAll(){
	  let sql = 'SELECT * FROM materias';
	  console.log("consultar materias");
	  return this.dbo.executeSql(sql, [])
	  .then(response => {
	    let materias = [];
	    for (let index = 0; index < response.rows.length; index++) {
	      materias.push( response.rows.item(index) );
	    }
	    return Promise.resolve( materias );
	  })
	}

	create(materia: any){
		console.log("crear registro");
	  let sql = 'INSERT INTO materias(descripcion, estado_materia) VALUES(?,?)';
	  return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia]);
	}

	update(materia: any){
	  let sql = 'UPDATE materias SET descripcion=?, estado_materia=? WHERE id=?';
	  return this.dbo.executeSql(sql, [materia.descripcion, materia.estado_materia, materia.id]);
	}

	delete(materia: any){
	  let sql = 'DELETE FROM materias WHERE id=?';
	  return this.dbo.executeSql(sql, [materia.id]);
	}

}
