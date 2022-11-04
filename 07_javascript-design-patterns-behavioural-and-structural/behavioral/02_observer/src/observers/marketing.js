export default class Marketing {
  update({ id, userName }) {
    // importante lembrar que o [update] é responsavel por gerenciar seus erros/exceptions
    // nao deve-se ter await no notify porque a responsabilidade do notify é só emitir eventos
    // so notificar todo mundo
    console.log(
      `[${id}]: [marketing] will send an welcome email to [${userName}]`
    );
  }
}