import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './entities/usuario.entity';
import { CreateUsuarioInput } from './dto/create-usuario.input';
import { UpdateUsuarioInput } from './dto/update-usuario.input';

@Resolver(() => Usuario)
export class UsuariosResolver {
  constructor(private readonly usuariosServicio: UsuariosService) {}

  /**
   *Mutation se refiere a aquellas operaciones POST
   * En donde interactuamos directo con el el usuario
   *CREATE en CRUD
   */
  @Mutation((returns)=> Usuario, {name: 'crearUsuario'})
  create(@Args('usuarioInput') usuarioInput: CreateUsuarioInput){
    return this.usuariosServicio.create(usuarioInput);
  }

  /**
   * Query indica que es una consulta
   * En este caso nuestro Query va a mostrar usuarios, haciendo
   *  Uso de un servicio de usuario declarado en el constructor
   * READ en CRUD
   */

  @Query((returns)=> [Usuario], {name: 'usuarios'})
  usuarios(){
    return this.usuariosServicio.findAll();
  }

  @Query((returns)=> Usuario, {name: 'usuario'})
  usuario(@Args('id') id: number){
    return this.usuariosServicio.findOne(id);
  }

  //Fin de 

  //UPDATE en CRUD
  //Args es un decorador que indica a GraphQl que argumentos espera
  //para el servicio
  @Mutation(()=> Usuario, {name: 'actualizarUsuario'})
  update(@Args('updateUsuarioInput') updateUsuarioInput: UpdateUsuarioInput){
    return this.usuariosServicio.update(updateUsuarioInput.id, updateUsuarioInput);
  }

  //DELETE en CRUD
  @Mutation((returns)=> String, {name: 'borrarUsuario'})
  remove(@Args('id') id: number): Promise<any>{
    return this.usuariosServicio.remove(id);
  }

}
